import Synthesizer from './audio/synthesizer';

let currentNote = null;

window.test = function (note) {
  if (currentNote) {
    Synthesizer.oscillatorFor(currentNote).stop();
  }
  
  Synthesizer.oscillatorFor(note).start();
  currentNote = note;
};
