// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importing a CSS file for styling

const App = () => {
  const [tests, setTests] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [submitted, setSubmitted] = useState(false);  // Prevents multiple submissions

  useEffect(() => {
    axios.get('http://localhost:5000/api/tests')
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the tests:', error);
      });
  }, []);

  const handleAnswerChange = (testId, questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [`${testId}-${questionIndex}`]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnswers(true);
    setSubmitted(true);  // Disable submit after submission
  };

  return (
    <div className="app-container">
      <h1 className="title">Online Test Platform</h1>
      <form onSubmit={handleSubmit} className="test-form">
        {tests.map((test) => (
          <div key={test._id} className="test-section">
            <h2 className="test-title">{test.title}</h2>
            {test.questions.map((q, index) => (
              <div key={index} className="question-container">
                <p className="question-text">{q.question}</p>
                <ul className="options-list">
                  {q.options.map((option, idx) => (
                    <li key={idx} className="option-item">
                      <label className="option-label">
                        <input
                          type="radio"
                          name={`question-${test._id}-${index}`}
                          value={option.text}
                          checked={selectedAnswers[`${test._id}-${index}`] === option.text}
                          onChange={() => handleAnswerChange(test._id, index, option.text)}
                          disabled={showAnswers}  // Disable radio buttons after showing answers
                        />
                        {option.image && <img src={option.image} alt={option.text} className="option-image" />}
                        {option.text}
                      </label>
                    </li>
                  ))}
                </ul>
                {showAnswers && selectedAnswers[`${test._id}-${index}`] && (
                  <div className={`answer-result ${selectedAnswers[`${test._id}-${index}`] === q.answer ? 'correct' : 'incorrect'}`}>
                    <p>
                      Your answer: {selectedAnswers[`${test._id}-${index}`]} <br />
                      Correct answer: {q.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={submitted}>Submit</button>
      </form>
    </div>
  );
};

export default App;
