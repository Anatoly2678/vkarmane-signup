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
                    Я соглашаюсь с <a href="http://www.vkarmane-online.ru/files/flib/1-generalTerms.pdf" target="_blank" >
                    Общими условиями договора потребительского займа</a> и 
                    <a href="http://www.vkarmane-online.ru/files/flib/3-termsOfLending.pdf" target="_blank">
                    Правилами предоставления займов</a> и 
                    <a href= "http://www.vkarmane-online.ru/files/flib/2-info.pdf" target="_blank">, составленными в соответствии с
                    Информацией об условиях предоставления, использования и возврата потребительского микрозайма</a>.
                    Прошу принять мое <a href="http://www.vkarmane-online.ru/files/flib/118.pdf" target="_blank">
                    Заявление о предоставлении микрозайма</a>.
                </label>
            </div>
            <div className="checkbox">
                <input
                    id="icomfirm" className="inputcb" type="checkbox"
                    checked={asp} disabled={disabled}
                    onChange={e => onChange({asp: e.target.checked})} />
                <label htmlFor="icomfirm"> <span></span>
                    Я принимаю <a href="http://www.vkarmane-online.ru/files/flib/5-agreementUse.pdf" target="_blank">
                    Соглашение об использовании АСП</a>,
                    <a href="http://www.vkarmane-online.ru/files/flib/9-personalDataThirdParties.pdf" target="_blank">
                    Согласие субъекта на предоставление персональных данных третьим лицам</a>,
                    <a href="http://www.vkarmane-online.ru/files/flib/7-agreementCooperation.pdf" target="_blank">
                    Согласие на взаимодействие с третьими лицами, направленное на возврат просроченной задолженности</a>,
                    подтверждаю ознакомление с <a href="http://www.vkarmane-online.ru/files/flib/4-yourPersonalData.pdf" target="_blank">
                    Правилами обработки персональных данных</a> и даю согласие МФК Джой Мани (ООО) на их обработку.
                </label>
            </div>
        </div>)
}