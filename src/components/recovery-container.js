import React from 'react'
import { connect } from 'react-redux'
import {$if} from '../react-helpers'

import PhoneInput from './recovery/phone-input'
import EmailInput from './recovery/email-input'
import CodeInput from './recovery/code-input'
import PasswordInput from './recovery/password-input'
import WayChooser from './recovery/way-chooser'

import {
    sendCode,
    confirmCode,
    changePassword,
    chooseWay,
    changeNumber,
    abortCodeConfirmation
} from '../reducers/recovery'


const RecoveryForm = ({phone, verification, password, way,
    onChangeNumber, onSendCode, onConfirmCode, onChangePassword, onChangeWay,
    onAbortCodeConfirmation}) =>
    <form className="form-signin" onSubmit={e => e.preventDefault()}>
        <h2 className="form-signin-heading">Восстановить пароль</h2>
        <div className="form-signin-heading-underline"></div>

        {$if(!verification.confirmed,
                    <WayChooser
                        disabled={phone.waiting || verification.waiting}
                        way={way} 
                        onChange={onChangeWay} />)}

        {$if(!verification.confirmed,
            $if(way === 'phone',
                <PhoneInput
                    number={phone.number}
                    waiting={phone.waiting}
                    message={phone.message == 'User Not found' ? 'Пользователь не найден' : phone.message}
                    disabled={!!phone.codeId}
                    onChange={onChangeNumber}
                    onSend={onSendCode} />,
                <EmailInput
                    email={phone.number}
                    waiting={phone.waiting}
                    message={phone.message == 'User Not found' ? 'Пользователь не найден' : phone.message}
                    disabled={!!phone.codeId}
                    onSend={onSendCode}
                    onChange={onChangeNumber} />
            )
        )}

        {$if(phone.codeId && !verification.confirmed,
            <CodeInput
                number={phone.number}
                waiting={verification.waiting}
                way={way}
                message={verification.message}
                secsToRepeat={phone.secsToRepeat}
                onConfirm={onConfirmCode} 
                onAbort={onAbortCodeConfirmation}
                onRepeat={onSendCode} />
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
    </form>

export default connect(
    state => ({
        phone: state.phone,
        verification: state.verification,
        password: state.password,
        way: state.way
    }),
    dispatch => ({
        onSendCode: number => dispatch(sendCode(number)),
        onConfirmCode: code => dispatch(confirmCode(code)),
        onChangePassword: (pass, repeat) => dispatch(changePassword({pass, repeat})),
        onChangeNumber: number => dispatch(changeNumber(number)),
        onChangeWay: way => dispatch(chooseWay(way)),
        onAbortCodeConfirmation: () => dispatch(abortCodeConfirmation())
    })
)(RecoveryForm)