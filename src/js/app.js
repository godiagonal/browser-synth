import $ from 'jquery';
import Synthesizer from './lib/synthesizer';
import Bindings from './lib/key-bindings';

const synth = new Synthesizer();

/*
 Synth events
 */

synth.onPlay((note) => {
  const keyId = note.replace('#', 'S').replace('+', '');
  $(`#key-${keyId}`).addClass('active');
});

synth.onRelease((note) => {
  const keyId = note.replace('#', 'S').replace('+', '');
  $(`#key-${keyId}`).removeClass('active');
});

synth.onWaveShapeChanged((shape) => {
  $('.waveshape').removeClass('btn-primary');
  $(`#waveshape-${shape}`).addClass('btn-primary');
});

synth.onFxChainChanged((fxChain) => {
  fxChain.forEach((fx) => {
    if (fx.enabled) {
      $(`#fx-${fx.name}`).addClass('btn-primary');
    } else {
      $(`#fx-${fx.name}`).removeClass('btn-primary');
    }
  });
});

synth.onOctaveChanged((octave) => {
  $('#octave').text(octave);
});

$(() => {
  /*
   Keyboard events
   */
  $(document).on('keydown', (event) => {
    // console.log(event.keyCode);
    if (Bindings.notes[event.keyCode]) {
      synth.play(Bindings.notes[event.keyCode]);
    } else if (Bindings.octaves[event.keyCode]) {
      synth.setOctave(Bindings.octaves[event.keyCode]);
    } else if (Bindings.waveShapes[event.keyCode]) {
      synth.setWaveShape(Bindings.waveShapes[event.keyCode]);
    } else if (Bindings.effects[event.keyCode]) {
      synth.toggleFx(Bindings.effects[event.keyCode]);
    }
  });
  
  $(document).on('keyup', (event) => {
    if (Bindings.notes[event.keyCode]) {
      synth.release(Bindings.notes[event.keyCode]);
    }
  });
  
  /*
   Mouse events
   */
  $('.key').on('mousedown', (event) => {
    synth.play($(event.target).data('note'));
  });
  
  $('.key').on('mouseup', (event) => {
    synth.release($(event.target).data('note'));
  });
  
  $('.waveshape').on('click', (event) => {
    let target = $(event.target);
    if (!target.is('.waveshape')) {
      target = target.closest('.waveshape');
    }
    synth.setWaveShape(target.data('waveshape'));
  });
  
  $('.effect').on('click', (event) => {
    let target = $(event.target);
    if (!target.is('.effect')) {
      target = target.closest('.effect');
    }
    synth.toggleFx(target.data('effect'));
  });
  
  $('.octave-control').on('click', (event) => {
    synth.setOctave($(event.target).data('octave-direction'));
  });
});
