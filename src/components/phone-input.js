import React from 'react'
import MaskedInput from 'react-maskedinput'
import PhoneVerificationBox from './phone-verification-box'

export default React.createClass({
    getInitialState() {
        return {
            phone: '',
            sendCodeButtonVisible: false,
            phoneVerificationBoxVisible: false,
            phoneVerified: false,
            error: false,
            errorMessage:'',
            phoneAlreadyExists: false
        }
    },
    render () {
        const sendCodeButton =
            <button type="button" className="btn btn-primary" onClick={this.handleSendCodeClick}>
                Подтвердить телефон
            </button>

        const phoneInput = (
            <div>
                <div className={"form-group" + (this.state.error ? " has-error": "")}>
                    <label htmlFor="inputPhone">Мобильный телефон</label>
                    <div className="input-group">
                        <div className="input-group-addon">+7</div>
                        <MaskedInput
                            type="tel" id="inputPhone" className="form-control"
                            mask="(111) 111 - 11 - 11" placeholder="(000) 000 - 00 - 00"
                            onChange={this.handlePhoneChange} value={this.state.phone} />
                    </div>
                    <span className="help-block">{this.state.errorMessage}</span>
                    {this.state.phoneAlreadyExists
                        ? <div className="alert alert-warning">
                            <smal>Такой номер уже зарегистрирован.
                                Пожалуйста, <a href="#" onClick={e => {e.preventDefault(); this.props.onSignin()}}>авторизуйтесь</a></smal>
                        </div> : null}
                </div>
                {this.state.sendCodeButtonVisible ? sendCodeButton: null}
            </div>)

        const verifiedPhoneInput = (
            <div className="form-group has-success has-feedback">
                <label htmlFor="inputPhone">Мобильный телефон</label>
                <div className="input-group">
                    <div className="input-group-addon">+7</div>
                    <input type="tel" id="inputPhone" className="form-control" value={this.state.phone} readOnly />
                </div>
                <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
            </div>)


        const phoneVerificationBox  =
            <PhoneVerificationBox
                phone={'+7' + this.state.phone}
                onError={this.handlePhoneVerificationError}
                onAlreadyExists={this.handlePhoneVerificationAlreadyExists}
                onSuccess={this.handlePhoneVerificationSuccess}
                onClose={this.handlePhoneVerificationClose} />

        return (
            <div>
                {!this.state.phoneVerified ? phoneInput: null}
                {this.state.phoneVerificationBoxVisible ? phoneVerificationBox: null}
                {this.state.phoneVerified ? verifiedPhoneInput: null}
            </div>)
    },
    handlePhoneChange(e) {
        const phone = e.target.value
        const digitsInPhone = 10
        const countDigits = text => (text.match(/\d/g) || []).length

        this.setState({
            phone: phone,
            phoneAlreadyExists: false,
            error: false,
            errorMessage: '',
            sendCodeButtonVisible: countDigits(phone) === digitsInPhone
        })
    },
    handleSendCodeClick() {
        this.setState({
            phoneVerificationBoxVisible: true
        })
    },
    handlePhoneVerificationAlreadyExists(value) {
        if(value) {
            this.setState({
                phoneVerificationBoxVisible: false,
                phoneAlreadyExists: true
            })
        }

        return {abort: value}
    },
    handlePhoneVerificationError(message) {
        this.setState({
            phoneVerificationBoxVisible: false
        })
        alert(message)
    },
    handlePhoneVerificationSuccess(phone) {
        this.setState({
            phoneVerificationBoxVisible: false,
            phoneVerified: true
        })

        this.props.onChange(phone)
    },
    handlePhoneVerificationClose() {
        this.setState({
            phoneVerificationBoxVisible: false
        })
    }
})

