import React, { Component } from 'react';
import { defaultState } from '../constants'

const Break = props => {
    return (
        <div id='break-wrapper'>
            <button id='break-decrement'>-</button>
            <button id='break-increment'>+</button>
            <h2 id='break-label'>Break Length</h2>
            <div id='break-length'>0</div>
        </div>
    )
}

const Session = props => {
    return (
        <div id='session-wrapper'>
            <button id='session-decrement'>-</button>
            <button id='session-increment'>+</button>
            <h2 id='session-label'>Session Length</h2>
            <div id='session-length'>0</div>
        </div>
    )
}

const Timer = props => {
    return (
        <div id='timer-wrapper'>
            <h1 id='timer-label'>Timer Label</h1>
            <div id='time-left'>00:00</div>
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

export default class PomTimer extends Component {
    constructor(props) {
        super(props);
        this.state = { defaultState }
    }
    render() {
        return (
            <div id='wrapper'>
                <Break />
                <Session />
                <Timer />
                <StartStop />
                <Reset />
            </div>


        )
    }
}
