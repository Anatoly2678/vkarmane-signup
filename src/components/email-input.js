import React from 'react'
import debounce from 'lodash/debounce'
import defer from 'lodash/defer'
import {$if} from '../react-helpers'

export default React.createClass({
    emailPattern: /^[\w|-|.]+@[\w|-]+(\.\w+)+$/,
    getInitialState() {
        return {
            email: '',
            emailExists: false,
            emailBlocked: false,
            waiting: false,
            wasEntered: false,
            success: false
        }
    },
    componentWillMount() {
        this.validateEmailDebounced = debounce(this.validateEmail, 500)
    },
    render() {
        const showNotEntered = this.state.wasEntered && this.state.email.trim().length === 0
        const emailNotValid = this.state.wasEntered &&
            this.state.email && !this.emailPattern.test(this.state.email)

        return (
            <div>
                <label htmlFor="emailInput">Осталось указать email и продолжим</label>

                <div className={`form-group ${
                        $if(showNotEntered || this.state.emailExists || emailNotValid, 'has-error')} ${
                        $if(this.state.success, 'has-success has-feedback')}`}>

                    <input type="email" className="form-control" id="emailInput"
                           value={this.state.email} placeholder="Укажите ваш email" onChange={this.handleEmailChange} />

                    {$if(this.state.success,
                        <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>)}

                    {$if(showNotEntered,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(emailNotValid,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}

                    {$if(this.state.emailExists,
                        <span className="help-block">Этот email уже зарегистрирован</span>)}

                    {$if(this.state.emailBlocked,
                        <span className="help-block">Этот email в черном списке</span>)}

                    {$if(this.state.waiting,
                        <div className="progress help-block">
                            <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}></div>
                        </div>)}
                </div>
            </div>)
    },
    handleEmailChange(e) {
        const email = e.target.value

        this.setState({
            email,
            emailExists: false,
            emailBlocked: false,
            waiting: false,
            success: false
        })

        this.raiseChange(null)

        defer(() =>{
            if(this.emailPattern.test(this.state.email.trim())) {
                this.setState({ wasEntered: true })
                this.validateEmailDebounced()
            }
        })
    },
    validateEmail () {
        this.setState({ waiting: true })

        $.ajax({
            type: "POST",
            url: '/Register.aspx/SendVerificationCodes',
            data: JSON.stringify({
                number: this.state.email,
                type: 'email'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleSendCodeResult,
            error: (xhr, code, err) => {
                this.setState({ waiting: false })
                console.error(err.toString())
            }
        })
    },
    validateEmailDebounced: () => {/* Заглушка */},
    handleSendCodeResult(res){
        this.setState({ waiting: false })
        const result = JSON.parse(res.d)['SendVerificationCodesResult']

        if(result['IsExists']) {
            this.setState({
                emailExists: true
            })
            return
        }

        if(result['IsInBlockList']) {
            this.setState({
                emailBlocked: true
            })
            return
        }

        if(result['Code'] !== 0 && result['Message']) {
            console.error(result['Message'])
            return
        }

        this.setState({ success: true })
        this.raiseChange(this.state.email)
    },
    raiseChange(email) {
        this.props.onChange(email)
    }
})