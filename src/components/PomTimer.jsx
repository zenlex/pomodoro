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
    this.countItDown = this.countItDown.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetDefault = this.resetDefault.bind(this);
    this.incrBreak = this.incrBreak.bind(this);
    this.decrBreak = this.decrBreak.bind(this);
    this.incrSession = this.incrSession.bind(this);
    this.decrSession = this.decrSession.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.switchModes = this.switchModes.bind(this);
  }

  incrBreak() {
    this.setState((state) => {
      var newTime = state.breakTime < 60 ? state.breakTime + 1 : 60;
      return {
        breakTime: newTime,
      };
    });
  }

  decrBreak() {
    this.setState((state) => {
      var newTime = state.breakTime > 1 ? state.breakTime - 1 : 1;
      return {
        breakTime: newTime,
      };
    });
  }

  incrSession() {
    this.setState((state) => {
      var newTime = state.sessionTime < 60 ? state.sessionTime + 1 : 60;

      if (!state.running) {
        var newMins =
          newTime < 10 ? "0" + newTime.toString() : newTime.toString();
        return {
          sessionTime: newTime,
          timeLeftMin: newMins,
          timeLeftSecs: 0,
          timerDisplay: newMins + ":" + "00",
        };
      } else {
        return {
          sessionTime: newTime,
        };
      }
    });
  }

  decrSession() {
    this.setState((state) => {
      var newTime = state.sessionTime > 1 ? state.sessionTime - 1 : 1;
      if (!state.running) {
        var newMins =
          newTime < 10 ? "0" + newTime.toString() : newTime.toString();
        return {
          sessionTime: newTime,
          timeLeftMin: newMins,
          timeLeftSecs: 0,
          timerDisplay: newMins + ":" + "00",
        };
      } else {
        return {
          sessionTime: newTime,
        };
      }
    });
  }

  countItDown() {
    this.setState((state) => {
      var newState = {};
      var secs = state.timeLeftSec;
      var mins = state.timeLeftMin;
      if (secs == 0 && mins == 0) {
        newState = this.switchModes(state.mode);
      } else {
        if (secs > 0) {
          secs--;
        } else if (mins > 0) {
          secs = 59;
          mins--;
        }
        var newSecs = secs < 10 ? "0" + secs.toString() : secs.toString();
        var newMins = mins < 10 ? "0" + mins.toString() : mins.toString();
        var newTime = newMins + ":" + newSecs;
        newState = {
          timeLeftMin: mins,
          timeLeftSec: secs,
          timerDisplay: newTime,
        };
      }
      return newState;
    });
  }

  switchModes(currMode) {
    console.log("Switching Modes - currMode =", currMode);
    console.log("Calling playSound(), state = ", this.state);
    this.playSound();
    var mode = currMode == "session" ? "break" : "session";
    var mins =
      mode == "session" ? this.state.sessionTime : this.state.breakTime;
    var newMins = mins < 10 ? "0" + mins.toString() : mins.toString();
    var secs = "00";
    var newTime = newMins + ":" + secs;
    var timerLabel = mode == "session" ? workMsg : breakMsg;
    var newState = {
      timerLabel: timerLabel,
      timerDisplay: newTime,
      timeLeftMin: mins,
      timeLeftSec: 0,
      mode: mode,
    };
    console.log("returning newState = ", newState);
    return newState;
  }

  toggleTimer() {
    this.setState((state) => {
      if (state.running) {
        clearInterval(this.timerId);
        this.stopSound();
        return { running: false };
      } else {
        this.timerId = setInterval(this.countItDown, 100);
        return { running: true };
      }
    });
  }

  playSound() {
    this.beep.play();
  }

  stopSound() {
    this.beep.pause();
    this.beep.currentTime = 0;
  }

  resetDefault() {
    this.setState((state) => {
      return defaultTimerState;
    });
    clearInterval(this.timerId);
    this.stopSound();
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
