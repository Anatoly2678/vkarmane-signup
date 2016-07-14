import React from 'react'
import MaskedInput from 'react-maskedinput'
import {$if} from '../../react-helpers'

export default function ({number, waiting, message, disabled, onChange, onSend}) {
    const countDigits = text => (text.match(/\d/g) || []).length
    const digitsInPhone = 11
    const sendAvailable = countDigits(number) === digitsInPhone && !disabled

    return (
        <div>
            <div className="form-group">
                <label htmlFor="phoneInput">
                    Введите мобильный телефон, указанный вами при регистрации
                </label>
            </div>
            <div className={`form-group ${$if(message, 'has-error')}`}>
                <div>
                    <span className="form-control country-code">+7</span>
                    <MaskedInput
                        autoFocus={true}
                        type="tel" id="phoneInput" className="form-control"
                        mask="(111) 111 - 11 - 11" placeholder="(___) ___ - __ - __"
                        value={number.substr('+7'.length)} /* Отрезаем +7 */
                        onChange={e => onChange('+7' + e.target.value)}
                        disabled={disabled || waiting} />
                </div>
                <span className="help-block">{message}</span>
            </div>

            {$if(sendAvailable,
                <button
                    type="button" className="btn btn-primary"
                    onClick={() => onSend(number)} disabled={waiting}>
                    {$if(!waiting, "Подтвердите", "Подтверждение...")}
                </button>
            )}
        </div>)
}