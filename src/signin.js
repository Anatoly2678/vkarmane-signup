import cookie from 'js-cookie'
import React from 'react'
import ReactDOM from 'react-dom'

const SigninForm = React.createClass({
    getInitialState() {
        return {
            email:'',
            password: '',
            showAlert: false,
            aalertText: ''
        }
    },
    render() {
        var alert = (
            <div className="alert alert-danger" role="alert">
                <small>{this.state.alertText}</small>
            </div>)

        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="form-signin-heading">Вход</h2>
                <div className="form-signin-heading-underline"></div>

                {this.state.showAlert ? alert : null}

                <div className="form-group">
                    <label htmlFor="inputEmail">Ваш email</label>
                    <input type="email" id="inputEmail" className="form-control"
                           placeholder="Укажите ваш email" required autoFocus
                           value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Пароль</label>
                    <input type="password" id="inputPassword" className="form-control"
                           placeholder="Введите пароль" required
                           value={this.state.password} onChange={this.handlePasswordChange} />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <button type="submit" className="btn btn-primary btn-block">Войти</button>
                    </div>
                    <div className="col-sm-6">
                        <button type="button" onClick={this.handleRecovery} className="btn btn-link btn-block">
                            Забыли пароль?
                        </button>
                    </div>
                </div>
            </form>
        )
    },
    handleEmailChange(e) {
        this.setState({email:e.target.value})
    },
    handlePasswordChange(e) {
        this.setState({password:e.target.value})
    },
    handleSubmit(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: '/ServiceModel/AuthService.svc/Login',
            data: JSON.stringify({
                TimeZoneOffset: new Date().getTimezoneOffset(),
                UserName: this.state.email,
                UserPassword: this.state.password,
                WorkspaceName: 'Default'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleLoginResult,
            error: this.handleLoginError
        })
    },
    handleLoginResult(result) {
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
            success: () => location.replace('/0/Nui/ViewModule.aspx'),
            error: () => location.replace('/0/Nui/ViewModule.aspx')
        })
    },
    handleLoginError(xhr, status, err) {
        this.setState({
            showAlert: true,
            alertText: err.toString()
        })
    },
    handleRecovery() {
        location.replace('/Recovery.aspx')
    }
})

ReactDOM.render(<SigninForm />, document.getElementById('content'))