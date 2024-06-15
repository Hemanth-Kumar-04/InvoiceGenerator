import React, { useState } from 'react';
import WebcamComponent from './WebcamComponent.js';
import SpeechToText from './SpeechToText.js';

const questions = [
  'What is your name?',
  'Why do you want this job?',
  'What are your strengths?',
  'Where do you see yourself in 5 years?'
];

const Interview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [clearTranscript, setClearTranscript] = useState(false);

  const handleNext = () => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex]]: currentAnswer.trim() // Trim to remove extra spaces
    });
    setCurrentAnswer(''); // Reset current answer
    setClearTranscript(true); // Set flag to clear transcript
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Interview completed:', answers);
      // Here you would send the answers to your API
    }
  };

  const handleFinish = () => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex]]: currentAnswer.trim() // Trim to remove extra spaces
    });
    console.log('Final answers:', answers);
    // Here you would send the answers to your API
  };

  const handleTranscriptChange = (newTranscript) => {
    if (clearTranscript) {
      setClearTranscript(false); // Reset clearTranscript flag
    }
    setCurrentAnswer(newTranscript);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Interview Application</h1>
      <h2>{questions[currentQuestionIndex]}</h2>
      <WebcamComponent />
      <SpeechToText onTranscriptChange={handleTranscriptChange} clearTranscript={clearTranscript} />
      <div style={{ marginTop: '20px' }}>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleFinish}>Finish</button>
        )}
      </div>
    </div>
  );
};

export default Interview;
