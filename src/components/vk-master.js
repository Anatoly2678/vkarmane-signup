import React from 'react'

export default React.createClass({
    render() {
        return (
            <div className="row header-adv">
                <div className="col-xs-9">
                    <div className="col-xs-12 col-sm-5">
                        <div id="logo" className="logo">
                        </div>
                        <h3 className="text-muted" hidden="hidden">ВКармане</h3>
                    </div>
                    <div className="col-xs-12 col-sm-7 phone-in-header">
                        <div className="phone"><span>8 800</span> 500-35-85</div>
                        <p className="text-muted phone-info">Ежедневно с 06:00 до 18:00 по МСК</p>
                    </div>
                </div>
                <div className="col-xs-3">
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