import { useState } from 'react';

function QuizCreator({ lessonId, lessonTitle }) {
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    // TODO: Implement AI quiz generation
    // For now, using mock data
    const mockQuestions = [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the main purpose of this lesson?',
        options: [
          'To introduce basic concepts',
          'To provide advanced techniques',
          'To summarize previous lessons',
          'To prepare for the next module'
        ],
        correctAnswer: 0,
        explanation: 'This lesson focuses on introducing fundamental concepts that will be built upon in later sections.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'This concept is essential for understanding the next module.',
        correctAnswer: true,
        explanation: 'Understanding this concept is crucial as it forms the foundation for more advanced topics.'
      }
    ];
    
    setTimeout(() => {
      setQuestions(mockQuestions);
      setIsGenerating(false);
    }, 1500);
  };

  const handleRegenerateQuestion = async (questionId) => {
    // TODO: Implement AI question regeneration
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          question: 'New regenerated question?',
          options: q.type === 'mcq' ? ['New option 1', 'New option 2', 'New option 3', 'New option 4'] : q.options,
          explanation: 'New explanation for the regenerated question.'
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div className="quiz-creator">
      <div className="quiz-header">
        <h3>Quiz for: {lessonTitle}</h3>
        <div className="quiz-actions">
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="quiz-title-input"
          />
          <button 
            onClick={handleGenerateQuiz}
            disabled={isGenerating}
            className="generate-btn"
          >
            {isGenerating ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="questions-container">
          {questions.map((question) => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <span className="question-type">{question.type.toUpperCase()}</span>
                <button 
                  onClick={() => handleRegenerateQuestion(question.id)}
                  className="regenerate-btn"
                >
                  Regenerate
                </button>
              </div>
              <p className="question-text">{question.question}</p>
              
              {question.type === 'mcq' && (
                <div className="options-list">
                  {question.options.map((option, index) => (
                    <div key={index} className="option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        id={`option-${question.id}-${index}`}
                        checked={question.correctAnswer === index}
                        readOnly
                      />
                      <label htmlFor={`option-${question.id}-${index}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="options-list">
                  <div className="option">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      id={`option-${question.id}-true`}
                      checked={question.correctAnswer === true}
                      readOnly
                    />
                    <label htmlFor={`option-${question.id}-true`}>True</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      id={`option-${question.id}-false`}
                      checked={question.correctAnswer === false}
                      readOnly
                    />
                    <label htmlFor={`option-${question.id}-false`}>False</label>
                  </div>
                </div>
              )}

              <div className="explanation">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizCreator; 