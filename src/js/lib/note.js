export default class Note {
  constructor(note, octave) {
    this.octave = octave;
    this.note = note;
  
    const extraOctaveIndex = note.indexOf('+');
    if (extraOctaveIndex !== -1) {
      this.octave += parseInt(note.substring(extraOctaveIndex + 1, note.length));
      this.note = note.substring(0, extraOctaveIndex);
    }
  }
}
