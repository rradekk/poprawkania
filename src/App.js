import React, { useState } from "react";
import { questions } from './questions';
import { styles } from './styles';

// A simple similarity checker: returns true if at least 60% of words in 'answer'
// appear in 'input'. This is a naive example that you can improve.
function checkSimilarity(userInput, correctAnswer) {
  const input = userInput.trim().toLowerCase();
  const answer = correctAnswer.trim().toLowerCase();

  if (!input || !answer) return false;

  const inputWords = input.split(/\s+/);
  const answerWords = answer.split(/\s+/);

  let matchCount = 0;
  inputWords.forEach((word) => {
    if (answerWords.includes(word)) {
      matchCount++;
    }
  });

  const similarityRatio = matchCount / inputWords.length;
  return similarityRatio >= 0.6;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleMultipleChoiceClick = (selectedOption) => {
    if (selectedOption === currentQuestion.answer) {
      setIsCorrect(true);
    } else {
      setWrongAnswers(prev => new Set([...prev, selectedOption]));
    }
  };

  const handleCheckText = () => {
    if (checkSimilarity(userInput, currentQuestion.answer)) {
      setIsCorrect(true);
      setShowAnswer(true);
      setIsWrong(false);
    } else {
      setIsWrong(true);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setIsWrong(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const goToNextQuestion = () => {
    setUserInput("");
    setShowAnswer(false);
    setIsCorrect(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // When we've reached the end:
  if (currentIndex >= questions.length) {
    return (
      <div style={styles.container}>
        <h1>All questions completed!</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.questionHeader}>
        <h1>Question {currentIndex + 1}</h1>
        <button 
          style={{...styles.button, ...styles.skipButton}} 
          onClick={goToNextQuestion}
        >
          Skip
        </button>
      </div>
      <p>{currentQuestion.question}</p>

      {currentQuestion.type === "multiple" && (
        <div>
          {Object.entries(currentQuestion.options).map(([option, text]) => (
            <button
              key={option}
              style={{
                ...styles.button,
                ...(wrongAnswers.has(option) && styles.wrongButton),
                ...(isCorrect && option === currentQuestion.answer && styles.correctButton),
              }}
              onClick={() => handleMultipleChoiceClick(option)}
              disabled={wrongAnswers.has(option) || isCorrect}
            >
              {option.toUpperCase()}. {text}
            </button>
          ))}
          {isCorrect && (
            <div>
              <p style={styles.correctAnswer}>
                Correct!
                <br />
                <span style={styles.answerText}>
                  Answer: {currentQuestion.options[currentQuestion.answer]}
                </span>
              </p>
              <button style={styles.button} onClick={goToNextQuestion}>
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {currentQuestion.type === "text" && (
        <div>
          <input
            style={{
              ...styles.input,
              ...(isWrong && styles.wrongInput),
            }}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your answer here"
            disabled={isCorrect}
          />
          {showAnswer && !isCorrect && (
            <p style={styles.correctAnswer}>
              Correct answer: {currentQuestion.answer}
            </p>
          )}
          {!isCorrect ? (
            <div style={styles.buttonGroup}>
              {!showAnswer && (
                <button 
                  style={{...styles.button, ...styles.showAnswerButton}} 
                  onClick={handleShowAnswer}
                >
                  Show Answer
                </button>
              )}
              <button style={styles.button} onClick={handleCheckText}>
                Check Answer
              </button>
            </div>
          ) : (
            <div>
              <p style={styles.correctAnswer}>
                Correct!
                <br />
                <span style={styles.answerText}>
                  Answer: {currentQuestion.answer}
                </span>
              </p>
              <button style={styles.button} onClick={goToNextQuestion}>
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
