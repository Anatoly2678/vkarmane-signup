webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _recoveryContainer = __webpack_require__(1);

	var _recoveryContainer2 = _interopRequireDefault(_recoveryContainer);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _vkMaster = __webpack_require__(71);

	var _vkMaster2 = _interopRequireDefault(_vkMaster);

	var _reactDom = __webpack_require__(72);

	var _reactRedux = __webpack_require__(33);

	var _redux = __webpack_require__(40);

	var _recovery = __webpack_require__(62);

	var _recovery2 = _interopRequireDefault(_recovery);

	var _reduxThunk = __webpack_require__(211);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(212);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loggerMiddleware = (0, _reduxLogger2.default)();

	var store = (0, _redux.createStore)(_recovery2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'div',
	            { className: 'header clearfix' },
	            _react2.default.createElement(_vkMaster2.default, null)
	        ),
	        _react2.default.createElement(_recoveryContainer2.default, null)
	    )
		), document.getElementById('content'));

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(33);

	var _reactHelpers = __webpack_require__(55);

	var _phoneInput = __webpack_require__(56);

	var _phoneInput2 = _interopRequireDefault(_phoneInput);

	var _emailInput = __webpack_require__(58);

	var _emailInput2 = _interopRequireDefault(_emailInput);

	var _codeInput = __webpack_require__(59);

	var _codeInput2 = _interopRequireDefault(_codeInput);

	var _passwordInput = __webpack_require__(60);

	var _passwordInput2 = _interopRequireDefault(_passwordInput);

	var _wayChooser = __webpack_require__(61);

	var _wayChooser2 = _interopRequireDefault(_wayChooser);

	var _recovery = __webpack_require__(62);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RecoveryForm = function RecoveryForm(_ref) {
	    var phone = _ref.phone;
	    var verification = _ref.verification;
	    var password = _ref.password;
	    var way = _ref.way;
	    var onChangeNumber = _ref.onChangeNumber;
	    var onSendCode = _ref.onSendCode;
	    var onConfirmCode = _ref.onConfirmCode;
	    var onChangePassword = _ref.onChangePassword;
	    var onChangeWay = _ref.onChangeWay;
	    return _react2.default.createElement(
	        'form',
	        { className: 'form-signin', onSubmit: function onSubmit(e) {
	                return e.preventDefault();
	            } },
	        _react2.default.createElement(
	            'h2',
	            { className: 'form-signin-heading' },
	            'Восстановить пароль'
	        ),
	        _react2.default.createElement('div', { className: 'form-signin-heading-underline' }),
	        _react2.default.createElement(_wayChooser2.default, { way: way, onChange: onChangeWay }),
	        (0, _reactHelpers.$if)(!verification.confirmed, (0, _reactHelpers.$if)(way === 'phone', _react2.default.createElement(_phoneInput2.default, {
	            number: phone.number,
	            waiting: phone.waiting,
	            message: phone.message == 'User Not found' ? 'Пользователь не найден' : phone.message,
	            disabled: !!phone.codeId,
	            onChange: onChangeNumber,
	            onSend: onSendCode }), _react2.default.createElement(_emailInput2.default, {
	            email: phone.number,
	            waiting: phone.waiting,
	            message: phone.message == 'User Not found' ? 'Пользователь не найден' : phone.message,
	            disabled: !!phone.codeId,
	            onSend: onSendCode,
	            onChange: onChangeNumber }))),
	        (0, _reactHelpers.$if)(phone.codeId && !verification.confirmed, _react2.default.createElement(_codeInput2.default, {
	            waiting: verification.waiting,
	            message: verification.message,
	            onConfirm: onConfirmCode })),
	        (0, _reactHelpers.$if)(verification.confirmed, _react2.default.createElement(_passwordInput2.default, {
	            passMessage: password.passwordEmpty ? 'Пожалуйста, заполните поле' : password.failMessage,
	            repeatMessage: password.repeatIncorrectly ? 'Пароль повторен неправильно' : '',
	            waiting: password.waiting,
	            onSend: onChangePassword })),
	        (0, _reactHelpers.$if)(verification.waitingConfirmation, _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	                'div',
	                { className: 'progress' },
	                _react2.default.createElement('div', { className: 'progress-bar progress-bar-striped active', style: { width: '100%' } })
	            )
	        ))
	    );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	    return {
	        phone: state.phone,
	        verification: state.verification,
	        password: state.password,
	        way: state.way
	    };
	}, function (dispatch) {
	    return {
	        onSendCode: function onSendCode(number) {
	            return dispatch((0, _recovery.sendCode)(number));
	        },
	        onConfirmCode: function onConfirmCode(code) {
	            return dispatch((0, _recovery.confirmCode)(code));
	        },
	        onChangePassword: function onChangePassword(pass, repeat) {
	            return dispatch((0, _recovery.changePassword)({ pass: pass, repeat: repeat }));
	        },
	        onChangeNumber: function onChangeNumber(number) {
	            return dispatch((0, _recovery.changeNumber)(number));
	        },
	        onChangeWay: function onChangeWay(way) {
	            return dispatch((0, _recovery.chooseWay)(way));
	        }
	    };
		})(RecoveryForm);

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;

	var _Provider = __webpack_require__(34);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(37);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = undefined;

	var _react = __webpack_require__(2);

	var _storeShape = __webpack_require__(35);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _warning = __webpack_require__(36);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;

	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.store = props.store;
	    return _this;
	  }

	  Provider.prototype.render = function render() {
	    var children = this.props.children;

	    return _react.Children.only(children);
	  };

	  return Provider;
	}(_react.Component);

	exports["default"] = Provider;

	if (true) {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;

	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}

	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _react.PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	exports["default"] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});

/***/ },

/***/ 36:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that you can use this stack
	    // to find the callsite that caused this warning to fire.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.__esModule = true;
	exports["default"] = connect;

	var _react = __webpack_require__(2);

	var _storeShape = __webpack_require__(35);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _shallowEqual = __webpack_require__(38);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _wrapActionCreators = __webpack_require__(39);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _warning = __webpack_require__(36);

	var _warning2 = _interopRequireDefault(_warning);

	var _isPlainObject = __webpack_require__(42);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _hoistNonReactStatics = __webpack_require__(53);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(54);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;

	  var mapDispatch = undefined;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }

	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;

	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

	  // Helps track hot reloading.
	  var version = nextVersion++;

	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }

	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (true) {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }

	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.store = props.store || context.store;

	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }

	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }

	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

	        if (true) {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };

	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';

	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }

	        if (true) {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };

	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }

	        var dispatch = store.dispatch;

	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

	        if (true) {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };

	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';

	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }

	        if (true) {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };

	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }

	        this.mergedProps = nextMergedProps;
	        return true;
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };

	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };

	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };

	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };

	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }

	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }

	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged;
	        var hasStoreStateChanged = this.hasStoreStateChanged;
	        var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
	        var statePropsPrecalculationError = this.statePropsPrecalculationError;
	        var renderedElement = this.renderedElement;

	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;

	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }

	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }

	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }

	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }

	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }

	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }

	        return this.renderedElement;
	      };

	      return Connect;
	    }(_react.Component);

	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };

	    if (true) {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }

	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }

	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}

/***/ },

/***/ 38:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = wrapActionCreators;

	var _redux = __webpack_require__(40);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(41);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(48);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(50);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(51);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(52);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(49);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (("development") !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(42);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(46);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(43),
	    isHostObject = __webpack_require__(44),
	    isObjectLike = __webpack_require__(45);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },

/***/ 43:
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },

/***/ 44:
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },

/***/ 45:
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(47)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 47:
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(41);

	var _isPlainObject = __webpack_require__(42);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(49);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (true) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ },

/***/ 49:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },

/***/ 50:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(52);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },

/***/ 52:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },

/***/ 53:
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },

/***/ 55:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.$if = $if;
	exports.$ifEnter = $ifEnter;
	exports.normalizePhone = normalizePhone;
	function $if(cond, result) {
	    var alt = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    return cond ? result : alt;
	}

	function $ifEnter(handler) {
	    return function (e) {
	        if (e.key === 'Enter') handler(e);
	    };
	}

	function normalizePhone(number) {
	    if (!number) throw new Error('Argument number is false');

	    var digits = number.match(/\d/g);
	    if (!digits || !digits.length) {
	        throw new Error('Invalid number');
	    }

	    if (digits.length === 10 && digits[0] != '7') {
	        digits.unshift('7');
	    }

	    if (digits.length !== 11) {
	        throw new Error('Invalid number');
	    }

	    var str = digits.join();
	    return '+7(' + str.substr(1, 3) + ') - ' + str.substr(4, 3) + ' - ' + str.substr(7, 2) + ' - ' + str.substr(9, 2);
	}

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactInputMask = __webpack_require__(57);

	var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

	var _reactHelpers = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _default(_ref) {
	    var number = _ref.number;
	    var waiting = _ref.waiting;
	    var message = _ref.message;
	    var disabled = _ref.disabled;
	    var _onChange = _ref.onChange;
	    var onSend = _ref.onSend;

	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	                'label',
	                { htmlFor: 'phoneInput' },
	                'Введите мобильный телефон, указанный вами при регистрации'
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (0, _reactHelpers.$if)(message, 'has-error') },
	            _react2.default.createElement(
	                'span',
	                { className: 'form-control country-code' },
	                '+7'
	            ),
	            _react2.default.createElement(_reactInputMask2.default, {
	                autoFocus: true,
	                type: 'tel', id: 'phoneInput', className: 'form-control',
	                mask: '(999) 999 - 99 - 99', placeholder: '(___) ___ - __ - __', maskChar: null,
	                onKeyPress: function onKeyPress(e) {
	                    return onSend(number);
	                },
	                disabled: disabled || waiting,
	                onChange: function onChange(e) {
	                    return _onChange('+7' + e.target.value);
	                } }),
	            _react2.default.createElement(
	                'span',
	                { className: 'help-block' },
	                message
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	                'button',
	                {
	                    type: 'button', className: 'btn btn-primary',
	                    onClick: function onClick() {
	                        return onSend(number);
	                    }, disabled: waiting },
	                (0, _reactHelpers.$if)(!waiting, "Подтвердите", "Подтверждение...")
	            )
	        )
	    );
	}
	exports.default = _default;

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/sanniassin/react-input-mask

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var React = __webpack_require__(2);

	var InputElement = React.createClass({
	    displayName: "InputElement",

	    defaultCharsRules: {
	        "9": "[0-9]",
	        "a": "[A-Za-z]",
	        "*": "[A-Za-z0-9]"
	    },
	    defaultMaskChar: "_",
	    lastCaretPos: null,
	    isAndroidBrowser: function () {
	        var windows = new RegExp("windows", "i");
	        var firefox = new RegExp("firefox", "i");
	        var android = new RegExp("android", "i");
	        var ua = navigator.userAgent;
	        return !windows.test(ua) && !firefox.test(ua) && android.test(ua);
	    },
	    isWindowsPhoneBrowser: function () {
	        var windows = new RegExp("windows", "i");
	        var phone = new RegExp("phone", "i");
	        var ua = navigator.userAgent;
	        return windows.test(ua) && phone.test(ua);
	    },
	    isAndroidFirefox: function () {
	        var windows = new RegExp("windows", "i");
	        var firefox = new RegExp("firefox", "i");
	        var android = new RegExp("android", "i");
	        var ua = navigator.userAgent;
	        return !windows.test(ua) && firefox.test(ua) && android.test(ua);
	    },
	    isDOMElement: function (element) {
	        return typeof HTMLElement === "object" ? element instanceof HTMLElement // DOM2
	        : element.nodeType === 1 && typeof element.nodeName === "string";
	    },
	    // getDOMNode is deprecated but we need it to stay compatible with React 0.12
	    getInputDOMNode: function () {
	        var input = this.refs.input;

	        if (!input) {
	            return null;
	        }

	        // React 0.14
	        if (this.isDOMElement(input)) {
	            return input;
	        }

	        return input.getDOMNode();
	    },
	    enableValueAccessors: function () {
	        var _this = this;

	        var canUseAccessors = !!(Object.getOwnPropertyDescriptor && Object.getPrototypeOf && Object.defineProperty);
	        if (canUseAccessors) {
	            var input = this.getInputDOMNode();
	            this.valueDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value');
	            Object.defineProperty(input, 'value', {
	                configurable: true,
	                enumerable: true,
	                get: function () {
	                    return _this.value;
	                },
	                set: function (val) {
	                    _this.value = val;
	                    _this.valueDescriptor.set.call(input, val);
	                }
	            });
	        }
	    },
	    disableValueAccessors: function () {
	        var valueDescriptor = this.valueDescriptor;

	        if (!valueDescriptor) {
	            return;
	        }
	        this.valueDescriptor = null;
	        var input = this.getInputDOMNode();
	        Object.defineProperty(input, 'value', valueDescriptor);
	    },
	    getInputValue: function () {
	        var input = this.getInputDOMNode();
	        var valueDescriptor = this.valueDescriptor;

	        var value;
	        if (valueDescriptor) {
	            value = valueDescriptor.get.call(input);
	        } else {
	            value = input.value;
	        }

	        return value;
	    },
	    getPrefix: function () {
	        var prefix = "";
	        var mask = this.mask;

	        for (var i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
	            prefix += mask[i];
	        }
	        return prefix;
	    },
	    getFilledLength: function () {
	        var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

	        var i;
	        var maskChar = this.maskChar;

	        if (!maskChar) {
	            return value.length;
	        }

	        for (i = value.length - 1; i >= 0; --i) {
	            var character = value[i];
	            if (!this.isPermanentChar(i) && this.isAllowedChar(character, i)) {
	                break;
	            }
	        }

	        return ++i || this.getPrefix().length;
	    },
	    getLeftEditablePos: function (pos) {
	        for (var i = pos; i >= 0; --i) {
	            if (!this.isPermanentChar(i)) {
	                return i;
	            }
	        }
	        return null;
	    },
	    getRightEditablePos: function (pos) {
	        var mask = this.mask;

	        for (var i = pos; i < mask.length; ++i) {
	            if (!this.isPermanentChar(i)) {
	                return i;
	            }
	        }
	        return null;
	    },
	    isEmpty: function () {
	        var _this2 = this;

	        var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

	        return !value.split("").some(function (character, i) {
	            return !_this2.isPermanentChar(i) && _this2.isAllowedChar(character, i);
	        });
	    },
	    isFilled: function () {
	        var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

	        return this.getFilledLength(value) === this.mask.length;
	    },
	    createFilledArray: function (length, val) {
	        var array = [];
	        for (var i = 0; i < length; i++) {
	            array[i] = val;
	        }
	        return array;
	    },
	    formatValue: function (value) {
	        var _this3 = this;

	        var maskChar = this.maskChar;
	        var mask = this.mask;

	        if (!maskChar) {
	            var prefix = this.getPrefix();
	            var prefixLen = prefix.length;
	            value = this.insertRawSubstr("", value, 0);
	            while (value.length > prefixLen && this.isPermanentChar(value.length - 1)) {
	                value = value.slice(0, value.length - 1);
	            }

	            if (value.length < prefixLen) {
	                value = prefix;
	            }

	            return value;
	        }
	        if (value) {
	            var emptyValue = this.formatValue("");
	            return this.insertRawSubstr(emptyValue, value, 0);
	        }
	        return value.split("").concat(this.createFilledArray(mask.length - value.length, null)).map(function (character, pos) {
	            if (_this3.isAllowedChar(character, pos)) {
	                return character;
	            } else if (_this3.isPermanentChar(pos)) {
	                return mask[pos];
	            }
	            return maskChar;
	        }).join("");
	    },
	    clearRange: function (value, start, len) {
	        var _this4 = this;

	        var end = start + len;
	        var maskChar = this.maskChar;
	        var mask = this.mask;

	        if (!maskChar) {
	            var prefixLen = this.getPrefix().length;
	            value = value.split("").filter(function (character, i) {
	                return i < prefixLen || i < start || i >= end;
	            }).join("");
	            return this.formatValue(value);
	        }
	        return value.split("").map(function (character, i) {
	            if (i < start || i >= end) {
	                return character;
	            }
	            if (_this4.isPermanentChar(i)) {
	                return mask[i];
	            }
	            return maskChar;
	        }).join("");
	    },
	    replaceSubstr: function (value, newSubstr, pos) {
	        return value.slice(0, pos) + newSubstr + value.slice(pos + newSubstr.length);
	    },
	    insertRawSubstr: function (value, substr, pos) {
	        var mask = this.mask;
	        var maskChar = this.maskChar;

	        var isFilled = this.isFilled(value);
	        var prefixLen = this.getPrefix().length;
	        substr = substr.split("");

	        if (!maskChar && pos > value.length) {
	            value += mask.slice(value.length, pos);
	        }

	        for (var i = pos; i < mask.length && substr.length;) {
	            var isPermanent = this.isPermanentChar(i);
	            if (!isPermanent || mask[i] === substr[0]) {
	                var character = substr.shift();
	                if (this.isAllowedChar(character, i, true)) {
	                    if (i < value.length) {
	                        if (maskChar || isFilled || i < prefixLen) {
	                            value = this.replaceSubstr(value, character, i);
	                        } else {
	                            value = this.formatValue(value.substr(0, i) + character + value.substr(i));
	                        }
	                    } else if (!maskChar) {
	                        value += character;
	                    }
	                    ++i;
	                }
	            } else {
	                if (!maskChar && i >= value.length) {
	                    value += mask[i];
	                } else if (maskChar && isPermanent && substr[0] === maskChar) {
	                    substr.shift();
	                }
	                ++i;
	            }
	        }
	        return value;
	    },
	    getRawSubstrLength: function (value, substr, pos) {
	        var mask = this.mask;
	        var maskChar = this.maskChar;

	        substr = substr.split("");
	        for (var i = pos; i < mask.length && substr.length;) {
	            if (!this.isPermanentChar(i) || mask[i] === substr[0]) {
	                var character = substr.shift();
	                if (this.isAllowedChar(character, i, true)) {
	                    ++i;
	                }
	            } else {
	                ++i;
	            }
	        }
	        return i - pos;
	    },
	    isAllowedChar: function (character, pos) {
	        var allowMaskChar = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	        var mask = this.mask;
	        var maskChar = this.maskChar;

	        if (this.isPermanentChar(pos)) {
	            return mask[pos] === character;
	        }
	        var ruleChar = mask[pos];
	        var charRule = this.charsRules[ruleChar];
	        return new RegExp(charRule).test(character || "") || allowMaskChar && character === maskChar;
	    },
	    isPermanentChar: function (pos) {
	        return this.permanents.indexOf(pos) !== -1;
	    },
	    setCaretToEnd: function () {
	        var filledLen = this.getFilledLength();
	        var pos = this.getRightEditablePos(filledLen);
	        if (pos !== null) {
	            this.setCaretPos(pos);
	        }
	    },
	    setSelection: function (start) {
	        var len = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	        var input = this.getInputDOMNode();
	        if (!input) {
	            return;
	        }

	        var end = start + len;
	        if ("selectionStart" in input && "selectionEnd" in input) {
	            input.selectionStart = start;
	            input.selectionEnd = end;
	        } else {
	            var range = input.createTextRange();
	            range.collapse(true);
	            range.moveStart("character", start);
	            range.moveEnd("character", end - start);
	            range.select();
	        }
	    },
	    getSelection: function () {
	        var input = this.getInputDOMNode();
	        var start = 0;
	        var end = 0;

	        if ("selectionStart" in input && "selectionEnd" in input) {
	            start = input.selectionStart;
	            end = input.selectionEnd;
	        } else {
	            var range = document.selection.createRange();
	            if (range.parentElement() === input) {
	                start = -range.moveStart("character", -input.value.length);
	                end = -range.moveEnd("character", -input.value.length);
	            }
	        }

	        return {
	            start: start,
	            end: end,
	            length: end - start
	        };
	    },
	    getCaretPos: function () {
	        return this.getSelection().start;
	    },
	    setCaretPos: function (pos) {
	        var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) {
	            return setTimeout(fn, 0);
	        };

	        var setPos = this.setSelection.bind(this, pos, 0);

	        setPos();
	        raf(setPos);

	        this.lastCaretPos = pos;
	    },
	    isFocused: function () {
	        return document.activeElement === this.getInputDOMNode();
	    },
	    parseMask: function (mask) {
	        var _this5 = this;

	        if (!mask || typeof mask !== "string") {
	            return {
	                mask: null,
	                lastEditablePos: null,
	                permanents: []
	            };
	        }
	        var str = "";
	        var permanents = [];
	        var isPermanent = false;
	        var lastEditablePos = null;

	        mask.split("").forEach(function (character) {
	            if (!isPermanent && character === "\\") {
	                isPermanent = true;
	            } else {
	                if (isPermanent || !_this5.charsRules[character]) {
	                    permanents.push(str.length);
	                } else {
	                    lastEditablePos = str.length;
	                }
	                str += character;
	                isPermanent = false;
	            }
	        });

	        return {
	            mask: str,
	            lastEditablePos: lastEditablePos,
	            permanents: permanents
	        };
	    },
	    getStringValue: function (value) {
	        return !value && value !== 0 ? "" : value + "";
	    },
	    getInitialState: function () {
	        this.hasValue = this.props.value != null;
	        this.charsRules = "formatChars" in this.props ? this.props.formatChars : this.defaultCharsRules;

	        var mask = this.parseMask(this.props.mask);
	        var defaultValue = this.props.defaultValue != null ? this.props.defaultValue : '';
	        var value = this.props.value != null ? this.props.value : defaultValue;

	        value = this.getStringValue(value);

	        this.mask = mask.mask;
	        this.permanents = mask.permanents;
	        this.lastEditablePos = mask.lastEditablePos;
	        this.maskChar = "maskChar" in this.props ? this.props.maskChar : this.defaultMaskChar;

	        if (this.mask && (this.props.alwaysShowMask || value)) {
	            value = this.formatValue(value);
	        }

	        return { value: value };
	    },
	    componentWillMount: function () {
	        var mask = this.mask;
	        var value = this.state.value;

	        if (mask && value) {
	            this.setState({ value: value });
	        }
	    },
	    componentWillReceiveProps: function (nextProps) {
	        this.hasValue = this.props.value != null;
	        this.charsRules = "formatChars" in nextProps ? nextProps.formatChars : this.defaultCharsRules;

	        var oldMask = this.mask;
	        var mask = this.parseMask(nextProps.mask);
	        var isMaskChanged = mask.mask && mask.mask !== this.mask;

	        this.mask = mask.mask;
	        this.permanents = mask.permanents;
	        this.lastEditablePos = mask.lastEditablePos;
	        this.maskChar = "maskChar" in nextProps ? nextProps.maskChar : this.defaultMaskChar;

	        if (!this.mask) {
	            return;
	        }

	        var newValue = nextProps.value != null ? this.getStringValue(nextProps.value) : this.state.value;

	        if (!oldMask && nextProps.value == null) {
	            newValue = this.getInputDOMNode().value;
	        }

	        var showEmpty = nextProps.alwaysShowMask || this.isFocused();
	        if (isMaskChanged || mask.mask && (newValue || showEmpty && !this.hasValue)) {
	            newValue = this.formatValue(newValue);

	            if (isMaskChanged) {
	                var pos = this.lastCaretPos;
	                var filledLen = this.getFilledLength(newValue);
	                if (filledLen < pos) {
	                    this.setCaretPos(this.getRightEditablePos(filledLen));
	                }
	            }
	        }
	        if (mask.mask && this.isEmpty(newValue) && !showEmpty && !this.hasValue) {
	            newValue = "";
	        }
	        this.value = newValue;
	        if (this.state.value !== newValue) {
	            this.setState({ value: newValue });
	        }
	    },
	    componentDidUpdate: function (prevProps, prevState) {
	        if ((this.mask || prevProps.mask) && this.props.value == null) {
	            this.updateUncontrolledInput();
	        }
	    },
	    updateUncontrolledInput: function () {
	        if (this.getInputDOMNode().value !== this.state.value) {
	            this.getInputDOMNode().value = this.state.value;
	        }
	    },
	    onKeyDown: function (event) {
	        var hasHandler = typeof this.props.onKeyDown === "function";
	        if (event.ctrlKey || event.metaKey) {
	            if (hasHandler) {
	                this.props.onKeyDown(event);
	            }
	            return;
	        }

	        var caretPos = this.getCaretPos();
	        var value = this.state.value;
	        var key = event.key;
	        var preventDefault = false;
	        switch (key) {
	            case "Backspace":
	            case "Delete":
	                var prefixLen = this.getPrefix().length;
	                var deleteFromRight = key === "Delete";
	                var selectionRange = this.getSelection();
	                if (selectionRange.length) {
	                    value = this.clearRange(value, selectionRange.start, selectionRange.length);
	                } else if (caretPos < prefixLen || !deleteFromRight && caretPos === prefixLen) {
	                    caretPos = prefixLen;
	                } else {
	                    var editablePos = deleteFromRight ? this.getRightEditablePos(caretPos) : this.getLeftEditablePos(caretPos - 1);
	                    if (editablePos !== null) {
	                        value = this.clearRange(value, editablePos, 1);
	                        caretPos = editablePos;
	                    }
	                }
	                preventDefault = true;
	                break;
	            default:
	                break;
	        }

	        if (hasHandler) {
	            this.props.onKeyDown(event);
	        }

	        if (value !== this.state.value) {
	            event.target.value = value;
	            this.setState({
	                value: this.hasValue ? this.state.value : value
	            });
	            preventDefault = true;
	            if (typeof this.props.onChange === "function") {
	                this.props.onChange(event);
	            }
	        }
	        if (preventDefault) {
	            event.preventDefault();
	            this.setCaretPos(caretPos);
	        }
	    },
	    onKeyPress: function (event) {
	        var key = event.key;
	        var hasHandler = typeof this.props.onKeyPress === "function";
	        if (key === "Enter" || event.ctrlKey || event.metaKey) {
	            if (hasHandler) {
	                this.props.onKeyPress(event);
	            }
	            return;
	        }

	        if (this.isWindowsPhoneBrowser) {
	            return;
	        }

	        var caretPos = this.getCaretPos();
	        var selection = this.getSelection();
	        var value = this.state.value;
	        var mask = this.mask;
	        var maskChar = this.maskChar;
	        var lastEditablePos = this.lastEditablePos;

	        var maskLen = mask.length;
	        var prefixLen = this.getPrefix().length;

	        if (this.isPermanentChar(caretPos) && mask[caretPos] === key) {
	            value = this.insertRawSubstr(value, key, caretPos);
	            ++caretPos;
	        } else {
	            var editablePos = this.getRightEditablePos(caretPos);
	            if (editablePos !== null && this.isAllowedChar(key, editablePos)) {
	                value = this.clearRange(value, selection.start, selection.length);
	                value = this.insertRawSubstr(value, key, editablePos);
	                caretPos = editablePos + 1;
	            }
	        }

	        if (value !== this.state.value) {
	            event.target.value = value;
	            this.setState({
	                value: this.hasValue ? this.state.value : value
	            });
	            if (typeof this.props.onChange === "function") {
	                this.props.onChange(event);
	            }
	        }
	        event.preventDefault();
	        if (caretPos < lastEditablePos && caretPos > prefixLen) {
	            caretPos = this.getRightEditablePos(caretPos);
	        }
	        this.setCaretPos(caretPos);
	    },
	    onChange: function (event) {
	        var _this6 = this;

	        var pasteSelection = this.pasteSelection;
	        var mask = this.mask;
	        var maskChar = this.maskChar;
	        var lastEditablePos = this.lastEditablePos;

	        var target = event.target;
	        var value = this.getInputValue();
	        if (!value && this.preventEmptyChange) {
	            this.disableValueAccessors();
	            this.preventEmptyChange = false;
	            target.value = this.state.value;
	            return;
	        }
	        var oldValue = this.state.value;
	        if (pasteSelection) {
	            this.pasteSelection = null;
	            this.pasteText(oldValue, value, pasteSelection, event);
	            return;
	        }
	        var selection = this.getSelection();
	        var caretPos = selection.end;
	        var maskLen = mask.length;
	        var valueLen = value.length;
	        var oldValueLen = oldValue.length;
	        var prefixLen = this.getPrefix().length;
	        var clearedValue;

	        if (valueLen > oldValueLen) {
	            var substrLen = valueLen - oldValueLen;
	            var startPos = selection.end - substrLen;
	            var enteredSubstr = value.substr(startPos, substrLen);

	            if (startPos < maskLen && (substrLen !== 1 || enteredSubstr !== mask[startPos])) {
	                caretPos = this.getRightEditablePos(startPos);
	            } else {
	                caretPos = startPos;
	            }

	            value = value.substr(0, startPos) + value.substr(startPos + substrLen);

	            clearedValue = this.clearRange(value, startPos, maskLen - startPos);
	            clearedValue = this.insertRawSubstr(clearedValue, enteredSubstr, caretPos);

	            value = this.insertRawSubstr(oldValue, enteredSubstr, caretPos);

	            if (substrLen !== 1 || caretPos >= prefixLen && caretPos < lastEditablePos) {
	                caretPos = this.getFilledLength(clearedValue);
	            } else if (caretPos < lastEditablePos) {
	                caretPos++;
	            }
	        } else if (valueLen < oldValueLen) {
	            var removedLen = maskLen - valueLen;
	            clearedValue = this.clearRange(oldValue, selection.end, removedLen);
	            var substr = value.substr(0, selection.end);
	            var clearOnly = substr === oldValue.substr(0, selection.end);

	            if (maskChar) {
	                value = this.insertRawSubstr(clearedValue, substr, 0);
	            }

	            clearedValue = this.clearRange(clearedValue, selection.end, maskLen - selection.end);
	            clearedValue = this.insertRawSubstr(clearedValue, substr, 0);

	            if (!clearOnly) {
	                caretPos = this.getFilledLength(clearedValue);
	            } else if (caretPos < prefixLen) {
	                caretPos = prefixLen;
	            }
	        }
	        value = this.formatValue(value);

	        // prevent android autocomplete insertion on backspace
	        // prevent hanging after first entered character on Windows 10 Mobile
	        if (!this.isAndroidBrowser && !this.isWindowsPhoneBrowser) {
	            target.value = value;

	            if (value && !this.getInputValue()) {
	                if (this.isAndroidFirefox) {
	                    this.value = value;
	                    this.enableValueAccessors();
	                }
	                this.preventEmptyChange = true;
	                setTimeout(function () {
	                    _this6.preventEmptyChange = false;
	                    _this6.disableValueAccessors();
	                }, 0);
	            }
	        }

	        this.setState({
	            value: this.hasValue ? this.state.value : value
	        });

	        if (typeof this.props.onChange === "function") {
	            this.props.onChange(event);
	        }
	        this.setCaretPos(caretPos);
	    },
	    onFocus: function (event) {
	        if (!this.state.value) {
	            var prefix = this.getPrefix();
	            var value = this.formatValue(prefix);
	            event.target.value = this.formatValue(value);

	            this.setState({
	                value: this.hasValue ? this.state.value : value
	            }, this.setCaretToEnd);

	            if (typeof this.props.onChange === "function") {
	                this.props.onChange(event);
	            }
	        } else if (this.getFilledLength() < this.mask.length) {
	            this.setCaretToEnd();
	        }

	        if (typeof this.props.onFocus === "function") {
	            this.props.onFocus(event);
	        }
	    },
	    onBlur: function (event) {
	        if (!this.props.alwaysShowMask && this.isEmpty(this.state.value)) {
	            event.target.value = "";
	            this.setState({
	                value: this.hasValue ? this.state.value : ""
	            });
	            if (typeof this.props.onChange === "function") {
	                this.props.onChange(event);
	            }
	        }

	        if (typeof this.props.onBlur === "function") {
	            this.props.onBlur(event);
	        }
	    },
	    onPaste: function (event) {
	        if (this.isAndroidBrowser) {
	            this.pasteSelection = this.getSelection();
	            event.target.value = "";
	            return;
	        }
	        var text;
	        if (window.clipboardData && window.clipboardData.getData) {
	            // IE
	            text = window.clipboardData.getData("Text");
	        } else if (event.clipboardData && event.clipboardData.getData) {
	            text = event.clipboardData.getData("text/plain");
	        }
	        if (text) {
	            var value = this.state.value;
	            var selection = this.getSelection();
	            this.pasteText(value, text, selection, event);
	        }
	        event.preventDefault();
	    },
	    pasteText: function (value, text, selection, event) {
	        var caretPos = selection.start;
	        if (selection.length) {
	            value = this.clearRange(value, caretPos, selection.length);
	        }
	        var textLen = this.getRawSubstrLength(value, text, caretPos);
	        value = this.insertRawSubstr(value, text, caretPos);
	        caretPos += textLen;
	        caretPos = this.getRightEditablePos(caretPos) || caretPos;
	        if (value !== this.getInputDOMNode().value) {
	            if (event) {
	                event.target.value = value;
	            }
	            this.setState({
	                value: this.hasValue ? this.state.value : value
	            });
	            if (event && typeof this.props.onChange === "function") {
	                this.props.onChange(event);
	            }
	        }
	        this.setCaretPos(caretPos);
	    },
	    componentDidMount: function () {
	        this.isAndroidBrowser = this.isAndroidBrowser();
	        this.isWindowsPhoneBrowser = this.isWindowsPhoneBrowser();
	        this.isAndroidFirefox = this.isAndroidFirefox();

	        if (this.mask && this.props.value == null) {
	            this.updateUncontrolledInput();
	        }
	    },
	    render: function () {
	        var _this7 = this;

	        var _props = this.props;
	        var mask = _props.mask;
	        var alwaysShowMask = _props.alwaysShowMask;
	        var maskChar = _props.maskChar;
	        var formatChars = _props.formatChars;

	        var props = _objectWithoutProperties(_props, ["mask", "alwaysShowMask", "maskChar", "formatChars"]);

	        var componentKeys = ["mask", "alwaysShowMask", "maskChar", "formatChars"];
	        if (this.mask) {
	            var handlersKeys = ["onFocus", "onBlur", "onChange", "onKeyDown", "onKeyPress", "onPaste"];
	            props = _extends({}, props);
	            componentKeys.forEach(function (key) {
	                delete props[key];
	            });
	            handlersKeys.forEach(function (key) {
	                props[key] = _this7[key];
	            });

	            if (props.value != null) {
	                props.value = this.state.value;
	            }
	        }
	        return React.createElement("input", _extends({ ref: "input" }, props));
	    }
	});

	module.exports = InputElement;

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelpers = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _default(_ref) {
	    var email = _ref.email;
	    var _onChange = _ref.onChange;
	    var onSend = _ref.onSend;
	    var message = _ref.message;
	    var waiting = _ref.waiting;
	    var disabled = _ref.disabled;

	    var isValid = /^[\w|\.|-]+@[\w|\.|-]+(\.\w+)+$/.test(email);

	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	                'label',
	                { htmlFor: 'emailInput' },
	                'Введите e-mail, указанный вами при регистрации'
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (0, _reactHelpers.$if)(message, 'has-error') },
	            _react2.default.createElement('input', {
	                autoFocus: true,
	                className: 'form-control', id: 'emailInput', type: 'email',
	                value: email, disabled: waiting || disabled,
	                onChange: function onChange(e) {
	                    return _onChange(e.target.value);
	                },
	                onKeyPress: (0, _reactHelpers.$ifEnter)(function (e) {
	                    return onSend(email);
	                }) }),
	            _react2.default.createElement(
	                'span',
	                { className: 'help-block' },
	                message
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	                'button',
	                {
	                    type: 'button', className: 'btn btn-primary',
	                    onClick: function onClick() {
	                        return onSend(email);
	                    }, disabled: waiting },
	                (0, _reactHelpers.$if)(!waiting, "Подтвердите", "Подтверждение...")
	            )
	        )
	    );
	}
	exports.default = _default;

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (_ref) {
	    var waiting = _ref.waiting;
	    var message = _ref.message;
	    var way = _ref.way;
	    var onConfirm = _ref.onConfirm;

	    var code = void 0;

	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	                'p',
	                null,
	                'На указанный вами ',
	                way === 'phone' ? 'номер телефона отправлено СМС' : 'адрес отправлено сообщение',
	                ' с кодом подтверждения.'
	            ),
	            _react2.default.createElement(
	                'p',
	                null,
	                'Введите полученный код чтобы продолжить восстановление пароля.'
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (0, _reactHelpers.$if)(message, 'has-error') },
	            _react2.default.createElement('input', {
	                autoFocus: true,
	                type: way === 'phone' ? 'number' : 'email',
	                className: 'form-control', placeholder: 'Код из сообщения',
	                ref: function ref(node) {
	                    return code = node;
	                },
	                onKeyPress: (0, _reactHelpers.$ifEnter)(function (e) {
	                    if (!waiting) onConfirm(e.target.value);
	                }) }),
	            _react2.default.createElement(
	                'span',
	                { className: 'help-block' },
	                message
	            )
	        ),
	        _react2.default.createElement(
	            'button',
	            {
	                type: 'button', className: 'btn btn-primary',
	                onClick: function onClick() {
	                    return onConfirm(code.value);
	                }, disabled: waiting },
	            (0, _reactHelpers.$if)(!waiting, "Подтвердить", "Подтверждение...")
	        )
	    );
	};

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelpers = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (_ref) {
	    var passMessage = _ref.passMessage;
	    var repeatMessage = _ref.repeatMessage;
	    var waiting = _ref.waiting;
	    var onSend = _ref.onSend;

	    var pass = void 0;
	    var repeat = void 0;

	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (0, _reactHelpers.$if)(passMessage, 'has-error') },
	            _react2.default.createElement(
	                'label',
	                { htmlFor: 'pass' },
	                'Новый пароль'
	            ),
	            _react2.default.createElement('input', {
	                type: 'password', id: 'pass', className: 'form-control',
	                ref: function ref(node) {
	                    return pass = node;
	                },
	                onKeyPress: (0, _reactHelpers.$ifEnter)(function () {
	                    if (!waiting) onSend(pass.value, repeat.value);
	                }) }),
	            _react2.default.createElement(
	                'span',
	                { className: 'help-block' },
	                passMessage
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (0, _reactHelpers.$if)(repeatMessage, 'has-error') },
	            _react2.default.createElement(
	                'label',
	                { htmlFor: 'repeatPass' },
	                'Повторите пароль'
	            ),
	            _react2.default.createElement('input', {
	                type: 'password', id: 'repeatPass', className: 'form-control',
	                ref: function ref(node) {
	                    return repeat = node;
	                },
	                onKeyPress: (0, _reactHelpers.$ifEnter)(function () {
	                    if (!waiting) onSend(pass.value, repeat.value);
	                }) }),
	            _react2.default.createElement(
	                'span',
	                { className: 'help-block' },
	                repeatMessage
	            )
	        ),
	        _react2.default.createElement(
	            'button',
	            {
	                type: 'button', className: 'btn btn-primary',
	                onClick: function onClick() {
	                    return onSend(pass.value, repeat.value);
	                },
	                disabled: waiting },
	            (0, _reactHelpers.$if)(!waiting, 'Сохранить', 'Сохранение...')
	        )
	    );
	};

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelpers = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function WayChooser(_ref) {
	    var way = _ref.way;
	    var _onChange = _ref.onChange;

	    return _react2.default.createElement(
	        "div",
	        { className: "form-group" },
	        _react2.default.createElement(
	            "div",
	            { className: "radio" },
	            _react2.default.createElement(
	                "label",
	                null,
	                _react2.default.createElement("input", {
	                    type: "radio", name: "optionsRadios",
	                    id: "usePhone", value: "option2", checked: way === 'phone',
	                    onChange: function onChange(e) {
	                        if (e.target.checked) _onChange('phone');
	                    } }),
	                "По номеру мобильного телефона"
	            )
	        ),
	        _react2.default.createElement(
	            "div",
	            { className: "radio" },
	            _react2.default.createElement(
	                "label",
	                null,
	                _react2.default.createElement("input", {
	                    type: "radio", name: "optionsRadios",
	                    id: "useEmail", value: "option1", checked: way === 'email',
	                    onChange: function onChange(e) {
	                        if (e.target.checked) _onChange('email');
	                    } }),
	                "По e-mail"
	            )
	        )
	    );
	}
	exports.default = WayChooser;

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changePassword = exports.confirmCode = exports.sendCode = exports.changeNumber = exports.chooseWay = exports.validatePassword = exports.failChangePassword = exports.requestChangePassword = exports.failConfirmation = exports.codeConfirmed = exports.requestConfirmation = exports.receiveCodeId = exports.invalidNumber = exports.requestCode = undefined;

	var _handleActions, _handleActions2, _handleActions3;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(40);

	var _reduxActions = __webpack_require__(63);

	var _isomorphicFetch = __webpack_require__(69);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _reactHelpers = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var requestCode = exports.requestCode = (0, _reduxActions.createAction)('REQUEST_CODE');
	var invalidNumber = exports.invalidNumber = (0, _reduxActions.createAction)('INVALID_NUMBER');
	var receiveCodeId = exports.receiveCodeId = (0, _reduxActions.createAction)('RECEIVE_CODE_ID');
	var requestConfirmation = exports.requestConfirmation = (0, _reduxActions.createAction)('REQUEST_CONFIRMATION');
	var codeConfirmed = exports.codeConfirmed = (0, _reduxActions.createAction)('SUCCESS_CONFIRMATION');
	var failConfirmation = exports.failConfirmation = (0, _reduxActions.createAction)('FAIL_CONFIRMATION');
	var requestChangePassword = exports.requestChangePassword = (0, _reduxActions.createAction)('REQUEST_CHANGE_PASSWORD');
	var failChangePassword = exports.failChangePassword = (0, _reduxActions.createAction)('FAIL_CHANGE_PASSWORD');
	var validatePassword = exports.validatePassword = (0, _reduxActions.createAction)('VALIDATE_PASSWORD');
	var chooseWay = exports.chooseWay = (0, _reduxActions.createAction)('CHOOSE_WAY');
	var changeNumber = exports.changeNumber = (0, _reduxActions.createAction)('CHANGE_NUMBER');

	var post = function post(url, data) {
	    return (0, _isomorphicFetch2.default)(url, {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	    });
	};

	var sendCode = exports.sendCode = function sendCode(number) {
	    return function (dispatch, getState) {
	        var way = getState().way;

	        if (way === 'phone') {
	            try {
	                number = (0, _reactHelpers.normalizePhone)(number);
	            } catch (ex) {
	                dispatch(invalidNumber("Пожалуйста, заполните поле корректно"));
	                return;
	            }
	        } else {
	            var isValid = /^[\w|\.|-]+@[\w|\.|-]+(\.\w+)+$/.test(number);
	            if (!isValid) {
	                dispatch(invalidNumber("Пожалуйста, заполните поле корректно"));
	                return;
	            }
	        }

	        dispatch(requestCode(number));

	        return post('/Recovery.aspx/SendCodeForPasswordChange', {
	            number: number,
	            type: way
	        }).then(function (response) {
	            return response.json();
	        }).then(function (json) {
	            var result = JSON.parse(json.d).SendCodeForPasswordChangeResult;

	            if (result.Code == 0) {
	                dispatch(receiveCodeId(result.CodeId));
	            } else {
	                dispatch(invalidNumber(result.Message));
	            }
	        }).catch(function (ex) {
	            return console.error(ex);
	        });
	    };
	};

	var confirmCode = exports.confirmCode = function confirmCode(code) {
	    return function (dispatch, getState) {
	        dispatch(requestConfirmation(code));

	        return post('/Recovery.aspx/VerifyCodeForPasswordChange', {
	            codeId: getState().phone.codeId,
	            code: code
	        }).then(function (response) {
	            return response.json();
	        }).then(function (json) {
	            var result = JSON.parse(json.d).VerifyCodeForPasswordChangeResult;

	            if (result.Code == 0) {
	                dispatch(codeConfirmed());
	                return;
	            }

	            if (result.MaxAttemptsReached) {
	                dispatch(failConfirmation('Превышено максимальное к-ство попыток'));
	                return;
	            }

	            if (result.CodeExpired) {
	                dispatch(failConfirmation('Время жизни кода истекло'));
	                return;
	            }

	            dispatch(failConfirmation('Неправильный код подтверждения'));
	        }).catch(function (ex) {
	            return console.error(ex);
	        });
	    };
	};

	var changePassword = exports.changePassword = function changePassword(_ref) {
	    var pass = _ref.pass;
	    var repeat = _ref.repeat;

	    return function (dispatch, getState) {
	        dispatch(validatePassword({ pass: pass, repeat: repeat }));

	        if (pass.trim().length === 0 || pass !== repeat) {
	            return;
	        }

	        dispatch(requestChangePassword());

	        var state = getState();
	        return post('/Recovery.aspx/ChangePassword', {
	            code: state.verification.code,
	            codeId: state.phone.codeId,
	            password: pass,
	            type: 'phone'
	        }).then(function (response) {
	            return response.json();
	        }).then(function (json) {
	            var result = JSON.parse(json.d).ChangePasswordResult;

	            if (result.Code == 0) {
	                location.replace('signin.html');
	            } else {
	                dispatch(failChangePassword(result.Message));
	            }
	        }).catch(function (ex) {
	            return console.error(ex);
	        });
	    };
	};

	var phone = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, changeNumber, function (state, action) {
	    return _extends({}, state, {
	        number: action.payload
	    });
	}), _defineProperty(_handleActions, requestCode, function (state, action) {
	    return _extends({}, state, {
	        waiting: true,
	        number: action.payload,
	        message: ''
	    });
	}), _defineProperty(_handleActions, invalidNumber, function (state, action) {
	    return _extends({}, state, {
	        message: action.payload,
	        waiting: false
	    });
	}), _defineProperty(_handleActions, receiveCodeId, function (state, action) {
	    return _extends({}, state, {
	        codeId: action.payload,
	        waiting: false
	    });
	}), _defineProperty(_handleActions, chooseWay, function (state) {
	    return _extends({}, state, {
	        number: ''
	    });
	}), _handleActions), {
	    number: '',
	    sent: false,
	    message: '',
	    codeId: '',
	    waiting: false
	});

	var verification = (0, _reduxActions.handleActions)((_handleActions2 = {}, _defineProperty(_handleActions2, requestConfirmation, function (state, action) {
	    return _extends({}, state, {
	        waiting: true,
	        code: action.payload
	    });
	}), _defineProperty(_handleActions2, codeConfirmed, function (state) {
	    return _extends({}, state, {
	        waiting: false,
	        confirmed: true,
	        message: ''
	    });
	}), _defineProperty(_handleActions2, failConfirmation, function (state, action) {
	    return _extends({}, state, {
	        waiting: false,
	        message: action.payload
	    });
	}), _handleActions2), {
	    code: '',
	    confirmed: false,
	    message: '',
	    waiting: false
	});

	var password = (0, _reduxActions.handleActions)((_handleActions3 = {}, _defineProperty(_handleActions3, failChangePassword, function (state, action) {
	    return _extends({}, state, {
	        message: action.payload
	    });
	}), _defineProperty(_handleActions3, validatePassword, function (state, action) {
	    return _extends({}, state, {
	        passwordEmpty: action.payload.pass.trim().length === 0,
	        repeatIncorrectly: action.payload.pass !== action.payload.repeat
	    });
	}), _defineProperty(_handleActions3, requestChangePassword, function (state) {
	    return _extends({}, state, {
	        waiting: true
	    });
	}), _defineProperty(_handleActions3, failChangePassword, function (state, action) {
	    return _extends({}, state, {
	        waiting: false,
	        failMessage: action.payload
	    });
	}), _handleActions3), {
	    passwordEmpty: false,
	    repeatIncorrectly: false,
	    failMessage: '',
	    waiting: false
	});

	var way = (0, _reduxActions.handleAction)(chooseWay, function (state, action) {
	    return action.payload || state;
	}, 'phone');

		exports.default = (0, _redux.combineReducers)({ phone: phone, verification: verification, password: password, way: way });

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleActions = exports.handleAction = exports.createAction = undefined;

	var _createAction = __webpack_require__(64);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _handleAction = __webpack_require__(65);

	var _handleAction2 = _interopRequireDefault(_handleAction);

	var _handleActions = __webpack_require__(66);

	var _handleActions2 = _interopRequireDefault(_handleActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createAction = _createAction2.default;
	exports.handleAction = _handleAction2.default;
	exports.handleActions = _handleActions2.default;

/***/ },

/***/ 64:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createAction;
	function identity(t) {
	  return t;
	}

	function createAction(type, actionCreator, metaCreator) {
	  var finalActionCreator = typeof actionCreator === 'function' ? actionCreator : identity;

	  var actionHandler = function actionHandler() {
	    var hasError = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error;

	    var action = {
	      type: type
	    };

	    var payload = hasError ? arguments.length <= 0 ? undefined : arguments[0] : finalActionCreator.apply(undefined, arguments);
	    if (!(payload === null || payload === undefined)) {
	      action.payload = payload;
	    }

	    if (hasError) {
	      // Handle FSA errors where the payload is an Error object. Set error.
	      action.error = true;
	    }

	    if (typeof metaCreator === 'function') {
	      action.meta = metaCreator.apply(undefined, arguments);
	    }

	    return action;
	  };

	  actionHandler.toString = function () {
	    return type;
	  };

	  return actionHandler;
	}

/***/ },

/***/ 65:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = handleAction;
	function isFunction(val) {
	  return typeof val === 'function';
	}

	function handleAction(type, reducers, defaultState) {
	  var typeValue = isFunction(type) ? type.toString() : type;

	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
	    var action = arguments[1];

	    // If action type does not match, return previous state
	    if (action.type !== typeValue) return state;

	    var handlerKey = action.error === true ? 'throw' : 'next';

	    // If function is passed instead of map, use as reducer
	    if (isFunction(reducers)) {
	      reducers.next = reducers.throw = reducers;
	    }

	    // Otherwise, assume an action map was passed
	    var reducer = reducers[handlerKey];

	    return isFunction(reducer) ? reducer(state, action) : state;
	  };
	}

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = handleActions;

	var _handleAction = __webpack_require__(65);

	var _handleAction2 = _interopRequireDefault(_handleAction);

	var _ownKeys = __webpack_require__(67);

	var _ownKeys2 = _interopRequireDefault(_ownKeys);

	var _reduceReducers = __webpack_require__(68);

	var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function handleActions(handlers, defaultState) {
	  var reducers = (0, _ownKeys2.default)(handlers).map(function (type) {
	    return (0, _handleAction2.default)(type, handlers[type]);
	  });
	  var reducer = _reduceReducers2.default.apply(undefined, _toConsumableArray(reducers));

	  return typeof defaultState !== 'undefined' ? function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
	    var action = arguments[1];
	    return reducer(state, action);
	  } : reducer;
	}

/***/ },

/***/ 67:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ownKeys;
	function ownKeys(object) {
	  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
	    return Reflect.ownKeys(object);
	  }

	  var keys = Object.getOwnPropertyNames(object);

	  if (typeof Object.getOwnPropertySymbols === 'function') {
	    keys = keys.concat(Object.getOwnPropertySymbols(object));
	  }

	  return keys;
	}

/***/ },

/***/ 68:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = reduceReducers;

	function reduceReducers() {
	  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
	    reducers[_key] = arguments[_key];
	  }

	  return function (previous, current) {
	    return reducers.reduce(function (p, r) {
	      return r(p, current);
	    }, previous);
	  };
	}

	module.exports = exports["default"];

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(70);
	module.exports = self.fetch.bind(self);


/***/ },

/***/ 70:
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },

/***/ 211:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ },

/***/ 212:
/***/ function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */

	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;

	  // exit if console undefined

	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }

	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }

	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;

	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;

	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");

	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }

	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");

	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }

	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }

	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }

	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }

	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var logEntry = {};
	        logBuffer.push(logEntry);

	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;

	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());

	        printBuffer();

	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}

	module.exports = createLogger;

/***/ }

});
//# sourceMappingURL=recovery.bundle.js.map