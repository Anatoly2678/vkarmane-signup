import React from 'react'

export default function ({rules, asp, disabled, onChange}) {
    return (
        <div className="checkbox-group">
            <div className="checkbox">
                <input
                    id="iaccept" className="inputcb" type="checkbox"
                    checked={rules} disabled={disabled}
                    onChange={e => onChange({rules: e.target.checked})} />
                <label htmlFor="iaccept"> <span></span>
                    Я принимаю <a href="http://www.vkarmane-online.ru/files/flib/51.pdf" target="_blank" >
                    Общие условия договора потребительского займа</a>, <a href="http://www.vkarmane-online.ru/files/flib/69.pdf" target="_blank">
                    Правила предоставления займов</a> и <a href= "http://www.vkarmane-online.ru/files/flib/70.pdf" target="_blank">
                    Информацию об условиях предоставления, использования и возврата потребительского микрозайма</a>. Предлагаю рассмотреть мое <a href="http://www.vkarmane-online.ru/files/flib/84.pdf" target="_blank">
                    Заявление о предоставлении микрозайма</a>.
                </label>
            </div>
            <div className="checkbox">
                <input
                    id="icomfirm" className="inputcb" type="checkbox"
                    checked={asp} disabled={disabled}
                    onChange={e => onChange({asp: e.target.checked})} />
                <label htmlFor="icomfirm"> <span></span>
                    Я, подтверждаю принятие <a href="http://www.vkarmane-online.ru/files/flib/83.pdf" target="_blank">
                    Соглашения об использовании АСП</a> и <a href="http://www.vkarmane-online.ru/files/flib/45.pdf" target="_blank">
                    Правилами обработки персональных данных</a>.
                </label>
            </div>
        </div>)
}