import React from 'react'
import MaskedInput from 'react-maskedinput'
import { connect } from 'react-redux'
import {
    changePhoneNumber,
    sendVerificationCode,
    numberVerified,
    verificationAborted,
    verificationFailed
} from '../actions/recovery'
import PhoneVerificationBox from './phone-verification-box'
import {$if} from '../react-helpers'

const PhoneInput = ({phone, message, onChange, onSendCode}) => {
    return (
        <div>
            <div className={`form-group ${$if(message,'has-error')}`}>
                <label htmlFor="inputPhone">
                    Введите мобильный телефон, указанный вами при регистрации
                </label>
                <div className="input-group">
                    <div className="input-group-addon">+7</div>
                    <MaskedInput
                        type="tel" id="inputPhone" className="form-control"
                        mask="(111) 111 - 11 - 11" placeholder="(000) 000 - 00 - 00"
                        value={phone.number.substr('+7'.length)} /* Отрезаем +7 */
                        onChange={e => onChange('+7' + e.target.value)} />
                </div>
                <span className="help-block">{message}</span>
            </div>

            {$if(phone.readyToCheck,
                <button type="button" className="btn btn-primary"
                        onClick={() => onSendCode(phone.number)}>
                    Подтвердить телефон
                </button>
            )}
        </div>)
}

const RecoveryForm = ({
    phone, verification, onChangePhoneNumber,
    onSendCode, onVerificationSuccess, onVerificationClose,
    onVerificationError}) => {
    return (
        <form className="form-signin" onSubmit={e => e.preventDefault()}>
            <h2 className="form-signin-heading">Восстановление пароля</h2>

            {$if(!verification.pending,
                <PhoneInput
                    phone={phone}
                    onChange={onChangePhoneNumber}
                    onSendCode={onSendCode} />
            )}

            {$if(verification.pending,
                <PhoneVerificationBox
                    phone={verification.number}
                    onError={onVerificationError}
                    onAlreadyExists={val => {
                        alert('exists: ' + val)
                        return {abort: false}
                    }}
                    onSuccess={onVerificationSuccess}
                    onClose={onVerificationClose} />
            )}
        </form>)
}

export default connect(
    state => {
        return {
            phone: state.phone,
            verification: state.verification
        }
    },
    dispatch => {
        return {
            onChangePhoneNumber: number => dispatch(changePhoneNumber(number)),
            onSendCode: number => dispatch(sendVerificationCode(number)),
            onVerificationSuccess: () => dispatch(numberVerified()),
            onVerificationClose: () => dispatch(verificationAborted()),
            onVerificationError: message => dispatch(verificationFailed(message))
        }
    }
)(RecoveryForm)


/*
export default React.createClass({
    getInitialState() {
        return {
            phoneInputVisible: true,
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
                        <smal>Такой номер уже зарегистрирован. Пожалуйста, <a href="/signin.html">авторизуйтесь</a></smal>
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
                {this.state.phoneInputVisible ? phoneInput: null}
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
            phoneVerificationBoxVisible: true,
            phoneInputVisible: false
        })
    },
    handlePhoneVerificationAlreadyExists(value) {
        if(value) {
            this.setState({
                phoneVerificationBoxVisible: false,
                phoneInputVisible: true,
                phoneAlreadyExists: true
            })
        }

        return {abort: value}
    },
    handlePhoneVerificationError(message) {
        this.setState({
            phoneVerificationBoxVisible: false,
            phoneInputVisible: true
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
            phoneVerificationBoxVisible: false,
            phoneInputVisible: true
        })
    }
})*/