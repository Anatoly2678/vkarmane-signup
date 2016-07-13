import React from 'react'
import { connect } from 'react-redux'
import {$if} from '../react-helpers'

import PhoneInput from './recovery/phone-input'
import CodeInput from './recovery/code-input'
import PasswordInput from './recovery/password-input'

import {
    changePhoneNumber,
    sendCode,
    confirmCode,
    changePassword
} from '../reducers/recovery'



const RecoveryForm = ({phone, verification, password,
    onChangePhoneNumber, onSendCode, onConfirmCode, onChangePassword}) =>
    <form className="form-signin" onSubmit={e => e.preventDefault()}>
        <h2 className="form-signin-heading">Восстановление пароля</h2>
        <div className="form-signin-heading-underline"></div>

        {$if(!verification.confirmed,
            <PhoneInput
                number={phone.number}
                waiting={phone.waiting}
                message={phone.message == 'User Not found' ? 'Пользователь не найден' : phone.message}
                disabled={!!phone.codeId}
                onChange={onChangePhoneNumber}
                onSend={onSendCode} />
        )}

        {$if(phone.codeId && !verification.confirmed,
            <CodeInput
                waiting={verification.waiting}
                message={verification.message}
                onConfirm={onConfirmCode} />
        )}

        {$if(verification.confirmed,
            <PasswordInput
                passMessage={password.passwordEmpty
                ? 'Пожалуйста, заполните поле'
                : password.failMessage}
                repeatMessage={password.repeatIncorrectly ? 'Пароль повторен неправильно' : ''}
                waiting={password.waiting}
                onSend={onChangePassword} />
        )}

        {$if(verification.waitingConfirmation,
            <div className="form-group">
                <div className="progress">
                    <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}></div>
                </div>
            </div>
        )}
    </form>

export default connect(
    state => ({
        phone: state.phone,
        verification: state.verification,
        password: state.password
    }),
    dispatch => ({
        onChangePhoneNumber: number => dispatch(changePhoneNumber(number)),
        onSendCode: number => dispatch(sendCode(number)),
        onConfirmCode: code => dispatch(confirmCode(code)),
        onChangePassword: (pass, repeat) => dispatch(changePassword({pass, repeat}))
    })
)(RecoveryForm)