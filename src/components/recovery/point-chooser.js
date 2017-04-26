import React from 'react'

export default function PointChooser ({point, disabled, onChange}) {
    return (
        <div className="form-group">
            <div className="radio">
                <label disabled={disabled}>
                    <input type="radio" name="Point" value="51d452f2-d97b-4e8c-9968-e1fbb676027b" />
                        <div>Пункт оформления займов №1</div> 
                        <div>(ул. Гарина–Михайловского)</div>
                </label>
            </div>
			<div className="radio">
                <label disabled={disabled}>
                    <input type="radio" name="Point" value="c4008425-e35f-44d9-8722-af1638ff568d" />
                        <div>Пункт оформления займов №3</div>
                        <div>(ул. Красный проспект, 186)</div>
                </label>
            </div>
            <div className="radio" >
                <label disabled={disabled}>
                <input type="radio" name="Point" value="b0a9dd53-6070-41fc-9727-cd147b9570a2" />
                <div>Пункт оформления займов №5</div>
            <div>(ул. Трикотажная, 60/3)</div>
            </label>
            </div>
            <div className="radio" >
                <label disabled={disabled}>
                    <input type="radio" name="Point" value="cc0596cb-3288-4081-aebc-7ac9800354dd" />
                    <div>Пункт оформления займов №6</div>
                    <div>(ул. Дзержинского проспект, 61 к2 киоск)</div>
                </label>
            </div>
            <div className="radio">
                <label disabled={disabled}>
                <input type="radio" name="Point" value="fe007774-f9f7-4e06-bd7a-b9ba94383bfb"/>
                <div>Пункт оформления займов №7</div>
            <div>(ул. Карла Маркса проспект, 37/2)</div>
            </label>
            </div>
        </div>)
}
