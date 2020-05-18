import React, { Component } from 'react';

const defaultTimerState = {
    breakTime: 5,
    sessionTime: 25,
    timeLeftMin: 25,
    timeLeftSec: 0,
    timerDisplay: '25:00',
    mode: 'session',
    running: false
}
export default class PomTimer extends Component {
    constructor(props) {
        super(props);
        this.state = defaultTimerState
        this.countItDown = this.countItDown.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetDefault = this.resetDefault.bind(this);
    }


    countItDown() {
        this.setState((state) => {
            var secs = state.timeLeftSec;
            var mins = state.timeLeftMin;
            if (secs >= 0) {
                secs--
            }
            if (secs == -1 && mins > 0) {
                secs = 59;
                mins--
            } else {
                var mode = state.mode == 'session' ? 'break' : 'session'
                secs = 0;
                mins = mode == 'session' ? state.sessionTime : state.breakTime
            }
            var newTimeMins = mins < 10 ? '0' + mins.toString() : mins.toString();
            var newTimeSecs = secs < 10 ? '0' + secs.toString() : secs.toString();
            var newTime = newTimeMins + ':' + newTimeSecs
            return { timeLeftMin: mins, timeLeftSec: secs, timerDisplay: newTime, mode: mode }
        });
    }

    toggleTimer() {
        this.setState((state) => {
            if (state.running) {
                console.log('stopping timer, state = ', state)
                clearInterval(this.timerId);
                return { running: false }
            } else {
                console.log('starting timer, state =', state)
                this.timerId = setInterval(this.countItDown, 1000)
                return { running: true }
            }
        })
    }

    resetDefault() {
        this.state = defaultTimerState;
        clearInterval(this.timerId);
    }


    render() {
        return (
            <div id='wrapper'>
                <Break breakTime={this.state.breakTime} />
                <Session sessionTime={this.state.sessionTime} />
                <Timer timerDisplay={this.state.timerDisplay} />
                <StartStop onClick={this.toggleTimer} />
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
            <div id='time-left'>{props.timerDisplay}</div>
        </div>
    )
}

const StartStop = props => {
    return (
        <button id='start_stop' onClick={props.onClick}>Start/Stop</button>
    )
}

const Reset = props => {
    return (
        <button id='reset'>Reset</button>
    )
}