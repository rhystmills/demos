import React from 'react';
import * as Tone from 'tone'

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
function playNote(){
    synth.triggerAttackRelease("C4", "8n");
}


function MusicButton(props) {
  return (
    <>
      <button onClick={playNote
      }>{props.value}</button>
    </>
  );
}

  export default MusicButton