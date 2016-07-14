import React from 'react'
import InputMask from 'react-input-mask'

import {$if} from '../../react-helpers'

export default function ({number, waiting, message, disabled, onChange, onSend}) {
    const countDigits = text => (text.match(/\d/g) || []).length
    const digitsInPhone = 11
    const sendAvailable = countDigits(number) === digitsInPhone && !disabled
    const normalize = number => '+7' + number.substr('+7 '.length)

    return (
        <div>
            <div className="form-group">
                <label htmlFor="phoneInput">
                    Введите мобильный телефон, указанный вами при регистрации
                </label>
            </div>
            <div className={`form-group ${$if(message, 'has-error')}`}>
                <InputMask
                    autoFocus={true}
                    type="tel" id="phoneInput" className="form-control"
                    mask="+7 (999) 999 - 99 - 99" placeholder="+7 (___) ___ - __ - __" maskChar="_"
                    onKeyPress={e => onSend(number)}
                    disabled={disabled || waiting}
                    onChange={e => onChange(normalize(e.target.value))} />
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