import debounce from 'lodash/debounce'

const $if = (cond, result) => cond ? result : ''

export default React.createClass({
    getInitialState() {
        return {
            email: '',
            emailEmpty: false,
            emailExists: false,
            emailBlocked: false
        }
    },
    componentWillMount() {
        this.validateEmailDebounced = debounce(this.validateEmail, 500)
    },
    render() {
        return (
            <div>
                <label htmlFor="emailInput">Осталось указать email и продолжим</label>

                <div className={`form-group ${$if(this.state.emailEmpty || this.state.emailExists, 'has-error')}`}>
                    <input type="email" className="form-control" id="emailInput"
                           value={this.state.email} placeholder="address@example.com" onChange={this.handleEmailChange} />

                    {$if(this.state.emailEmpty,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(this.state.emailExists,
                        <span className="help-block">Этот email уже зарегистрирован</span>)}

                    {$if(this.state.emailBlocked,
                        <span className="help-block">Этот email в черном списке</span>)}
                </div>
            </div>)
    },
    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
            emailEmpty: e.target.value.trim().length === 0,
            emailExists: false,
            emailBlocked: false
        })

        this.validateEmailDebounced()
    },
    validateEmail () {
        const emailPattern = /^[^@]+@[^.]+(\.[^.]+)+$/
        if(!emailPattern.test(this.state.email)) {
            return
        }

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
            error: (xhr, code, err) => console.error(err.toString())
        })
    },
    validateEmailDebounced: () => {/* Заглушка */},
    handleSendCodeResult(res){
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
    }
})