import React from 'react'
import {$if} from '../../react-helpers'

export default function ({message, trySendEmpty, waiting, onSend}) {
    let pass
    let repeat

    return  (
        <div>
            <div className={`form-group ${$if(trySendEmpty, 'has-error')}`}>
                <label htmlFor="passInput">
                    Новый пароль
                </label>
                <input
                    type="password" id="passInput" className="form-control"
                    ref={node => pass = node} />

                {$if(trySendEmpty,
                    <span className="help-block">Пожалуйста, заполните поле</span>)}
            </div>

            <div className={`form-group ${$if(message, 'has-error')}`}>
                <label htmlFor="confirmInput">
                    Повторите пароль
                </label>
                <input
                    type="password" id="confirmInput" className="form-control"
                    ref={node => repeat = node} />

                    <span className="help-block">{message}</span>
            </div>

            <button type="button" className="btn btn-primary"
                    onClick={() => onSend(pass.value, repeat.value)}>
                {$if(!waiting, 'Сохранить', 'Сохранение...')}
            </button>
        </div>)
}