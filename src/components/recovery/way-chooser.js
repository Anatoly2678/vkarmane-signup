import React from 'react'

export default function WayChooser ({way, onChange}) {
    return (
        <div className="form-group">
            <div className="radio">
                <label>
                    <input
                        type="radio" name="optionsRadios"
                        id="useEmail" value="option1" checked={way === 'email'}
                        onChange={e => {if(e.target.checked) onChange('email')}}/>
                    По e-mail
                </label>
            </div>
            <div className="radio">
                <label>
                    <input
                        type="radio" name="optionsRadios"
                        id="usePhone" value="option2" checked={way === 'phone'}
                        onChange={e => {if(e.target.checked) onChange('phone')}} />
                    По номеру мобильного телефона
                </label>
            </div>
        </div>)
}