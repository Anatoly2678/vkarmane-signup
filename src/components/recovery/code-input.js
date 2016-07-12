import React from 'react'
import {$if} from '../../react-helpers'

export default function ({waiting, message, onConfirm}) {
    let code

    return (
        <div>
            <div className="form-group">
                <p>На указанный вами номер телефона отправлено СМС с кодом подтверждения.</p>
                <p>Введите полученный код чтобы продолжить восстановление пароля.</p>
            </div>

            <div className={`form-group ${$if(message, 'has-error')}`}>
                <input className="form-control" placeholder="Код из СМС"
                       ref={node => code = node} />

                <span className="help-block">{message}</span>
            </div>

            <button
                type="button" className="btn btn-primary"
                onClick={() => onConfirm(code.value)} disabled={waiting}>
                {$if(!waiting, "Подтвердить", "Подтверждение...")}
            </button>
        </div>)
}