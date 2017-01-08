import Effect from '../effect';
import Context from '../audio-context';

export default class Delay extends Effect {
  constructor(name, node = null, enabled = false) {
    super(name, node, enabled);
  
    this.input = Context.createGain();
    this.output = Context.createGain();
    
    const delay = Context.createDelay();
    delay.delayTime.value = 0.4;
  
    const feedback = Context.createGain();
    feedback.gain.value = 0.4;
  
    const filter = Context.createBiquadFilter();
    filter.frequency.value = 1000;
  
    delay.connect(feedback);
    feedback.connect(filter);
    filter.connect(delay);
  
    this.input.connect(delay);
    this.input.connect(this.output);
    delay.connect(this.output);
  
    this.node = this.input;
  }
  
  connect(target) {
    this.output.connect(target);
  }
  
  disconnect() {
    this.output.disconnect();
  }
}
