import React from 'react'
import {$if, $ifEnter} from '../../react-helpers'

export default function ({waiting, message, way, onConfirm}) {
    let code

    return (
        <div>
            <div className="form-group">
                <p>На указанный вами {way === 'phone'
                    ? 'номер телефона отправлено СМС'
                    : 'адрес отправлено сообщение'} с кодом подтверждения.</p>
                <p>Введите полученный код чтобы продолжить восстановление пароля.</p>
            </div>

            <div className={`form-group ${$if(message, 'has-error')}`}>
                <input
                    autoFocus={true}
                    type={way === 'phone' ? 'number' : 'email'}
                    className="form-control" placeholder="Код из сообщения"
                    ref={node => code = node}
                    onKeyPress={$ifEnter(e => {if(!waiting) onConfirm(e.target.value)})} />

                <span className="help-block">{message}</span>
            </div>

            <button
                type="button" className="btn btn-primary"
                onClick={() => onConfirm(code.value)} disabled={waiting}>
                {$if(!waiting, "Подтвердить", "Подтверждение...")}
            </button>
        </div>)
}