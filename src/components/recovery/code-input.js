import React from 'react'
import {$if, $ifEnter, normalizePhone} from '../../react-helpers'

export default function ({number, waiting, message, way, secsToRepeat, onConfirm, onAbort, onRepeat}) {
    let code
    if (way === 'phone') {
        number = normalizePhone(number)
    }

    return (
        <div className="modal fade in" id="myModal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-width" role="document">
                <div className="modal-content" style={{ boxShadow: 'none' }}>
                    <button
                        type="button" className="close" style={{ margin: '20px' }}
                        onClick={onAbort}>
                        <span>&times; </span>
                    </button>

                    <div className="alert alert-dismissible alert-padding-adaptive" role="alert">
                        <h3 className="form-signin-heading">Подтверждение {way == 'phone' ? 'номера телефона' : <span>электронной&nbsp;почты</span>}</h3>
                        <div className="form-signin-heading-underline"></div>

                        <div className="form-group font-size-adaptive">
                            <p>На указанный вами {way === 'phone'
                                ? 'номер телефона отправлено СМС'
                                : 'адрес отправлено сообщение'} с&nbsp;кодом подтверждения.</p>
                            <p>Введите полученный код, чтобы продолжить оформление заявки.</p>
                        </div>

                        <div className="form-group">
                            <input
                                value={way === 'phone' ? '+7 ' + number.substr(2) : number}
                                readOnly style={{ backgroundColor: '#FFF', borderColor: '#FFF' }}
                                type="tel" className="form-control" />
                        </div>

                        {true ?
                            <div>
                                <div className={`form-group ${$if(message, 'has-error')}`}>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input
                                                autoFocus={true}
                                                type={way === 'phone' ? 'number' : 'email'}
                                                className="form-control" placeholder="Код из сообщения"
                                                ref={node => code = node}
                                                onKeyPress={$ifEnter(e => { if (!waiting) onConfirm(e.target.value) }) }
                                                style={{ backgroundColor: '#FFF', borderColor: '#FFF' }} />
                                        </div>
                                        <div className="col-sm-6">
                                            {$if(secsToRepeat,
                                                <div className="help-block" style={{ fontSize: '13px', lineHeight: "1.3", paddingRight: '5px', paddingLeft: '5px', color: '#8C949B' }}>
                                                    Повторное сообщение можно будет отправить через {secsToRepeat} сек
                                                </div>,
                                                <div style={{ marginTop: '15px' }}>
                                                    <a href="#" onClick={() => onRepeat(number)}>Отправить&nbsp;еще&nbsp;сообщение</a>
                                                </div>
                                            ) }
                                        </div>
                                    </div>

                                    <span className="help-block text-danger">{message}</span>
                                </div>

                                <button
                                    type="button" className="btn btn-primary btn-block"
                                    onClick={() => onConfirm(code.value) } disabled={waiting}>
                                    {$if(!waiting, way === 'phone' ? 'Подтвердить телефон' : 'Подтвердить адрес', "Подтверждение...") }
                                </button>

                            </div> : null}
                    </div>
                </div>
            </div>
        </div>)
}