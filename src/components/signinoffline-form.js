import cookie from 'js-cookie'
import React from 'react'

export default React.createClass({
    getInitialState() {
        return {
            email:'',
            password: '',
            showAlert: false,
            alertText: '',
            waiting: false,
            point: '-1'
        }
    },
    render() {
        var alert = (
            <div className="alert alert-danger" role="alert">
                <small>{this.state.alertText}</small>
            </div>)

        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="form-signin-heading">Вход (Offline)</h2>
                <div className="form-signin-heading-underline"></div>

                {this.state.showAlert ? alert : null}

                <div className="form-group">
                    <label htmlFor="inputEmail">Ваш e-mail</label>
                    <input
                        type="email" id="inputEmail" className="form-control"
                        placeholder="Укажите ваш e-mail" required autoFocus
                        value={this.state.email} onChange={this.handleEmailChange}
                        readOnly={this.state.waiting} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Пароль</label>
                    <input
                        type="password" id="inputPassword" className="form-control"
                        placeholder="Введите пароль" required
                        value={this.state.password} onChange={this.handlePasswordChange}
                        readOnly={this.state.waiting} />
                    <input
                        type="hidden" id="PointId" ref='point' value='911'  />
                    <input type="hidden" id="PointId2" ref='point2' value='000'  />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <button
                            type="submit" className="btn btn-primary btn-block"
                            readOnly={this.state.waiting}>
                            {!this.state.waiting ? 'Войти' : 'Вход...' }
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button
                            type="button" onClick={this.handleRecovery}
                            className="btn btn-link btn-block" style={{paddingLeft:'0', paddingRight:'0' }}>
                            Забыли пароль?
                        </button>
                    </div>
                </div>
            </form>
        )
    },
    handleEmailChange(e) {
        //console.log (this.refs.point2.value)
        this.setState({point:this.refs.point.value})
        this.setState({email:e.target.value})
    },
    handlePasswordChange(e) {
        this.setState({password:e.target.value})
    },
    handleSubmit(e) {
        e.preventDefault()

        this.setState({waiting: true})

        $.ajax({
            type: "POST",
            url: '/ServiceModel/AuthService.svc/Login',
            data: JSON.stringify({
                TimeZoneOffset: new Date().getTimezoneOffset(),
                UserName: this.state.email,
                UserPassword: this.state.password,
                WorkspaceName: 'Default',
                point: this.state.point
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleLoginResult,
            error: this.handleLoginError
        })
    },
    handleLoginResult(result) {
        this.setState({waiting: false})

        if(result['Code'] != 0) {
            this.setState({
                password: '',
                showAlert: true,
                alertText: result['Message']
            })

            return
        }

        $.ajax({
            type: "POST",
            url: '/0/rest/LeadGeneratorService/SaveReferralIntoSession',
            data: JSON.stringify({
                param: cookie.get('lead_generator_referral')
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: () => location.href = '/0/Nui/ViewModule.aspx',
            error: (xhr, code, err) => {
                console.error(err)
                location.href = '/0/Nui/ViewModule.aspx'
            }
        })
    },
    handleLoginError(xhr, status, err) {
        this.setState({
            showAlert: true,
            alertText: err.toString(),
            waiting: false
        })
    },
    handleRecovery() {
        location.replace('/recovery.html')
    }
});