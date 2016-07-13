import React from 'react'
import {$if} from '../../react-helpers'

export default function ({passMessage, repeatMessage, waiting, onSend}) {
    let pass
    let repeat

    return  (
        <div>
            <div className={`form-group ${$if(passMessage, 'has-error')}`}>
                <label htmlFor="pass">
                    Новый пароль
                </label>
                <input
                    type="password" id="pass" className="form-control"
                    ref={node => pass = node} />

                <span className="help-block">{passMessage}</span>
            </div>

            <div className={`form-group ${$if(repeatMessage, 'has-error')}`}>
                <label htmlFor="repeatPass">
                    Повторите пароль
                </label>
                <input
                    type="password" id="repeatPass" className="form-control"
                    ref={node => repeat = node} />

                <span className="help-block">{repeatMessage}</span>
            </div>

            <button
                type="button" className="btn btn-primary"
                onClick={() => onSend(pass.value, repeat.value)}
                disabled={waiting}>
                {$if(!waiting, 'Сохранить', 'Сохранение...')}
            </button>
        </div>)
}