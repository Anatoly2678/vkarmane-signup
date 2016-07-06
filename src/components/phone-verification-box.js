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
            <div className="alert alert-info alert-dismissible" role="alert">
                <button type="button" className="close"><span>&times;</span></button>
                <h3>Подтверждение номера телефона</h3>
                <div className="form-group">
                    <p>На указанный вами номер телефона отправлено СМС с кодом подтверждения.</p>
                    <p>Введите полученный код чтобы продолжить оформление заявки.</p>
                </div>
                <div className="form-group">
                    <input value={this.props.phone} readOnly type="tel" className="form-control" />
                </div>

                {this.state.codeInputVisible ?
                    <div>
                        <div className="form-group">
                            <input value={this.state.code} className="form-control"
                                   onChange={this.handleCodeChange} placeholder="Код из СМС"/>
                            <span className="help-block text-danger">{this.state.errorMessage}</span>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleVerifyCodeClick}>
                            Подтвердить телефон
                        </button>
                    </div>: null}

                {this.state.codeExpired ?
                    <small>Время жизни кода истекло. <a href="#" onClick={this.handleSendNewCode}>Отправить еще сообщение</a></small> : null}

                {this.state.waiting ?
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}></div>
                    </div>: null}

            </div>)
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

        if(result['IsExists']) {
            this.props.onAlreadyExists()
            return
        }

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
            this.props.onSuccess()
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