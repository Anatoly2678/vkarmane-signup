import React from 'react'
import debounce from 'lodash/debounce'
import defer from 'lodash/defer'
import {$if} from '../react-helpers'

export default React.createClass({
    getInitialState() {
        return {
            email: '',
            emailEmpty: false,
            emailExists: false,
            emailBlocked: false,
            waiting: false,
            wasEntered: false,
            emailNotValid: false,
        }
    },
    componentWillMount() {
        this.validateEmailDebounced = debounce(this.validateEmail, 500)
    },
    render() {
        return (
            <div>
                <label htmlFor="emailInput" className="newFieldLine">Осталось указать email и продолжим</label>

                <div className={`form-group ${$if(this.state.emailEmpty || this.state.emailExists || this.state.emailNotValid, 'has-error')}`}>
                    <input type="email" className="form-control" id="emailInput"
                           value={this.state.email} placeholder="Укажите ваш email" onChange={this.handleEmailChange} />

                    {$if(this.state.emailEmpty,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(this.state.emailNotValid,
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
        this.setState({
            email: e.target.value,
            emailEmpty: e.target.value.trim().length === 0,
            emailExists: false,
            emailBlocked: false,
            emailNotValid: false,
            waiting: false
        })

        this.raiseChange(null)

        defer(() =>{
            const emailPattern = /^[^@]+@[^.]+(\.[^.]+)+$/

            if (emailPattern.test(this.state.email)) {
                this.validateEmailDebounced()
                return
            }

            if (this.state.wasEntered && this.state.email.trim().length > 0) {
                this.setState({emailNotValid: true})
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

        this.raiseChange(this.state.email)
        this.setState({ wasEntered: true })
    },
    raiseChange(email) {
        this.props.onChange(email)
    }
})