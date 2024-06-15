import React, { useState, useEffect } from 'react';

const SpeechToText = ({ onTranscriptChange, clearTranscript }) => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setTranscript((prev) => {
              const newTranscript = prev + event.results[i][0].transcript + ' ';
              onTranscriptChange(newTranscript); // Notify parent component
              return newTranscript;
            });
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onend = () => {
        recognition.start(); // Restart the recognition if it ends.
      };

      recognition.start();

      return () => {
        recognition.stop();
        recognition.onend = null; // Avoid infinite loop in cleanup
      };
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  }, [onTranscriptChange, clearTranscript]);

  useEffect(() => {
    if (clearTranscript) {
      setTranscript('');
    }
  }, [clearTranscript]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Speech to Text Transcript</h2>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
