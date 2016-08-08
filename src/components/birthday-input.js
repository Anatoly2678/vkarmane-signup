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
            wasEntered: false
        }
    },
    render() {
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

        const days = map(range(1, this.daysInMonth(this.state.month, this.state.year) + 1), n => <option value={n} key={n}>{n}</option>)
        const months = map(range(1, 13), n => <option value={n} key={n}>{monthNames[n-1]}</option>) //13

        const maxYearOfBirth = new Date().getFullYear() - this.props.maxAge - 1
        const minYearOfBirth = new Date().getFullYear() - this.props.minAge
        const years = map(rangeRight(maxYearOfBirth, minYearOfBirth + 1), n => <option value={n} key={n}>{n}</option>)

        const entered = this.state.day && this.state.month && this.state.year
        const showNotEntered = this.state.wasEntered && !entered

        let tooYoung = false
        let toOld = false
        if(entered) {
            const age = this.calcAge(new Date(this.state.year, this.state.month, this.state.day))
            tooYoung = age < this.props.minAge
            toOld = age > this.props.maxAge
        }

        return (
            <div>
                <label className="control-label newFieldLine">... и дата рождения</label>

                <div className={`form-group ${$if(this.state.showError || showNotEntered || tooYoung || toOld, 'has-error')}`}>
                    <div className="row">

                        <div className="col-sm-4 form-group birthday-day">
                            <select className="form-control" value={this.state.day}
                                    onChange={this.handleDayChange} disabled={this.props.disabled} >
                                <option value="" key={0}>День</option>
                                {days}
                            </select>
                        </div>

                        <div className="col-sm-4 form-group birthday-month">
                            <select className="form-control" value={this.state.month}
                                    onChange={this.handleMonthChange} disabled={this.props.disabled} >
                                <option value="" key={0}>Месяц</option>
                                {months}
                            </select>
                        </div>

                        <div className="col-sm-4 form-group birthday-year">
                            <select className="form-control" value={this.state.year}
                                    onChange={this.handleYearChange} disabled={this.props.disabled} >
                                <option value="" key={0}>Год</option>
                                {years}
                            </select>
                        </div>
                    </div>

                    {$if(this.state.showError,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}

                    {$if(showNotEntered,
                        <span className="help-block">Пожалуйста, заполните поле</span>)}

                    {$if(tooYoung,
                        <span className="help-block">Займ доступен с {this.props.minAge}-го года</span>)}

                    {$if(toOld,
                        <span className="help-block">Займ доступен до {this.props.maxAge + 1}-ти лет</span>)}
                </div>
            </div>)
    },
    handleDayChange(e) {
        this.setState({
            day: parseInt(e.target.value),
            showError: false
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
                showError: true
            })
        } else {
            this.setState({ showError: false })
        }

        defer(this.raiseChange)
    },
    raiseChange() {
        if(this.state.day && this.state.month && this.state.year) {
            this.setState({ wasEntered: true })

            const age = this.calcAge(new Date(this.state.year, this.state.month, this.state.day))
            const tooYoung = age < this.props.minAge
            const toOld = age > this.props.maxAge

            if(!tooYoung && !toOld) {
                this.props.onChange({
                    day: this.state.day,
                    month: this.state.month,
                    year: this.state.year
                })
                return
            }
        }

         this.props.onChange(null)
    },
    daysInMonth(month, year) {
        if(!month) return 31
        if(!year) return month == 2 ? 29 : new Date(1950 /* любой год */, month, 0).getDate()
        return new Date(year, month, 0).getDate()
    },
    calcAge(birthday) {
        var ageMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageMs)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
})