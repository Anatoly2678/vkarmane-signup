import React from 'react'
import InputMask from 'react-input-mask'

import {$if} from '../../react-helpers'

export default function ({number, waiting, message, disabled, onChange, onSend}) {
    const countDigits = text => (text.match(/\d/g) || []).length
    const digitsInPhone = 1 + 3 + 3 + 4
    const sendAvailable = countDigits(number) === digitsInPhone && !disabled

    return (
        <div>
            <div className="form-group">
                <label htmlFor="phoneInput">
                    Введите мобильный телефон, указанный вами при регистрации
                </label>
            </div>
            <div className={`form-group ${$if(message, 'has-error')}`}>
                <span className="form-control country-code">+7</span>
                <InputMask
                    autoFocus={true}
                    type="tel" id="phoneInput" className="form-control"
                    mask="(999) 999 - 99 - 99" placeholder="(___) ___ - __ - __" maskChar={null}
                    onKeyPress={e => onSend(number)}
                    disabled={disabled || waiting}
                    onChange={e => onChange('+7' + e.target.value)} />
                <span className="help-block">{message}</span>
            </div>

            {$if(sendAvailable,
                <div className="form-group">
                    <button
                        type="button" className="btn btn-primary"
                        onClick={() => onSend(number)} disabled={waiting}>
                        {$if(!waiting, "Подтвердите", "Подтверждение...")}
                    </button>
                </div>
            )}
        </div>)
}