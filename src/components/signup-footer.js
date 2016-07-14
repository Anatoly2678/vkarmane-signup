import cookie from 'js-cookie'
import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
    render() {

        return (
                <div className="step-group">
                    <div className="step-group-row">
                        <div className="step-group-cell step-group-item">
                            <div className="step-group-image signup-footer-step-one"></div>
                        </div>
                        <div className="step-group-cell step-group-sep"></div>
                        <div className="step-group-cell step-group-item">
                            <div className="step-group-image signup-footer-step-two"></div>
                        </div>
                        <div className="step-group-cell step-group-sep"></div>
                        <div className="step-group-cell step-group-item">
                            <div className="step-group-image signup-footer-step-three"></div>
                        </div>
                    </div>
                    <div className="step-group-footer">
                        <div className="step-group-cell step-group-item">
                            <div className="step-group-text">Регистрируйтесь</div>
                        </div>
                        <div className="step-group-cell"></div>
                        <div className="step-group-cell step-group-item">
                            <div className="step-group-text">Заполняйте анкету</div>
                        </div>
                        <div className="step-group-cell"></div>
                        <div className="step-group-cell step-group-item">
                            <div className="step-group-text">Получайте деньги</div>
                        </div>
                    </div>
                </div>
        )
    }
})