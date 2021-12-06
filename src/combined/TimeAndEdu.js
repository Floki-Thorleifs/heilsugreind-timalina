import React, { Component } from "react";
import Timeline from "../timeline/timeline";
import Educational from "../educational/educational";


class TimeAndEdu extends Component {
    state = {
        data: null,
        activePhase: null
    }

    componentDidMount() {
        const { data } = this.props;
        this.setState({ activePhase: data.plan.phases[0], data: data });
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { data } = props;
        this.setState({ activePhase: data.plan.phases[0], data: data });
    }

    render() {
        const { activePhase, data } = this.state;
        if(data) return (
            <div>
                <Timeline phases={data.plan.phases}
                    activePhase={activePhase}
                    allActive={false}
                    changePhase={(args) => {
                        this.setState({ activePhase: args })
                    }}
                />
                 {Object.entries(activePhase).length > 0 && activePhase.gates ? activePhase.gates.map((i, key) => <Educational key={key} edu={i} activeColor={"red"} />):null}
            </div>
        );
        return null;
    }
}

export default TimeAndEdu;