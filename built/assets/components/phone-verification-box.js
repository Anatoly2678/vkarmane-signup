"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = React.createClass({
    displayName: "phone-verification-box",
    getInitialState: function getInitialState() {
        return {
            codeId: null,
            code: '',
            codeExpired: false,
            errorMessage: null
        };
    },
    componentDidMount: function componentDidMount() {
        this.sendCode();
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "alert alert-info alert-dismissible", role: "alert" },
            React.createElement(
                "button",
                { type: "button", className: "close" },
                React.createElement(
                    "span",
                    null,
                    "×"
                )
            ),
            React.createElement(
                "h3",
                null,
                "Подтверждение номера телефона"
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "p",
                    null,
                    "На указанный вами номер телефона отправлено СМС с кодом подтверждения."
                ),
                React.createElement(
                    "p",
                    null,
                    "Введите полученный код чтобы продолжить оформление заявки."
                )
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement("input", { value: this.props.phone, readOnly: true, type: "tel", className: "form-control" })
            ),
            this.state.codeId ? React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { value: this.state.code, className: "form-control", onChange: this.handleCodeChange }),
                    React.createElement(
                        "span",
                        { className: "text-danger" },
                        this.state.errorMessage
                    )
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-primary", onClick: this.handleVerifyCodeClick },
                    "Подтвердить телефон"
                )
            ) : null,
            this.state.codeExpired ? React.createElement(
                "small",
                null,
                "Время жизни кода истекло. ",
                React.createElement(
                    "a",
                    { href: "#", onClick: this.handleSendNewCode },
                    "Отправить еще сообщение"
                )
            ) : null
        );
    },
    sendCode: function sendCode() {
        $.ajax({
            type: "POST",
            url: '/Register.aspx/SendVerificationCodes',
            data: JSON.stringify({
                number: this.props.phone,
                type: 'phone'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleSendCodeResult,
            error: function error(xhr, code, err) {
                return alert(err.toString());
            }
        });

        this.setState({ codeExpired: false });
    },
    handleSendCodeResult: function handleSendCodeResult(res) {
        var result = JSON.parse(res.d)['SendVerificationCodesResult'];

        if (result['IsExists']) {
            this.props.onAlreadyExists();
            return;
        }

        if (result['IsInBlockList']) {
            this.props.onError('Номер в черном списке');
            return;
        }

        if (result['Code'] !== 0 && data['Message']) {
            this.props.onError(result['Message']);
            return;
        }

        this.setState({ codeId: result['CodeId'] });
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
            error: function error(xhr, code, err) {
                return alert(err.toString());
            }
        });
    },
    handleVerifyCodeResult: function handleVerifyCodeResult(res) {
        var result = JSON.parse(res.d)['VerifyResult'];

        if (result['IsCodeExpired']) {
            this.setState({
                codeId: null,
                codeExpired: true
            });
            return;
        }

        if (result['IsInBlockList']) {
            this.props.onError('Номер в черном списке');
            return;
        }

        if (result['IsCodeCorrect']) {
            this.props.onSuccess();
            return;
        }

        this.setState({ errorMessage: 'Неверный код подтверждения' });
    },
    handleSendNewCode: function handleSendNewCode(e) {
        e.preventDefault();
        this.sendCode();
    }
});