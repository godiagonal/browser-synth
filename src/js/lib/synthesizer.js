import Octavian from 'octavian';
import Context from './audio-context';
import Oscillator from './oscillator';
import AudioBus from './audio-bus';
import Note from './note';

export default class Synthesizer {
  constructor(waveShape = 'sine', destination = Context.destination) {
    this.waveShape = waveShape;
    this.oscillators = {};
    this.octave = 3;
    
    this.audioBus = new AudioBus();
    this.audioBus.connect(destination);
  }
  
  toggleFx(name) {
    this.audioBus.toggleFx(name);
    
    if (this.handleFxChainChanged) {
      this.handleFxChainChanged(this.audioBus.fxChain);
    }
  }
  
  setOctave(direction) {
    if (direction === 'up' && this.octave < 6) {
      this.octave += 1;
    } else if (direction === 'down' && this.octave > 1) {
      this.octave -= 1;
    }
    
    if (this.handleOctaveChanged) {
      this.handleOctaveChanged(this.octave);
    }
  }
  
  setWaveShape(shape) {
    this.waveShape = shape;
    
    if (this.handleWaveShapeChanged) {
      this.handleWaveShapeChanged(shape);
    }
  }
  
  play(noteStr) {
    const note = new Note(noteStr, this.octave);
    this.oscillatorFor(`${note.note}${note.octave}`).start();
    
    if (this.handlePlay) {
      this.handlePlay(noteStr);
    }
  }
  
  release(noteStr) {
    const note = new Note(noteStr, this.octave);
    this.oscillatorFor(`${note.note}${note.octave}`).stop();
    
    if (this.handleRelease) {
      this.handleRelease(noteStr);
    }
  }
  
  oscillatorFor(note) {
    const frequency = new Octavian.Note(note).frequency;
    
    if (!this.oscillators[frequency]) {
      this.oscillators[frequency] = new Oscillator(frequency, this.audioBus.input);
    }
    
    this.oscillators[frequency].setType(this.waveShape);
    
    return this.oscillators[frequency];
  }
  
  onPlay(callback) {
    this.handlePlay = callback;
  }
  
  onRelease(callback) {
    this.handleRelease = callback;
  }
  
  onWaveShapeChanged(callback) {
    this.handleWaveShapeChanged = callback;
    callback(this.waveShape);
  }
  
  onFxChainChanged(callback) {
    this.handleFxChainChanged = callback;
    callback(this.audioBus.fxChain);
  }
  
  onOctaveChanged(callback) {
    this.handleOctaveChanged = callback;
    callback(this.octave);
  }
}
