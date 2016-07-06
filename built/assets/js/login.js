'use strict';

var SigninBox = React.createClass({
    displayName: 'SigninBox',
    getInitialState: function getInitialState() {
        return {
            email: '',
            password: '',
            showAlert: false,
            aalertText: ''
        };
    },
    render: function render() {
        var alert = React.createElement(
            'div',
            { className: 'alert alert-danger', role: 'alert' },
            React.createElement(
                'small',
                null,
                this.state.alertText
            )
        );

        return React.createElement(
            'form',
            { className: 'form-signin', onSubmit: this.handleSubmit },
            React.createElement(
                'h2',
                { className: 'form-signin-heading' },
                'Вход'
            ),
            this.state.showAlert ? alert : null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { htmlFor: 'inputEmail' },
                    'Ваш email'
                ),
                React.createElement('input', { type: 'email', id: 'inputEmail', className: 'form-control',
                    placeholder: 'Укажите ваш email', required: true, autoFocus: true,
                    value: this.state.email, onChange: this.handleEmailChange })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { htmlFor: 'inputPassword' },
                    'Пароль'
                ),
                React.createElement('input', { type: 'password', id: 'inputPassword', className: 'form-control',
                    placeholder: 'Введите пароль', required: true,
                    value: this.state.password, onChange: this.handlePasswordChange })
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary btn-block' },
                        'Войти'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(
                        'button',
                        { type: 'button', onClick: this.handleRecovery, className: 'btn btn-link btn-block' },
                        'Забыли пароль?'
                    )
                )
            )
        );
    },
    handleEmailChange: function handleEmailChange(e) {
        this.setState({ email: e.target.value });
    },
    handlePasswordChange: function handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: '/ServiceModel/AuthService.svc/Login',
            data: JSON.stringify({
                TimeZoneOffset: new Date().getTimezoneOffset(),
                UserName: this.state.email,
                UserPassword: this.state.password,
                WorkspaceName: 'Default'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: this.handleLoginResult,
            error: this.handleLoginError
        });
    },
    handleLoginResult: function handleLoginResult(result) {
        if (result['Code'] != 0) {
            this.setState({
                password: '',
                showAlert: true,
                alertText: result['Message']
            });

            return;
        }

        $.post('/0/rest/LeadGeneratorService/SaveReferralIntoSession', JSON.stringify({
            param: $.cookie('lead_generator_referral')
        })).always(function () {
            return location.replace('/0/Nui/ViewModule.aspx');
        });
    },
    handleLoginError: function handleLoginError(xhr, status, err) {
        this.setState({
            showAlert: true,
            alertText: err.toString()
        });
    },
    handleRecovery: function handleRecovery() {
        location.replace('/Recovery.aspx');
    }
});