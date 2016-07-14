import cookie from 'js-cookie'
import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
    render() {

        return (
            <div className="row header-adv">
                <div className="col-sm-4">
                    <div id="logo" className="logo">
                    </div>
                    <h3 className="text-muted" hidden="hidden">ВКармане</h3>
                </div>
                <div className="col-sm-5">
                    <div className="phone"><span>8 800</span> 500-35-85</div> 
                    <p className="text-muted phone-info">ежедневно с 6:00 до 19:00 (мск) по России бесплатно</p>
                </div>
                <div className="col-sm-3">
                  <nav>
                    <ul className="nav nav-pills pull-right">
                      <li role="presentation"><a href="/signin.html" className="icon-acc">Личный кабинет</a></li>
                    </ul>
                  </nav>
                </div>
            </div>
        )
    }
})