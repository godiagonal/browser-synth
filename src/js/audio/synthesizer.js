import Octavian from 'octavian';
import Context from './audio-context';
import Oscillator from './oscillator';

const notes = {};

export default {
  oscillatorFor(note, destination = Context.destination) {
    const frequency = new Octavian.Note(note).frequency;
    if (!notes[frequency]) {
      notes[frequency] = new Oscillator(frequency, destination);
    }
    return notes[frequency];
  },
};
