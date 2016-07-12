webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jsCookie = __webpack_require__(198);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(74);

	var _reactDom2 = _interopRequireDefault(_reactDom);

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

		_reactDom2.default.render(_react2.default.createElement(SigninForm, null), document.getElementById('content'));

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.2
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					return (document.cookie = [
						key, '=', value,
						attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
						attributes.path    && '; path=' + attributes.path,
						attributes.domain  && '; domain=' + attributes.domain,
						attributes.secure ? '; secure' : ''
					].join(''));
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api(key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ }

});
//# sourceMappingURL=signin.bundle.js.map