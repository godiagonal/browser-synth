import SbReverb from 'soundbank-reverb';
import Effect from '../effect';
import Context from '../audio-context';

export default class Reverb extends Effect {
  constructor(name, node = null, enabled = false) {
    super(name, node, enabled);
  
    this.node = SbReverb(Context);
    this.node.time = 3;
    this.node.wet.value = 0.8;
    this.node.dry.value = 1;
    this.node.filterType = 'lowpass';
    this.node.cutoff.value = 4000;
  }
}
