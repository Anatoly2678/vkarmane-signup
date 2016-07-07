import PhoneInput from './phone-input'
import FullNaameInput from './fullname-input'
import BirthdayInput from './birthday-input'
import EmailInput from './email-input'
import AgreementBox from './agreement-box'

import {$if} from '../react-helpers'

export default React.createClass({
    getInitialState() {
        return {
            phone: null,
            fullNameInputVisible: false,
            fullName: null,
            birthdayInputVisible: false,
            birthday: null,
            emailInputVisible: false,
            email: null,
            agreementBoxVisible: false
        }
    },
    render() {
        return (
            <form className="form-signin" onSubmit={this.onSubmit}>
                <h2 className="form-signin-heading">Регистрация</h2>
                <PhoneInput onChange={this.handlePhoneChange} />

                {$if(this.state.fullNameInputVisible,
                    <FullNaameInput onChange={this.handleFullNameChange} />)}

                {$if(this.state.birthdayInputVisible,
                    <BirthdayInput onChange={this.handleBirthdayChange} />)}

                {$if(this.state.emailInputVisible,
                    <EmailInput onChange={this.handleEmailChange} />)}

                {$if(this.state.agreementBoxVisible,
                    <AgreementBox />)}
            </form>)
    },
    handlePhoneChange(phone) {
        this.setState({
            phone: phone,
            fullNameInputVisible: this.state.fullNameInputVisible || !!phone
        })
    },
    handleFullNameChange(fullName) {
        this.setState({
            fullName: fullName,
            birthdayInputVisible: this.state.birthdayInputVisible || !!fullName
        })
    },
    handleBirthdayChange(birthday) {
        this.setState({
            birthday: birthday,
            emailInputVisible: this.state.emailInputVisible || !!birthday
        })
    },
    handleEmailChange(email) {
        this.setState({
            email: email,
            agreementBoxVisible: this.state.agreementBoxVisible || !!email
        })
    },
    onSubmit(e) {
        e.preventDefault()
    }
})