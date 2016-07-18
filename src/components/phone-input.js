import React from 'react'
import InputMask from 'react-input-mask'
import PhoneVerificationBox from './phone-verification-box'

import {$if} from '../react-helpers'

export default React.createClass({
    getInitialState() {
        return {
            phone: '',
            phoneVerificationBoxVisible: false,
            phoneVerified: false,
            error: false,
            errorMessage:'',
            phoneAlreadyExists: false
        }
    },
    normalize(number) {
        return '+7' + number
    },
    render () {

        const digitsInPhone = 3 + 3 + 4
        const countDigits = text => (text.match(/\d/g) || []).length
        const sendVisible =
            countDigits(this.state.phone) === digitsInPhone &&
            !this.state.phoneAlreadyExists

        const phoneInput = (
            <div className={"form-group" + (this.state.error ? " has-error": "")}>
                <label htmlFor="inputPhone">Мобильный телефон</label>
                <div>
                    <span className="form-control country-code">+7</span>
                    <InputMask
                        autoFocus={true}
                        type="tel" id="phoneInput" className="form-control"
                        mask="(999) 999 - 99 - 99" placeholder="(___) ___ - __ - __" maskChar={null}
                        onKeyPress={() => sendVisible && this.handleSendCodeClick()}
                        onChange={this.handlePhoneChange} value={this.state.phone} />
                </div>

                <span className="help-block">{this.state.errorMessage}</span>

                {$if(this.state.phoneAlreadyExists,
                    <div style={{backgroundImage:'url(/statics/images/ialert.png)', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', padding: '5px 0px 2px 38px', display: 'block', backgroundColor: '#fff', borderColor:'#fff'}}>
                        Такой номер уже зарегистрирован. Пожалуйста, <a href="#" onClick={e => {e.preventDefault(); this.props.onSignin()}}>авторизуйтесь</a>
                    </div>)}

                {$if(sendVisible,
                    <button type="button" className="btn btn-primary" onClick={this.handleSendCodeClick}>
                        Подтвердить телефон
                    </button>)}
            </div>)

        const verifiedPhoneInput = (
            <div className="form-group has-feedback">
                <label htmlFor="inputPhone">Мобильный телефон</label>
                <div className="has-feedback">
                    <span className="form-control country-code">+7</span>
                    <input type="tel" id="inputPhone" className="form-control" value={this.state.phone} readOnly />
                    <span className="glyphicon glyphicon-ok form-control-feedback"></span>
                </div>
            </div>)


        const phoneVerificationBox  =
            <PhoneVerificationBox
                phone={this.normalize(this.state.phone)}
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
        this.setState({
            phone: e.target.value.substr(0, '(999) 999 - 99 - 99'.length), // Фикс пролемы ввода лишних символов в браузерах
            phoneAlreadyExists: false,
            error: false,
            errorMessage: '',
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
            phoneVerificationBoxVisible: false,
            error: true,
            errorMessage: message,
        })

    },
    handlePhoneVerificationSuccess(phone) {
        this.setState({
            phoneVerificationBoxVisible: false,
            phoneVerified: true
        })

        this.props.onChange(this.normalize(this.state.phone))
    },
    handlePhoneVerificationClose() {
        this.setState({
            phoneVerificationBoxVisible: false
        })
    }
})

