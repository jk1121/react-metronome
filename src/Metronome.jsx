import React,{Component} from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';

import './Metronome.css';

class Metronome extends  Component{
 state = {
   playing : false,
   bpm:100,
   count:0,
   beatsPerMeasure:4
 }

  constructor(props){
   super(props);
   this.click1 = new Audio(click1);
   this.click2 = new Audio(click2);
 }


  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };
  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
  };


  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (this.state.count + 1) % this.state.beatsPerMeasure
    }));
  };

  render(){
    const {playing,bpm}= this.state;
    return (
      <div className="metronome">
        <div className="bpmSlider">
          <div>{bpm} BPM</div>
          <input type="range" min="100" max="300" value={bpm} onChange={this.handleBpmChange}/>
        </div>
        <button onClick={this.startStop}> {playing?"Stop":"Start"}</button>
      </div>
    );
  }
}
export default Metronome;