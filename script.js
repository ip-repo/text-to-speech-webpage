var synth = window.speechSynthesis;
var voices = [];

  function populateVoiceList() {
    if(voices.length > 0) return;
    voices = synth.getVoices();
    var select = document.getElementById("voiceSelect");
    for(var i = 0; i < voices.length ; i++) {
      var option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      select.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  function speak(){
    var textInput = document.getElementById("text-to-speech").value;
    var voiceSelect = document.getElementById("voiceSelect");
    var utterThis = new SpeechSynthesisUtterance(textInput);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for(var i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    synth.speak(utterThis);
  }

  function stopSpeaking(){
    synth.cancel();
  }
