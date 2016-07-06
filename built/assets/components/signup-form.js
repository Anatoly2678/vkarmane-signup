"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _phoneInput = require("./phone-input");

var _phoneInput2 = _interopRequireDefault(_phoneInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = React.createClass({
    displayName: "signup-form",
    render: function render() {
        return React.createElement(
            "form",
            { className: "form-signin" },
            React.createElement(
                "h2",
                { className: "form-signin-heading" },
                "Регистрация"
            ),
            React.createElement(_phoneInput2.default, null)
        );
    }
});