import React from 'react'
import {$if} from '../react-helpers'
import defer from 'lodash/defer'

String.prototype.capitalizeFirstLetter = function() {

    var result;
    if (this.length > 0) {
        var strs = this.split(' ');
        var newStr = new Array();
        strs.forEach(function(item) {
            newStr = newStr.concat([ item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() ]);
        }, this);
        result = newStr.join(' ');
    }
    else
    {
        result = this;
    }
    return result;
}

export default React.createClass({
    getInitialState() {
        return {
            lastName: '',
            firstName: '',
            middleName: '',
            noMiddleName: false,
            lastNameHasError: false,
            firstNameHasError: false,
            middleNameHasError: false,
            lastNameEmpty: false,
            firstNameEmpty: false,
            middleNameEmpty: false,
        }
    },
    render() {
        return (
            <div>
                <label htmlFor="lastNameInput" className="newFieldLine">Ваши ФИО...</label>

                {/* Last name */}
                <div className={`form-group ${$if(this.state.lastNameHasError || this.state.lastNameEmpty, 'has-error')}`}>
                    <input type="text" className="form-control"
                           id="lastNameInput" autoFocus={true}
                           value={this.state.lastName} placeholder="Фамилия"
                           onChange={this.handleLastNameChange} disabled={this.props.disabled} />

                    {$if(this.state.lastNameEmpty,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(this.state.lastNameHasError,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}
                </div>

                {/* First name */}
                <div className={`form-group ${$if(this.state.firstNameHasError || this.state.firstNameEmpty, 'has-error')}`}>
                    <input type="text" className="form-control"
                           value={this.state.firstName} placeholder="Имя"
                           onChange={this.handleFirstNameChange} disabled={this.props.disabled} />

                    {$if(this.state.firstNameEmpty,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(this.state.firstNameHasError,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}
                </div>

                {/* Middle name */}
                <div className={`form-group ${$if((this.state.middleNameEmpty || this.state.middleNameHasError) && !this.state.noMiddleName, 'has-error')}`}>
                    <input type="text" className="form-control"
                           value={this.state.middleName} placeholder="Отчество" onChange={this.handleMiddleNameChange}
                           readOnly={this.state.noMiddleName} disabled={this.props.disabled} />

                    {$if(this.state.middleNameEmpty && !this.state.noMiddleName,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(this.state.middleNameHasError && !this.state.noMiddleName,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}
                </div>

                {/* No Middle name */}
                <div className="checkbox">
                    <input id="noMiddleName" type="checkbox" checked={this.state.noMiddleName}
                           onChange={this.handleNoMiddleNameChange} disabled={this.props.disabled} />
                    <label htmlFor="noMiddleName"> <span></span>                
                        без отчества
                    </label>
                </div>
            </div>)
    },
    handleLastNameChange(e) {

        var selectionStart = e.target.selectionStart;
        var selectionEnd = e.target.selectionEnd;
        e.target.value = e.target.value.capitalizeFirstLetter()
        e.target.selectionStart = selectionStart;
        e.target.selectionEnd = selectionEnd;

        this.setState({
            lastName: e.target.value,
            lastNameHasError: !this.checkIsValidName(e.target.value),
            lastNameEmpty: e.target.value.trim().length === 0
        })

        defer(this.raiseOnChange)
    },
    handleFirstNameChange(e) {

        var selectionStart = e.target.selectionStart;
        var selectionEnd = e.target.selectionEnd;
        e.target.value = e.target.value.capitalizeFirstLetter()
        e.target.selectionStart = selectionStart;
        e.target.selectionEnd = selectionEnd;

        this.setState({
            firstName: e.target.value,
            firstNameHasError: !this.checkIsValidName(e.target.value),
            firstNameEmpty: e.target.value.trim().length === 0
        })

        defer(this.raiseOnChange)
    },
    handleMiddleNameChange(e) {

        var selectionStart = e.target.selectionStart;
        var selectionEnd = e.target.selectionEnd;
        e.target.value = e.target.value.capitalizeFirstLetter()
        e.target.selectionStart = selectionStart;
        e.target.selectionEnd = selectionEnd;

        this.setState({
            middleName: e.target.value,
            middleNameHasError: !this.checkIsValidName(e.target.value),
            middleNameEmpty: e.target.value.trim().length === 0
        })

        defer(this.raiseOnChange)
    },
    handleNoMiddleNameChange(e) {
        this.setState({ noMiddleName: e.target.checked })
        defer(this.raiseOnChange)
    },
    checkIsValidName(name) {
        return name.trim().length === 0 || /^([А-Я|а-я])+$/.test(name.trim())
    },
    raiseOnChange() {
        if(this.state.lastName && !this.state.lastNameHasError &&
            this.state.firstName && !this.state.firstNameHasError &&
            ((this.state.middleName && !this.state.middleNameHasError) || this.state.noMiddleName)) {
            this.props.onChange({
                last: this.state.lastName,
                first: this.state.firstName,
                middle: this.state.noMiddleName ? '' : this.state.middleName
            })
        } else {
            this.props.onChange(null)
        }
    }
})