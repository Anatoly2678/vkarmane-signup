import React from 'react'

import {$if, $ifEnter} from '../../react-helpers'

export default function ({email, onChange, onSend, message, waiting, disabled}) {
    const validEmail = /^[\w|\.|-]+@[\w|\.|-]+(\.\w+)+$/.test(email)

    return (
        <div>
            <div className="form-group">
                <label htmlFor="emailInput">
                    Введите e-mail, указанный вами при регистрации
                </label>
            </div>

            <div className={`form-group ${$if(message, 'has-error')}`}>
                <input
                    autoFocus={true}
                    className="form-control" id="emailInput" type="email"
                    value={email} disabled={waiting || disabled}
                    onChange={e => onChange(e.target.value)}
                    onKeyPress={$ifEnter(e => onSend(email))} />
                <span className="help-block">{message}</span>
            </div>

            {$if(!disabled && validEmail,
                <div className="form-group">
                    <button
                        type="button" className="btn btn-primary"
                        onClick={() => onSend(email)} disabled={waiting}>
                        {$if(!waiting, "Подтвердите", "Подтверждение...")}
                    </button>
                </div>
            )}
        </div>)
}