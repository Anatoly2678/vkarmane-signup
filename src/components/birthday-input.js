/**
 * Created by akarpov on 06.07.2016.
 */
import range from 'lodash/range'
import rangeRight from 'lodash/rangeRight'
import map from 'lodash/map'
import defer from 'lodash/defer'

const $if = (cond, result) => cond ? result : ''

export default React.createClass({
    getInitialState() {
        return {
            day: '',
            month: '',
            year:  '',
            dateNotValid: false
        }
    },
    render() {
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        const days = map(range(1, 32), n => <option value={n} key={n}>{n}</option>)
        const months = map(range(1, 13), n => <option value={n} key={n}>{monthNames[n-1]}</option>)
        const years = map(rangeRight(1950, 1996), n => <option value={n} key={n}>{n}</option>)

        return (
            <div>
                <label className="control-label">... и дата рождения</label>

                <div className={`form-group ${$if(this.state.dateNotValid, 'has-error')}`}>
                    <div className="row">
                        <div className="col-xs-3">
                            <select className="form-control" value={this.state.day} onChange={this.handleDayChange}>
                                <option value="" key={0}></option>
                                {days}
                            </select>
                        </div>
                        <div className="col-xs-5" style={{paddingLeft: '0px'}}>
                            <select className="form-control" value={this.state.month} onChange={this.handleMonthChange}>
                                <option value="" key={0}></option>
                                {months}
                            </select>
                        </div>
                        <div className="col-xs-4" style={{paddingLeft: '0px'}}>
                            <select className="form-control" value={this.state.year} onChange={this.handleYearChange}>
                                <option value="" key={0}></option>
                                {years}
                            </select>
                        </div>
                    </div>

                    {$if(this.state.dateNotValid,
                        <span className="help-block">Пожалуйста, заполните поле корректно</span>)}
                </div>
            </div>)
    },
    handleDayChange(e) {
        this.setState({ day: e.target.value })
        defer(this.validateDate)

    },
    handleMonthChange(e) {
        this.setState({ month: e.target.value })
        defer(this.validateDate)
    },
    handleYearChange(e) {
        this.setState({ year: e.target.value })
        defer(this.validateDate)

    },
    validateDate() {
        const day = this.state.day
        const month = this.state.month
        const year = this.state.year

        if(day && year && month) {
            var daysInYear = new Date(year, month, 0).getDate()
            this.setState({ dateNotValid: day > daysInYear })
        } else {
            this.setState({ dateNotValid: false })
        }
    }
})