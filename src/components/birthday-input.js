import React from 'react'
import range from 'lodash/range'
import rangeRight from 'lodash/rangeRight'
import map from 'lodash/map'
import defer from 'lodash/defer'
import {$if} from '../react-helpers'

export default React.createClass({
    getInitialState() {
        return {
            day: '',
            month: '',
            year:  '',
            showError: false,
            wasEntered: false,
            empty: false
        }
    },
    render() {
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        const days = map(range(1, this.daysInMonth(this.state.month, this.state.year) + 1), n => <option value={n} key={n}>{n}</option>)
        const months = map(range(1, 13), n => <option value={n} key={n}>{monthNames[n-1]}</option>)

        const maxYearOfBirth = new Date().getFullYear() - this.props.maxAge - 1
        const minYearOfBirth = new Date().getFullYear() - this.props.minAge
        const years = map(rangeRight(maxYearOfBirth, minYearOfBirth + 1), n => <option value={n} key={n}>{n}</option>)

        return (
            <div>
                <label className="control-label">... и дата рождения</label>

                <div className={`form-group ${$if(this.state.showError || this.state.empty, 'has-error')}`}>
                    <div className="row">
                        <div className="col-xs-4">
                            <select className="form-control" value={this.state.day} onChange={this.handleDayChange}>
                                <option value="" key={0}>День</option>
                                {days}
                            </select>
                        </div>
                        <div className="col-xs-4" style={{paddingLeft: '0px'}}>
                            <select className="form-control" value={this.state.month} onChange={this.handleMonthChange}>
                                <option value="" key={0}>Месяц</option>
                                {months}
                            </select>
                        </div>
                        <div className="col-xs-4" style={{paddingLeft: '0px'}}>
                            <select className="form-control" value={this.state.year} onChange={this.handleYearChange}>
                                <option value="" key={0}>Год</option>
                                {years}
                            </select>
                        </div>
                    </div>

                    {$if(this.state.showError,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}

                    {$if(this.state.empty,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}
                </div>
            </div>)
    },
    handleDayChange(e) {
        this.setState({
            day: parseInt(e.target.value),
            showError: false,
            empty: false
        })

        defer(this.raiseChange)
    },
    handleMonthChange(e) {
        const month = parseInt(e.target.value)
        this.setState({ month })

        if(this.state.day > this.daysInMonth(month, this.state.year)) {
            this.setState({
                day: 0,
                showError: true
            })
        }

        defer(this.raiseChange)
    },
    handleYearChange(e) {
        const year = parseInt(e.target.value)
        this.setState({ year })

        if(this.state.day > this.daysInMonth(this.state.month, year)) {
            this.setState({
                day: 0,
                showError: true })
        } else {
            this.setState({ showError: false })
        }

        defer(this.raiseChange)
    },
    raiseChange() {
        if(this.state.day && this.state.month && this.state.year) {
            this.props.onChange({
                day: this.state.day,
                month: this.state.month,
                year: this.state.year
            })

            this.setState({ wasEntered: true })
        } else {
            this.props.onChange(null)
            this.setState({ empty: this.state.wasEntered })
        }
    },
    daysInMonth(month, year) {
        if(!month) return 31
        if(!year) return month == 2 ? 29 : new Date(1950 /* любой год */, month, 0).getDate()
        return new Date(year, month, 0).getDate()
    }
})