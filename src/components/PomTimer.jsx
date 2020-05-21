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
  }

  incrBreak() {
    this.setState((state) => {
      var newTime = state.breakTime < 60 ? state.breakTime + 1 : 60;
      if (state.running && state.mode == "break") {
        var newSecs =
          state.timeLeftSec < 10
            ? "0" + state.timeLeftSec.toString()
            : state.timeLeftSec.toString();
        var newDisplay = newTime.toString() + newSecs;
        return {
          breakTime: newTime,
          timeLeftMin: newTime,
          timerDisplay: newDisplay,
        };
      } else {
        return { breakTime: newTime };
      }
    });
  }

  decrBreak() {
    this.setState((state) => {
      var newTime = state.breakTime > 1 ? state.breakTime - 1 : 1;
      if (state.running && state.mode == "break") {
        var newSecs =
          state.timeLeftSec < 10
            ? "0" + state.timeLeftSec.toString()
            : state.timeLeftSec.toString();
        var newDisplay = newTime.toString() + newSecs;
        return {
          breakTime: newTime,
          timeLeftMin: newTime,
          timerDisplay: newDisplay,
        };
      } else {
        return { breakTime: newTime };
      }
    });
  }

  incrSession() {
    this.setState((state) => {
      var newTime = state.sessionTime < 60 ? state.sessionTime + 1 : 60;
      var newSecs =
        state.timeLeftSec < 10
          ? "0" + state.timeLeftSec.toString()
          : state.timeLeftSec.toString();
      var newMins =
        newTime < 10 ? "0" + newTime.toString() : newTime.toString();
      var newDisplay = state.timerDisplay;
      if (state.mode == "session" && state.running == true) {
        newDisplay = newMins.toString() + ":" + newSecs;
        return {
          sessionTime: newTime,
          timeLeftMin: newTime,
          timeLeftSecs: newSecs,
          timerDisplay: newDisplay,
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
      var newMins =
        newTime < 10 ? "0" + newTime.toString() : newTime.toString();

      var newSecs =
        state.timeLeftSec < 10
          ? "0" + state.timeLeftSec.toString()
          : state.timeLeftSec.toString();
      var newDisplay = state.timerDisplay;

      if (state.mode == "session" && state.running == true) {
        newDisplay = newMins + ":" + newSecs;
        return {
          sessionTime: newTime,
          timeLeftMin: newTime,
          timeLeftSecs: newSecs,
          timerDisplay: newDisplay,
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
      var mode = state.mode;
      var secs = state.timeLeftSec;
      var mins = state.timeLeftMin;
      var timerLabel = mode == "session" ? workMsg : breakMsg;
      if (secs >= 0) {
        secs--;
      }
      if (secs == 0 && mins == 0) {
        this.playSound();
      }
      if (secs == -1 && mins > 0) {
        secs = 59;
        mins--;
      }
      if (secs == -1 && mins == 0) {
        mode = mode == "session" ? "break" : "session";
        secs = 0;
        mins = mode == "session" ? state.sessionTime : state.breakTime;
        timerLabel = mode == "session" ? workMsg : breakMsg;
      }
      var newTimeMins = mins < 10 ? "0" + mins.toString() : mins.toString();
      var newTimeSecs = secs < 10 ? "0" + secs.toString() : secs.toString();
      var newTime = newTimeMins + ":" + newTimeSecs;
      return {
        timeLeftMin: mins,
        timeLeftSec: secs,
        timerDisplay: newTime,
        mode: mode,
        timerLabel: timerLabel,
      };
    });
  }

  toggleTimer() {
    this.setState((state) => {
      if (state.running) {
        console.log("stopping timer, state = ", state);
        clearInterval(this.timerId);
        return { running: false };
      } else {
        console.log("starting timer, state =", state);
        this.timerId = setInterval(this.countItDown, 10);
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
    this.setState(() => {
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
