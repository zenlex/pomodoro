import React, { Component } from "react";
const workMsg = "Get 'er Done!";
const breakMsg = "Chillax Bruh -_-";
import chime from "../assets/chime.wav";

const defaultTimerState = {
  breakTime: 5,
  sessionTime: 25,
  timeLeftMin: 25,
  timeLeftSec: 0,
  timerDisplay: "25:00",
  timerLabel: "Time Remaining",
  mode: "session",
  running: false,
};
export default class PomTimer extends Component {
  constructor(props) {
    super(props);
    this.beep = new Audio(chime);
    this.beep.loop = false;
    this.state = defaultTimerState;
    this.updateTimer = this.updateTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetDefault = this.resetDefault.bind(this);
    this.incrBreak = this.incrBreak.bind(this);
    this.decrBreak = this.decrBreak.bind(this);
    this.incrSession = this.incrSession.bind(this);
    this.decrSession = this.decrSession.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.switchModes = this.switchModes.bind(this);
    this.tick = this.tick.bind(this);
  }

  updateTimer() {
    if (this.state.timerDisplay == "00:00") {
      this.playSound();
      this.switchModes();
    }
    var s = this.state;
    var secs = s.timeLeftSec;
    var mins = s.timeLeftMin;
    if (mins > 0 && secs == -1) {
      mins -= 1;
      secs = 59;
    }
    var dispMins = mins < 10 ? "0" + mins.toString() : mins.toString();
    var dispSecs = secs < 10 ? "0" + secs.toString() : secs.toString();
    var newTime = dispMins + ":" + dispSecs;
    this.setState(() => {
      return { timerDisplay: newTime, timeLeftMin: mins, timeLeftSec: secs };
    });
  }

  incrBreak() {
    var s = this.state;
    var newTime = s.breakTime < 60 ? s.breakTime + 1 : 60;
    this.setState({ breakTime: newTime });
  }

  decrBreak() {
    var s = this.state;
    var newTime = s.breakTime > 1 ? s.breakTime - 1 : 1;
    this.setState({ breakTime: newTime });
  }

  incrSession() {
    var s = this.state;
    var newTime = s.sessionTime < 60 ? s.sessionTime + 1 : 60;
    this.setState({ sessionTime: newTime });
    if (!s.running) {
      var dispTime =
        newTime < 10 ? "0" + newTime.toString() : newTime.toString();
      this.setState({
        timeLeftMin: newTime,
        timeLeftSec: 0,
        timerDisplay: dispTime + ":00",
      });
    }
  }

  decrSession() {
    var s = this.state;
    var newTime = s.sessionTime > 1 ? s.sessionTime - 1 : 1;
    this.setState({
      sessionTime: newTime,
    });
    if (!s.running) {
      var dispTime =
        newTime < 10 ? "0" + newTime.toString() : newTime.toString();
      this.setState({
        timeLeftMin: newTime,
        timeLeftSec: 0,
        timerDisplay: dispTime + ":00",
      });
    }
  }

  tick() {
    this.setState((state) => {
      return { timeLeftSec: state.timeLeftSec - 1 };
    });
    this.updateTimer();
  }

  switchModes() {
    var s = this.state;
    var mode = s.mode == "session" ? "break" : "session";
    var mins =
      mode == "session" ? this.state.sessionTime : this.state.breakTime;
    var secs = 0;
    var timerLabel = mode == "session" ? workMsg : breakMsg;
    var dispMins = mins < 0 ? "0" + mins.toString() : mins.toString();
    var newState = {
      timeLeftMin: mins,
      timeLeftSec: secs,
      timerLabel: timerLabel,
      timerDisplay: dispMins + ":00",
      mode: mode,
    };
    this.setState(newState);
  }

  toggleTimer() {
    var s = this.state;
    if (s.running) {
      clearInterval(this.timerId);
      this.stopSound();
      this.setState({ running: false });
    } else {
      this.timerId = setInterval(this.tick, 1000);
      this.setState({ running: true });
    }
  }

  playSound() {
    this.beep.play();
  }

  stopSound() {
    this.beep.pause();
    this.beep.currentTime = 0;
  }

  resetDefault() {
    clearInterval(this.timerId);
    this.stopSound();
    this.setState(defaultTimerState);
  }

  render() {
    return (
      <div id="wrapper">
        <Break
          breakTime={this.state.breakTime}
          incr={this.incrBreak}
          decr={this.decrBreak}
        />
        <Session
          sessionTime={this.state.sessionTime}
          incr={this.incrSession}
          decr={this.decrSession}
        />
        <Timer
          timerDisplay={this.state.timerDisplay}
          label={this.state.timerLabel}
        />
        <StartStop onClick={this.toggleTimer} />
        <Reset onClick={this.resetDefault} />
        <audio id="beep" src={chime}></audio>
      </div>
    );
  }
}

const Break = (props) => {
  return (
    <div id="break-wrapper">
      <button id="break-decrement" onClick={props.decr}>
        -
      </button>
      <button id="break-increment" onClick={props.incr}>
        +
      </button>
      <h2 id="break-label">Break Length</h2>
      <div id="break-length">{props.breakTime}</div>
    </div>
  );
};

const Session = (props) => {
  return (
    <div id="session-wrapper">
      <button id="session-decrement" onClick={props.decr}>
        -
      </button>
      <button id="session-increment" onClick={props.incr}>
        +
      </button>
      <h2 id="session-label">Session Length</h2>
      <div id="session-length">{props.sessionTime}</div>
    </div>
  );
};

const Timer = (props) => {
  return (
    <div id="timer-wrapper">
      <h1 id="timer-label">{props.label}</h1>
      <div id="time-left">{props.timerDisplay}</div>
    </div>
  );
};

const StartStop = (props) => {
  return (
    <button id="start_stop" onClick={props.onClick}>
      Start/Stop
    </button>
  );
};

const Reset = (props) => {
  return (
    <button id="reset" onClick={props.onClick}>
      Reset
    </button>
  );
};
