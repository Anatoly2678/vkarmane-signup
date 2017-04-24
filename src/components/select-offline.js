import React from 'react'
import { connect } from 'react-redux'
import {$if} from '../react-helpers'
import PointChooser from './recovery/point-chooser'

export default React.createClass({
    render() {
        return (
            <form action="new_window.php" method="GET" id="pointer" className="form-signin" >
                <h4 className="form-signin-heading">Выбор точки выдачи займа</h4>
                    <div className="form-signin-heading-underline"></div>
                    <PointChooser />
                    <div className="row">
                        <div className="col-sm-6">
                            <button type="submit" disabled="disabled" className="btn btn-primary btn-block" id="btnReg">
                                Регистрация
                            </button>
                        </div>
                        <div className="col-sm-6">
                            <button  type="submit" disabled="disabled" className="btn btn-success btn-block" style={{paddingLeft:'0', paddingRight:'0' }} id="btnLogin">
                                Войти
                            </button>
                        </div>
                    </div>
            </form>)
    }
})