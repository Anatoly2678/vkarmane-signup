import React from 'react'
import {$if} from '../react-helpers'

export default React.createClass({
    getInitialState() {
        return {
            codeId: null,
            code: '',
            codeExpired: false,
            errorMessage: null,
            waiting: false,
            codeInputVisible: false
        }
    },
    componentDidMount() {
        this.sendCode()
    },
    render () {
        return (
        <div className="modal fade in" id="myModal" style={{display: 'block'}} tabIndex="-1" role="dialog">
            <div className="modal-dialog" style={{ width: '480px'}} role="document">
                <div className="modal-content">
                    <button
                        type="button" className="close" style={{margin:'20px'}}
                        onClick={() => this.props.onClose()}><span>&times;</span></button>
                <div
                    className="alert alert-info alert-dismissible" role="alert"
                    style={{marginBottom:'0px', padding:'60px 40px'}}>

                    <h3>Подтверждение номера телефона</h3>
                    <div className="form-group">
                        <p>На указанный вами номер телефона отправлено СМС с кодом подтверждения.</p>
                        <p>Введите полученный код чтобы продолжить оформление заявки.</p>
                    </div>
                    <div className="form-group">
                        <input value={this.props.phone} readOnly style={{backgroundColor:'#FFF', borderColor:'#FFF'}} type="tel" className="form-control" />
                    </div>

                    {this.state.codeInputVisible ?
                        <div>
                            <div className={`form-group ${$if(this.state.errorMessage, 'has-error')}`}>
                                <input value={this.state.code} className="form-control"
                                       onChange={this.handleCodeChange} placeholder="Код из СМС"/>
                                <span className="help-block text-danger">{this.state.errorMessage}</span>
                            </div>
                            <button type="button" className="btn btn-primary btn-block" onClick={this.handleVerifyCodeClick}>
                                Подтвердить телефон
                            </button>
                        </div>: null}

                    {this.state.codeExpired ?
                        <small>Время жизни кода истекло. <a href="#" onClick={this.handleSendNewCode}>Отправить еще сообщение</a></small> : null}

                    {this.state.waiting ?
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}></div>
                        </div>: null}

                </div>

                </div>
            </div>
        </div>
            )
    },
    sendCode () {
        $.ajax({
            type: "POST",
            url: '/Register.aspx/SendVerificationCodes',
            data: JSON.stringify({
                number: this.props.phone,
                type: 'phone'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleSendCodeResult,
            error: (xhr, code, err) => {
                this.setState({ waiting: false })
                alert(err.toString())
            }
        })

        this.setState({
            codeExpired: false,
            waiting: true,
            codeInputVisible: false
        })
    },
    handleSendCodeResult(res) {
        this.setState({
            waiting: false
        })

        const result = JSON.parse(res.d)['SendVerificationCodesResult']

        const {abort} = this.props.onAlreadyExists(!!result['IsExists'])
        if(abort) return

        if(result['IsInBlockList']) {
            this.props.onError('Номер в черном списке')
            return
        }

        if(result['Code'] !== 0 && result['Message']) {
            this.props.onError(result['Message'])
            return
        }

        this.setState({
            codeId: result['CodeId'],
            codeInputVisible: true
        })
    },
    handleCodeChange(e) {
        this.setState({ code: e.target.value })
    },
    handleVerifyCodeClick() {
        $.ajax({
            type: "POST",
            url: '/Register.aspx/Verify',
            data: JSON.stringify({ codeId: this.state.codeId, code: this.state.code }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleVerifyCodeResult,
            error: (xhr, code, err) => {
                this.setState({ waiting: false })
                alert(err.toString())
            }
        })

        this.setState({
            waiting: true,
            codeInputVisible: false
        })
    },
    handleVerifyCodeResult(res) {
        this.setState({
            waiting: false
        })

        const result = JSON.parse(res.d)['VerifyResult']

        if(result['IsCodeExpired']) {
            this.setState({
                codeId: null,
                codeExpired: true
            })
            return
        }

        if(result['IsInBlockList']) {
            this.props.onError('Номер в черном списке')
            return
        }

        if(result['IsCodeCorrect']) {
            this.props.onSuccess(this.props.phone)
            return
        }

        this.setState({
            errorMessage: 'Неправильный код подтверждения',
            codeInputVisible: true
        })
    },
    handleSendNewCode(e) {
        e.preventDefault()
        this.sendCode()
    }
})