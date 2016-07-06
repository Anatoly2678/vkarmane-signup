import PhoneInput from './phone-input'
import FullnaameInput from './fullname-input'
import BirthdayInput from './birthday-input'
import EmailInput from './email-input'


export default React.createClass({
    render() {
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading">Регистрация</h2>
                <PhoneInput />
                <FullnaameInput />
                <BirthdayInput />
                <EmailInput />
            </form>)
    }
})