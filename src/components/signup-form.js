import React from 'react'
import PhoneInput from './phone-input'
import FullNameInput from './fullname-input'
import BirthdayInput from './birthday-input'
import EmailInput from './email-input'
import AgreementBox from './agreement-box'
import {$if} from '../react-helpers'
import cookie from 'js-cookie'

export default React.createClass({
    getInitialState() {
        return {
            phone: null,
            fullNameInputVisible: false,
            fullName: null,
            birthdayInputVisible: true,
            birthday: null,
            emailInputVisible: false,
            email: null,
            agreementBoxVisible: false,
            agree: false,
            continueButtonVisible: false,
            waitingForSignup: false
        }
    },

    render() {
        const continueEnabled =
            this.state.phone && this.state.fullName &&
            this.state.birthday && this.state.email &&
            this.state.agree

        return (
            <form className="form-signin" onSubmit={e => e.preventDefault()}>
                <h2 className="form-signin-heading">Регистрация</h2>
                <PhoneInput onChange={this.handlePhoneChange} />

                {$if(this.state.fullNameInputVisible,
                    <FullNameInput onChange={this.handleFullNameChange} />)}

                {$if(this.state.birthdayInputVisible,
                    <BirthdayInput onChange={this.handleBirthdayChange} maxAge={65} minAge={21} />)}

                {$if(this.state.emailInputVisible,
                    <EmailInput onChange={this.handleEmailChange} />)}

                {$if(this.state.agreementBoxVisible,
                    <AgreementBox onChange={this.handleAgreeChange} />)}

                {$if(this.state.continueButtonVisible && !this.state.waitingForSignup,
                    <button type="button" className="btn btn-primary btn-block"
                            onClick={this.handleContinueClick}disabled={!continueEnabled}>
                        Продолжить оформление →
                    </button>)}

                {$if(this.state.waitingForSignup,
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}></div>
                    </div>)}
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
            agreementBoxVisible: this.state.agreementBoxVisible || !!email,
            continueButtonVisible: this.state.continueButtonVisible || !!email
        })
    },

    handleAgreeChange(agree) {
        this.setState({ agree: agree })
    },

    handleContinueClick(e) {
        e.preventDefault()

        const s = this.state
        const token = {
            Fname: s.fullName.first,
            Sname: s.fullName.last,
            Mname: s.fullName.middle,
            Year: s.birthday.year,
            Month: + s.birthday.month + 1,
            Day: s.birthday.day,
            Phone: s.phone,
            Email: s.email,
            TimeZoneOffset: -((new Date().getTimezoneOffset())/60)} /* Наследие предков */

        this.setState({ waitingForSignup: true })
        $.ajax({
            type: "POST",
            url: '/Register.aspx/Register',
            data: JSON.stringify({ token }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleRegisterResult,
            error: (xhr, code, err) => {
                console.error(err.toString())
                this.setState({ waitingForSignup: false })
            }
        })
    },

    handleRegisterResult(response) {
        if (!response.d || response.d == "Error") {
            console.error(response)
            return
        }

        const result = JSON.parse(response.d).RegisterResult

        $.get('https://www.google-analytics.com/collect?' +
            `v=1&tid=UA-57742399-1&cid=${result.UniqueClientId}&uid=${result.UniqueClientId}&t=event&ec=register&ea=click&el=step1`)
        localStorage.setItem('ApplicationId', result.ApplicationId) /* Непостижимое наследие предков */

        $.ajax({
            type: "POST",
            url: '/ServiceModel/AuthService.svc/Login',
            data: JSON.stringify({
                TimeZoneOffset: new Date().getTimezoneOffset(),
                UserName: result.Login,
                UserPassword: result.Password,
                WorkspaceName: 'Default'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleLoginResult,
            error: (xhr, code, err) => console.error(err.toString())
        })
    },

    handleLoginResult(response) {
        if(response.Code != 0){
            console.error(response.Message)
            return
        }

        yaCounter27445353.reachGoal('oformlenie_zajavki_1')

        $.ajax({
            type: "POST",
            url: '/0/rest/LeadGeneratorService/SaveReferralIntoSession',
            data: JSON.stringify({
                param: this.referral()
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: () => location.replace('/0/Nui/ViewModule.aspx'),
            error: (xhr, code, err) => console.error(err.toString())
        })
    },

    // Извлекает из куки значение lead_generator_referral
    // и извлекает из него Url. Решает проблему, когда в lead_generator_referral
    // Url записывался с параметром. Это происходит при регистрации.
    referral() {
        const uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig

        const lead_generator_referral = cookie.get('lead_generator_referral')
        if(!lead_generator_referral) return null

        var matchs = lead_generator_referral.match(uri_pattern)
        if(!matchs || !matchs[0]) return null

        return matchs[0]
    }
})

