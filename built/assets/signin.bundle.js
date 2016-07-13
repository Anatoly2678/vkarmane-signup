webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jsCookie = __webpack_require__(81);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(82);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _vkMaster = __webpack_require__(80);

	var _vkMaster2 = _interopRequireDefault(_vkMaster);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SigninForm = _react2.default.createClass({
	    displayName: 'SigninForm',
	    getInitialState: function getInitialState() {
	        return {
	            email: '',
	            password: '',
	            showAlert: false,
	            aalertText: ''
	        };
	    },
	    render: function render() {
	        var alert = _react2.default.createElement(
	            'div',
	            { className: 'alert alert-danger', role: 'alert' },
	            _react2.default.createElement(
	                'small',
	                null,
	                this.state.alertText
	            )
	        );

	        return _react2.default.createElement(
	            'form',
	            { className: 'form-signin', onSubmit: this.handleSubmit },
	            _react2.default.createElement(
	                'h2',
	                { className: 'form-signin-heading' },
	                'Вход'
	            ),
	            _react2.default.createElement('div', { className: 'form-signin-heading-underline' }),
	            this.state.showAlert ? alert : null,
	            _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                    'label',
	                    { htmlFor: 'inputEmail' },
	                    'Ваш email'
	                ),
	                _react2.default.createElement('input', { type: 'email', id: 'inputEmail', className: 'form-control',
	                    placeholder: 'Укажите ваш email', required: true, autoFocus: true,
	                    value: this.state.email, onChange: this.handleEmailChange })
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                    'label',
	                    { htmlFor: 'inputPassword' },
	                    'Пароль'
	                ),
	                _react2.default.createElement('input', { type: 'password', id: 'inputPassword', className: 'form-control',
	                    placeholder: 'Введите пароль', required: true,
	                    value: this.state.password, onChange: this.handlePasswordChange })
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-6' },
	                    _react2.default.createElement(
	                        'button',
	                        { type: 'submit', className: 'btn btn-primary btn-block' },
	                        'Войти'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-6' },
	                    _react2.default.createElement(
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

	        $.ajax({
	            type: "POST",
	            url: '/0/rest/LeadGeneratorService/SaveReferralIntoSession',
	            data: JSON.stringify({
	                param: _jsCookie2.default.get('lead_generator_referral')
	            }),
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function success() {
	                return location.replace('/0/Nui/ViewModule.aspx');
	            },
	            error: function error() {
	                return location.replace('/0/Nui/ViewModule.aspx');
	            }
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

	var SigninPage = _react2.default.createClass({
	    displayName: 'SigninPage',

	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'header clearfix' },
	                _react2.default.createElement(_vkMaster2.default, null)
	            ),
	            _react2.default.createElement(SigninForm, null)
	        );
	    }
	});

		_reactDom2.default.render(_react2.default.createElement(SigninPage, null), document.getElementById('content'));

/***/ }
]);
//# sourceMappingURL=signin.bundle.js.map