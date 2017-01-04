import Context from './audio-context';

export default class Oscillator {
  constructor(frequency, destination = Context.destination) {
    const oscillator = this.oscillator = Context.createOscillator();
    const gain = Context.createGain();
    const volume = this.volume = gain.gain;
    
    oscillator.frequency.value = frequency;
    volume.value = 0;
    
    oscillator.connect(gain);
    gain.connect(destination);
    
    oscillator.start(0);
  }
  
  start() {
    this.volume.value = 1;
  }
  
  stop() {
    this.volume.value = 0;
  }
}
