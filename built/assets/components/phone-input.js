'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactMaskedinput = require('react-maskedinput');

var _reactMaskedinput2 = _interopRequireDefault(_reactMaskedinput);

var _phoneVerificationBox = require('./phone-verification-box');

var _phoneVerificationBox2 = _interopRequireDefault(_phoneVerificationBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = React.createClass({
    displayName: 'phone-input',
    getInitialState: function getInitialState() {
        return {
            phoneInputShown: true,
            phone: '',
            sendCodeButtonShown: false,
            verifyCodeDialogShown: true,
            phoneVerified: false,
            error: false,
            errorMessage: '',
            phoneAlreadyExists: false
        };
    },
    render: function render() {
        var _this = this;

        var phoneInput = React.createElement(
            'div',
            { className: "form-group" + (this.state.error ? " has-error" : "") },
            React.createElement(
                'label',
                { htmlFor: 'inputPhone' },
                'Мобильный телефон'
            ),
            React.createElement(
                'div',
                { className: 'input-group' },
                React.createElement(
                    'div',
                    { className: 'input-group-addon' },
                    '+7'
                ),
                React.createElement(_reactMaskedinput2.default, { type: 'tel', id: 'inputPhone', className: 'form-control',
                    mask: '(111) 111 - 11 - 11', placeholder: '(000) 000 - 00 - 00', onChange: this.handlePhoneChange })
            ),
            React.createElement(
                'span',
                { className: 'help-block' },
                this.state.errorMessage
            ),
            this.state.phoneAlreadyExists ? React.createElement(
                'div',
                { className: 'alert alert-warning' },
                React.createElement('span', { className: 'glyphicon glyphicon-exclamation-sign' }),
                React.createElement(
                    'smal',
                    null,
                    'Такой номер уже зарегистрирован. Пожалуйста, ',
                    React.createElement(
                        'a',
                        { href: '/login.html' },
                        'авторизуйтесь'
                    )
                )
            ) : null
        );

        var verifiedPhoneInput = React.createElement(
            'div',
            { className: 'form-group has-success has-feedback' },
            React.createElement(
                'label',
                { htmlFor: 'inputPhone' },
                'Мобильный телефон'
            ),
            React.createElement(
                'div',
                { className: 'input-group' },
                React.createElement(
                    'div',
                    { className: 'input-group-addon' },
                    '+7'
                ),
                React.createElement('input', { type: 'tel', id: 'inputPhone', className: 'form-control', value: this.state.phone, readOnly: true })
            ),
            React.createElement('span', { className: 'glyphicon glyphicon-ok form-control-feedback', 'aria-hidden': 'true' })
        );

        var sendCodeButton = React.createElement(
            'button',
            { type: 'button', className: 'btn btn-primary', onClick: this.handleSendCodeClick },
            'Подтвердить телефон'
        );

        var verifyCodeDialog = React.createElement(_phoneVerificationBox2.default, {
            phone: '+7' + this.state.phone,
            onError: function onError(msg) {
                return _this.setState({ error: true, errorMessage: msg });
            },
            onAlreadyExists: function onAlreadyExists() {
                return _this.setState({ phoneAlreadyExists: true });
            },
            onSeccess: function onSeccess() {
                return _this.setState({ phoneVerified: true });
            } });

        return React.createElement(_phoneVerificationBox2.default, {
            phone: '+7(953) 869 - 87 - 80', onError: alert,
            onAlreadyExists: function onAlreadyExists(m) {
                return alert(m);
            }, onSuccess: function onSuccess() {
                return alert("OK");
            } });

        return React.createElement(
            'div',
            null,
            this.state.phoneInputVisible ? phoneInput : null,
            this.state.sendCodeButtonVisible ? sendCodeButton : null,
            this.state.phoneVerificationBoxVisible ? verifyCodeDialog : null,
            this.state.phoneVerified ? verifiedPhoneInput : null
        );
    },
    handlePhoneChange: function handlePhoneChange(e) {
        var phone = e.target.value;
        var digitsInPhone = 10;
        var countDigits = function countDigits(text) {
            return (text.match(/\d/g) || []).length;
        };

        this.setState({
            phone: phone,
            phoneAlreadyExists: false,
            error: false,
            errorMessage: '',
            sendCodeButtonShown: countDigits(phone) === digitsInPhone
        });
    },
    handleSendCodeClick: function handleSendCodeClick() {
        $.ajax({
            type: "POST",
            url: '/Register.aspx/SendVerificationCodes',
            data: JSON.stringify({
                number: '+7' + this.state.phone,
                type: 'phone'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleSendCodeResult,
            error: this.handleRequestError
        });
    },
    handleSendCodeResult: function handleSendCodeResult(res) {
        var result = JSON.parse(res.d)['SendVerificationCodesResult'];

        if (result['IsExists']) {
            this.setState({
                sendCodeButtonShown: false,
                phoneAlreadyExists: true
            });
            return;
        }

        if (result['IsInBlockList']) {
            this.setState({
                error: true,
                errorMessage: 'Номер в черном списке'
            });
            return;
        }

        if (result['Code'] !== 0 && data['Message']) {
            this.setState({
                error: true,
                errorMessage: result['Message']
            });
            return;
        }

        this.setState({
            codeId: result['CodeId'],
            error: false,
            errorMessage: '',
            verifyCodeDialogShown: true,
            phoneInputShown: false,
            sendCodeButtonShown: false
        });
    },
    handleRequestError: function handleRequestError(xhr, code, err) {
        alert(err.toString());
    },
    handleCodeChange: function handleCodeChange(e) {
        this.setState({ code: e.target.value });
    },
    handleVerifyCodeClick: function handleVerifyCodeClick() {
        $.ajax({
            type: "POST",
            url: '/Register.aspx/Verify',
            data: JSON.stringify({ codeId: this.state.codeId, code: this.state.code }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleVerifyCodeResult,
            error: this.handleRequestError
        });
    },
    handleVerifyCodeResult: function handleVerifyCodeResult(res) {
        var result = JSON.parse(res.d)['VerifyResult'];

        if (result['IsCodeExpired']) {
            alert('Время жизни кода истекло');
            return;
        }

        if (result['IsInBlockList']) {
            this.setState({
                error: true,
                errorMessage: 'Номер в черном списке',
                phoneInputShown: true,
                verifyCodeDialogShown: false,
                sendCodeButtonShown: true
            });
            return;
        }

        if (result['IsCodeCorrect']) {
            this.setState({
                phoneVerified: true,
                phoneInputShown: false,
                verifyCodeDialogShown: false,
                sendCodeButtonShown: false
            });
            return;
        }

        throw new Error('Неправильный формат ответа');
    }
});