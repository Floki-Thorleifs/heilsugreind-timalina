import React, { Component } from 'react';
import moment from 'moment'

import './educational.css'
import { _isUndefined } from '../utils/format';
import { changeMonthFromDDMMMYYYY } from "../utils/months";



export default class Educational extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showAllDates: false
        }
    }


    getDateOfGate(edu) {
        const form = 'YYYY-MM-DD'
        const dates = edu.map(i => {
            const temp = i;
            temp.date = moment(i.date, form)
            return temp;
        }).sort((a,b) => a.date.isSameOrAfter(b.date)?1:-1);
        let maxDate = dates[dates.length - 1];
        if (_isUndefined(maxDate)) return null;

        //maxDate = maxDate.date;
        const currDate = moment().startOf('day');
        if (!maxDate.date.isValid()) return null;
        if (currDate.isSameOrAfter(maxDate.date.startOf('day'))) {
            return {
                info: maxDate,
                date: maxDate.date.format(form),
                isBefore: true
            };
        } else {
            const afterToday = dates.filter(i => moment(i.date).startOf('day').isSameOrAfter(currDate));
            if (_isUndefined(afterToday[0])) return null;
            return {
                info: maxDate,
                date: afterToday[0].date.format(form),
                isBefore: false
            }
        }


    }

    render() {
        const { edu, activeColor } = this.props;
        const maxDate = this.getDateOfGate(edu.dates);
        const onlyDates = [];
        edu.dates.sort((a,b) => moment(a.date).isSameOrAfter(moment(b.date))?1:-1).forEach(i => onlyDates.push(i.date.format("YYYY-MM-DD")));
        return (
            <div className="educational_outer">
                {edu.dates.length >= 1 ? (
                    <div style={{ "backgroundColor": maxDate.isBefore ? "#8ACACB2A" : activeColor }} className={`educational_date ${maxDate.isBefore ? 'done' : ""}`}>
                        <div className={`educational_date_inner ${maxDate.isBefore ? 'done' : ""}`} onClick={() => {
                                const showAll = this.state.showAllDates;
                                this.setState({ showAllDates: !showAll });
                            }}>

                             {edu.dates.length > 4 ?
                                <div className="patient_tooltip_text">
                                    <span>{this.state.showAllDates ? "Sýna færri dagsetningar" : "Sýna allar dagsetningar"}</span>
                                </div> : null
                            }
                            {edu.dates.map((i, key) => {
                                const maxIndex = onlyDates.indexOf(maxDate.date);
                                const newDate = changeMonthFromDDMMMYYYY(i.date.format('DD. MMM YYYY'));
                                if ((key >= maxIndex - 2 && key <= maxIndex + 2) || this.state.showAllDates) {
                                    if (i.date.format('YYYY-MM-DD') === maxDate.date && moment(maxDate.date).isSameOrAfter(new Date(), "day")) {
                                        return <span key={key} style={{ "fontWeight": "bold" }}>{newDate}</span>
                                    } else if (i.date.isAfter(moment(), "day")) {
                                        return <span key={key} style={{ "fontStyle": "italic" }}>{newDate}</span>
                                    }
                                    return <span key={key} style={{ "opacity": maxDate.isBefore ? "1" : "0.5" }}>{newDate}</span>
                                }
                            })}
                        </div>
                    </div>
                ) : null}
                <div className="educational_inner">

                    <div className="educational_header">
                        <h3 className="educational_title"><span className="educational_step">{typeof edu.step !== "undefined"?edu.step:this.props.key}</span> {edu.name}</h3>
                    </div>
                    <div className="educational_content">
                        <span className="educational_text">{edu.text}</span>
                    </div>
                    {maxDate && !maxDate.isBefore ? (
                        <div className="educational_content">
                            <div className="educational_content_line">
                                <div className="educational_content_line_header">
                                    <span className="educational_content_name">Næsta tímabókun</span>
                                </div>
                                <div className="educational_content_line_content" >
                                    <span className="educational_text_date">{changeMonthFromDDMMMYYYY(moment(maxDate.date).format("DD. MMM YYYY"))}</span>
                                    {edu.gate_type === "chemo_test" && maxDate.info?(
                                        <span className="educational_text_small">{maxDate.info.gate_name_isl}</span>
                                    ):null}
                                </div>

                            </div>
                        </div>
                    ) : null}
                    {edu.gate_type === "chemo_test" && edu.dates.length ? (
                        <div className="educational_content">
                            <div className="educational_content_line">
                                <div className="educational_content_line_header">
                                    <span className="educational_content_name">Rannsóknir:</span>
                                </div>
                                {edu.dates.map((i, key) => {
                                    return (
                                        <div key={key} className="educational_content_line_content" >
                                            <span className="educational_text_date">{changeMonthFromDDMMMYYYY(i.date.format("DD. MMM YYYY"))}</span>
                                            <span className="educational_text_small">{i.gate_name_isl}</span>
                                        </div>)
                                })}
                            </div>
                        </div>)
                        : null}
                    {edu.myRole ? (
                        <div className="educational_content">
                            <div className="educational_content_line">
                                <div className="educational_content_line_header">
                                    <span className="educational_content_name">Hvað get ég gert?</span>
                                </div>
                                <div className="educational_content_line_content" >
                                    <span className="educational_text">{edu.myRole}</span>
                                </div>

                            </div>
                        </div>
                    ) : null}
                    {edu.timeLimits && edu.timeLimits !== 'null' ? (
                        <div className="educational_content">
                            <div className="educational_content_line">
                                <div className="educational_content_line_header">
                                    <span className="educational_content_name">Tímaviðmið</span>
                                </div>
                                <div className="educational_content_line_content" >
                                    <span className="educational_text">{edu.timeLimits}</span>
                                </div>

                            </div>
                        </div>
                    ) : null}

                    {edu.info.length ? (
                        <div className="educational_content">
                            <div className="educational_content_line">
                                <div className="educational_content_line_header">
                                    <span className="educational_content_name">Fræðsluefni</span>
                                </div>
                                {edu.info.map((i, key) => {
                                    return (
                                        <div className="educational_content_line_content" key={key}>
                                            <span className="educational_text">{i.text}:</span>
                                            <a href={i.link} target="_blank" rel="noopener noreferrer"className="educational_content_button">Sækja</a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>


            </div>
        );
    }
}