import React, { Component } from 'react';

const defaultTimerState = {
    breakTime: 5,
    sessionTime: 25,
    timeLeft: "25:00"
}
export default class PomTimer extends Component {
    constructor(props) {
        super(props);
        this.state = defaultTimerState;
    }
    render() {
        return (
            <div id='wrapper'>
                <Break breakTime={this.state.breakTime} />
                <Session sessionTime={this.state.sessionTime} />
                <Timer timeLeft={this.state.timeLeft} />
                <StartStop />
                <Reset />
            </div>


        )
    }
}

const Break = props => {
    return (
        <div id='break-wrapper'>
            <button id='break-decrement'>-</button>
            <button id='break-increment'>+</button>
            <h2 id='break-label'>Break Length</h2>
            <div id='break-length'>{props.breakTime}</div>
        </div>
    )
}

const Session = props => {
    return (
        <div id='session-wrapper'>
            <button id='session-decrement'>-</button>
            <button id='session-increment'>+</button>
            <h2 id='session-label'>Session Length</h2>
            <div id='session-length'>{props.sessionTime}</div>
        </div>
    )
}

const Timer = props => {
    return (
        <div id='timer-wrapper'>
            <h1 id='timer-label'>Timer Label</h1>
            <div id='time-left'>{props.timeLeft}</div>
        </div>
    )
}

const StartStop = props => {
    return (
        <button id='start_stop'>Start/Stop</button>
    )
}

const Reset = props => {
    return (
        <button id='reset'>Reset</button>
    )
}