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
  const [selectedQuestions, setSelectedQuestions] = useState(null); // null means no selection yet
  const [points, setPoints] = useState(0);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);  // Track if user has attempted the question

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAllQuestions = () => {
    setSelectedQuestions([...questions]);
    setIsRandomMode(false);
  };

  const handleRandomQuestions = () => {
    const shuffled = shuffleArray([...questions]);
    setSelectedQuestions(shuffled.slice(0, 20));
    setIsRandomMode(true);
  };

  // If no questions selected yet, show selection screen
  if (!selectedQuestions) {
    return (
      <div style={styles.container}>
        <h1>Choose Quiz Mode</h1>
        <div style={styles.modeSelection}>
          <button 
            style={{...styles.button, ...styles.modeButton}} 
            onClick={handleAllQuestions}
          >
            All Questions ({questions.length})
          </button>
          <button 
            style={{...styles.button, ...styles.modeButton}} 
            onClick={handleRandomQuestions}
          >
            Random 20 Questions
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentIndex];

  const handleMultipleChoiceClick = (selectedOption) => {
    if (!hasAttempted) {  // Only count first attempt
      setHasAttempted(true);
      if (selectedOption === currentQuestion.answer) {
        setIsCorrect(true);
        if (isRandomMode) {
          setPoints(prev => prev + 1);
        }
      } else {
        setWrongAnswers(prev => new Set([...prev, selectedOption]));
      }
    } else {
      if (selectedOption === currentQuestion.answer) {
        setIsCorrect(true);
      } else {
        setWrongAnswers(prev => new Set([...prev, selectedOption]));
      }
    }
  };

  const handleCheckText = () => {
    if (!hasAttempted && !showAnswer) {  // Only count first attempt and if answer wasn't shown
      setHasAttempted(true);
      if (checkSimilarity(userInput, currentQuestion.answer)) {
        setIsCorrect(true);
        setShowAnswer(true);
        setIsWrong(false);
        if (isRandomMode) {
          setPoints(prev => prev + 1);
        }
      } else {
        setIsWrong(true);
      }
    } else {
      if (checkSimilarity(userInput, currentQuestion.answer)) {
        setIsCorrect(true);
        setShowAnswer(true);
        setIsWrong(false);
      } else {
        setIsWrong(true);
      }
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setIsWrong(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setHasAttempted(true);  // Showing answer counts as an attempt
  };

  const goToNextQuestion = () => {
    setUserInput("");
    setShowAnswer(false);
    setIsCorrect(false);
    setWrongAnswers(new Set());
    setHasAttempted(false);  // Reset attempt status for next question
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // When we've reached the end:
  if (currentIndex >= selectedQuestions.length) {
    return (
      <div style={styles.container}>
        <h1>Quiz Completed!</h1>
        {isRandomMode && (
          <div style={styles.results}>
            <p style={styles.score}>Your Score: {points}/20</p>
            <p style={styles.percentage}>
              Percentage: {((points / 20) * 100).toFixed(1)}%
            </p>
          </div>
        )}
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
