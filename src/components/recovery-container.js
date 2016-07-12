import React from 'react'
import MaskedInput from 'react-maskedinput'
import { connect } from 'react-redux'
import {$if} from '../react-helpers'
import {
    changePhoneNumber,
    sendCode
} from '../reducers/recovery'

const PhoneInput = ({phone, onChange, onSendCode}) =>
    <div>
        <div className="form-group">
            <label htmlFor="phoneInput">
                Введите мобильный телефон, указанный вами при регистрации
            </label>
            <div className="input-group">
                <div className="input-group-addon">+7</div>
                <MaskedInput
                    type="tel" id="phoneInput" className="form-control"
                    mask="(111) 111 - 11 - 11" placeholder="(000) 000 - 00 - 00"
                    value={phone.number.substr('+7'.length)} /* Отрезаем +7 */
                    onChange={e => onChange('+7' + e.target.value)} />
            </div>
        </div>

        {$if(phone.readyToCheck && !phone.sent,
            <button type="button" className="btn btn-primary"
                    onClick={() => onSendCode(phone.number)}>
                Подтвердить телефон
            </button>
        )}
    </div>

const VerificationBlock = () =>
    <div>
        <div className="form-group">
            <p>На указанный вами номер телефона отправлено СМС с кодом подтверждения.</p>
            <p>Введите полученный код чтобы продолжить оформление заявки.</p>
        </div>
        {$if(true,
            <div>
                <div className={`form-group`}>
                    <input className="form-control" placeholder="Код из СМС"/>
                </div>
                <button
                    type="button" className="btn btn-primary"
                    onClick={() => null}>
                    Подтвердить телефон
                </button>
            </div>)}
    </div>

const RecoveryForm = ({phone, verification, onChangePhoneNumber, onSendCode}) =>
    <form className="form-signin" onSubmit={e => e.preventDefault()}>
        <h2 className="form-signin-heading">Восстановление пароля</h2>

        {$if(phone.message || verification.message,
            <div className="alert alert-danger" role="alert">
                <small>{phone.message}</small>
                <small>{verification.message}</small>
            </div>
        )}

        <PhoneInput
            phone={phone}
            onChange={onChangePhoneNumber}
            onSendCode={onSendCode} />

        {$if(verification.sendingCode,
            <div className="progress">
                <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}></div>
            </div>
        )}

        {$if(verification.codeId,
            <VerificationBlock />
        )}
    </form>

export default connect(
    state => ({
        phone: state.phone,
        verification: state.verification
    }),
    dispatch => ({
        onChangePhoneNumber: number => dispatch(changePhoneNumber(number)),
        onSendCode: number => dispatch(sendCode(number))
    })
)(RecoveryForm)