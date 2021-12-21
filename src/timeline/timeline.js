import React, { Component } from 'react';
import moment from 'moment';

import './timeline.css'
import { capitalizeMonth } from '../utils/months';

const format = 'YYYY-MM-DD'

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: null,
            years: null,
            dateStart: null,
            dateEnd: null,
            activePhase: null,
            allActive: false,
            appointmentMonths: {},
            phaseColors: ["#aec13e",
                "#3576CB",
                "#4F8A47",
                "#2A398C",
                "#8ACACB",
                "#4F8A47",
                "#805ca3",
                "#aec13e",
                "#d52acd",
                "#d52acd",
                "#9a7165",
                "#eda812",
                "#77728d"],
            colors: {
                "Greiningarferli": "#aec13e",
                "Skurðmeðferð": "#3576CB",
                "Krabbameinslyfjameðferð": "#4F8A47",
                "Geislameðferð": "#2A398C",
                "Uppbygging": "#8ACACB",
                "Formeðferð": "#4F8A47",
                "Beinstyrkjandi meðferð": "#805ca3",
                "Herceptinmeðferð": "#aec13e",
                "Goserelin": "#d52acd",
                "Goserelinmeðferð": "#d52acd",
                "Töflumeðferð": "#9a7165",
                "Eftirlit": "#eda812",
                "Eftirlit á heilsugæslu": "#77728d"
            }
        }
    }

    changeActivePhase(i) {
        this.props.changePhase(i);
        this.setState({ activePhase: i.name })

    }


    makeTimeline(props) {
        const { phases } = props;
        const dateStart = moment(phases.reduce((a, b) => moment(a.dateFrom).isBefore(moment(b.dateFrom)) ? a : b).dateFrom, format);
        const dateEnd = moment(phases.reduce((a, b) => moment(a.dateTo).isAfter(moment(b.dateTo)) ? a : b).dateTo, format);
        var months = [];
        let years = {};
        while (dateStart.isSameOrBefore(dateEnd, "month")) {
            months.push(moment(dateStart.startOf('month')));
            const year = dateStart.format('YYYY')
            if (!years[year]) {
                years[year] = {}
                years[year].dateFrom = moment(moment(dateStart).startOf('month'));

            } else {
                years[year].dateTo = moment(moment(dateStart).endOf('month'))

            }
            dateStart.add(1, 'month');
        }
        const yearsArray = Object.entries(years);
        yearsArray.forEach((i, k) => {
            if (yearsArray[k + 1]) {
                years[yearsArray[k][0]].dateTo = moment(years[yearsArray[k][0]].dateFrom).endOf('year')
            }
            if (yearsArray[k - 1]) {
                years[yearsArray[k][0]].dateFrom = moment(years[yearsArray[k][0]].dateFrom).startOf('year')
            }

        })
        const finalYears = Object.entries(years).map(i => i[1])
        phases.sort((a, b) => moment(a.dateTo).isBefore(b.dateTo) ? -1 : 1)
        const tempDateStart = moment(phases.reduce((a, b) => moment(a.dateFrom).isBefore(moment(b.dateFrom)) ? a : b).dateFrom, format);
        const new_dateStart = moment().isBefore(moment(tempDateStart)) ? moment() : tempDateStart;
        const new_dateEnd = moment(phases.reduce((a, b) => moment(a.dateTo).isAfter(moment(b.dateTo)) ? a : b).dateTo, format);
        const maxDays = moment(new_dateEnd).endOf('month').diff(new_dateStart.startOf('month'), 'days') + 1;
        this.setState({ months: months, years: finalYears, phases: phases, dateStart: new_dateStart, dateEnd: new_dateEnd, maxDays: maxDays });
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        if (nextprops.phases.length) {
            this.makeTimeline(nextprops)
            this.setState({ activePhase: nextprops.activePhase, allActive: nextprops.allActive });
        }

    }

    UNSAFE_componentWillMount() {
        const props = this.props;
        if (props.phaseColors) this.setState({ phaseColors: props.phaseColors })
        if (props.phases.length) {
            this.makeTimeline(props)
            this.setState({ activePhase: props.activePhase, allActive: props.allActive });
        }
    }
    render() {
        const { months, years, phases, dateStart, maxDays, phaseColors, colors } = this.state;
        const overlappingPhases = phases.filter(i => i.overlapping);
        const notOverlapping = phases.filter(i => !i.overlapping);
        let color_key = 0;
        return (
            <div className="timeline_outer">
                {years ? (
                    <div className="timeline_years">
                        {
                            years.map((i, key) => {
                                const monthDays = moment(i.dateTo).endOf('day').diff(moment(i.dateFrom).startOf('day'), 'days') + 1;
                                const style = { "width": `${(monthDays / maxDays) * 100}%` }
                                return (
                                    <div key={key} className="timeline_year" style={style}>
                                        {moment(i.dateFrom).format('YYYY')}
                                    </div>
                                )
                            })}
                    </div>
                ) : null}
                {months ? (
                    <div className="timeline_months">
                        {
                            months.map((i, key) => {

                                const monthDays = moment(moment(i).endOf('month')).diff(moment(moment(i).startOf('month')), 'days') + 1;
                                const style = { "width": `${(monthDays / maxDays) * 100}%` }

                                return (
                                    <div key={key} className="timeline_month" style={style} >
                                        {capitalizeMonth(i.format('MMM'))}
                                    </div>
                                )
                            })}
                    </div>
                ) : null}


                {months && notOverlapping.length ? (
                    <div className="timeline_phases">
                        {
                            notOverlapping.map((i, key) => {
                                const phaseDays = moment(i.dateTo, format).diff(moment(i.dateFrom, format), 'days') + 1;
                                const phase_color = colors[i.name] ? colors[i.name] : phaseColors[color_key % phaseColors.length];
                                const startDate = moment(dateStart).startOf('month');
                                const whitespaceDays = moment(i.dateFrom).diff(startDate, 'days');
                                const style = { "width": `${(phaseDays / maxDays) * 100}%`, "backgroundColor": phase_color, "border": `1px solid ${phase_color}`, "color": "white", "left": `${(whitespaceDays / maxDays) * 100}%` }
                                color_key += 1;
                                return (
                                    <div key={key} className={`timeline_phase ${this.state.allActive ? "all_active" : this.state.activePhase.rank === i.rank && this.state.activePhase.name === i.name ? "active" : 'inactive'}`} style={style} onClick={() => this.changeActivePhase(i)}>
                                        {i.name}
                                    </div>
                                )
                            })}
                    </div>
                ) : null}
                {months && overlappingPhases.length ?
                    overlappingPhases.map((i, key) => {
                        const phaseDays = moment(i.dateTo, format).diff(moment(i.dateFrom, format), 'days') + 1;
                        const startDate = moment(dateStart).startOf('month');
                        const whitespaceDays = moment(i.dateFrom).diff(startDate, 'days');
                        const phase_color = colors[i.name] ? colors[i.name] : phaseColors[color_key % phaseColors.length];
                        const style = { "width": `${(phaseDays / maxDays) * 100}%`, "backgroundColor": phase_color, "border": `1px solid ${phase_color}`, "color": "white", "left": `${(whitespaceDays / maxDays) * 100}%` }
                        color_key += 1;
                        return (
                            <div key={key} className="timeline_phases">
                                <div className={`timeline_phase ${this.state.allActive ? "all_active" : this.state.activePhase.rank === i.rank && this.state.activePhase.name === i.name ? "active" : 'inactive'}`} style={style} onClick={() => this.changeActivePhase(i)}>
                                    {i.name}
                                </div>
                            </div>
                        )
                    }
                    ) : null}
                {months ? (
                    <div className="timeline_overlay">
                        <div className="timeline_overlay_inner" style={{ "backgroundColor": "#8ACACB2A", "width": `${((moment().diff(dateStart, 'days') < maxDays ? moment().diff(dateStart, 'days') : maxDays) / maxDays) * 100}%` }}>

                        </div>

                    </div>
                ) : null}
            </div>
        );
    }
}