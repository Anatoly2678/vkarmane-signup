import React from 'react'
import {$if, $ifEnter} from '../react-helpers'

export default React.createClass({
    getInitialState() {
        return {
            codeId: null,
            code: '',
            codeExpired: false,
            errorMessage: null,
            waiting: false,
            codeInputVisible: false,
            secsToResend: 0
        }
    },
    componentDidMount() {
        this.sendCode()
    },
    tick() {
        const {secsToResend} = this.state
        this.setState({secsToResend: secsToResend - 1})

        if(secsToResend - 1 === 0) {
            clearInterval(this.timerId)
        }
    },
    render () {
        return (
        <div className="modal fade in" id="myModal" style={{display: 'block'}} tabIndex="-1" role="dialog">
            <div className="modal-dialog" style={{ width: '480px'}} role="document">
                <div className="modal-content" style={{ boxShadow: 'none' }}>
                    <button
                        type="button" className="close" style={{margin:'20px'}}
                        onClick={() => this.props.onClose()}><span>&times;</span></button>
                <div
                    className="alert alert-dismissible" role="alert"
                    style={{marginBottom:'0px', padding:'60px 40px', backgroundColor: '#ECF3F9', borderColor: '#d3e1ed' }}>

                    <h2 className="form-signin-heading">Подтверждение номера телефона</h2>
                    <div className="form-signin-heading-underline"></div>
                    <div className="form-group">
                        <p style={{ fontSize: '13px' }}>На указанный вами номер телефона отправлено СМС с кодом подтверждения.</p>
                        <p style={{ fontSize: '13px' }}>Введите полученный код чтобы продолжить оформление заявки.</p>
                    </div>
                    <div className="form-group">
                        <input value={'+7 ' + this.props.phone.substr(2)} readOnly style={{backgroundColor:'#FFF', borderColor:'#FFF'}} type="tel" className="form-control" />
                    </div>

                    {this.state.codeInputVisible  || true?
                        <div>
                            <div className={`form-group ${$if(this.state.errorMessage, 'has-error')}`}>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <input
                                            value={this.state.code} className="form-control" autoFocus={true}
                                            style={{ backgroundColor:'#FFF'}} placeholder="Код из СМС"
                                            onChange={this.handleCodeChange}
                                            onKeyPress={$ifEnter(this.handleVerifyCodeClick)} />
                                    </div>
                                    <div className="col-sm-6">
                                        {$if(this.secsToResend === 0,
                                            <p style={{marginTop: '15px'}}>
                                                Отправить еще сообщение
                                            </p>,
                                            <div style={{fontSize: '13px', lineHeight: "1.3", padding: '2px 5px'}}>
                                                Повторнеое сообщение можно будет отправить через {this.state.secsToResend} сек
                                            </div>
                                        )}

                                    </div>
                                </div>

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
            codeInputVisible: false,
            secsToResend: 60
        })

        this.timerId = setInterval(this.tick, 1000)
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
                console.error(err)
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