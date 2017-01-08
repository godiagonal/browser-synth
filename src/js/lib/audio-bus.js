import Context from './audio-context';
import Distortion from './effects/distortion';
import Reverb from './effects/reverb';
import LowpassFilter from './effects/lowpass-filter';
import MoogFilter from './effects/moog-filter';
import Delay from './effects/delay';

export default class AudioBus {
  constructor(input = Context.createGain(), output = Context.createGain()) {
    this.input = input;
    this.output = output;
  
    this.fxChain = [
      new MoogFilter('toy'),
      new Distortion('distortion'),
      new Reverb('reverb'),
      new Delay('delay'),
      new LowpassFilter('lowpass'),
    ];
    
    this.connectFxChain();
  }
  
  connect(target) {
    this.output.connect(target);
  }
  
  findFx(name) {
    return this.fxChain.find(fx => fx.name === name);
  }
  
  toggleFx(name) {
    const foundFx = this.findFx(name);
    if (foundFx) {
      foundFx.enabled = !foundFx.enabled;
      this.connectFxChain();
    }
  }
  
  connectFxChain() {
    const fxChain = this.fxChain.filter(fx => fx.enabled);
    
    if (fxChain.length) {
      this.input.disconnect();
      this.input.connect(fxChain[0].node);
      
      for (let i = 1; i < fxChain.length; i++) {
        fxChain[i - 1].disconnect();
        fxChain[i - 1].connect(fxChain[i].node);
      }
  
      fxChain[fxChain.length - 1].disconnect();
      fxChain[fxChain.length - 1].connect(this.output);
    } else {
      this.input.disconnect();
      this.input.connect(this.output);
    }
  }
}
