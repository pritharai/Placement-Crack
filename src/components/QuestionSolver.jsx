import React, { useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { ArrowLeft } from 'lucide-react';

function QuestionSolver({ question, onBack, onNext }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);

  console.log(question);

  // Answer options (You could use dynamic mapping or just hardcode them for simplicity)
  const answerOptions = [
    { label: 'answer_a', text: question.answers.answer_a },
    { label: 'answer_b', text: question.answers.answer_b },
    { label: 'answer_c', text: question.answers.answer_c },
    { label: 'answer_d', text: question.answers.answer_d },
    { label: 'answer_e', text: question.answers.answer_e },
    { label: 'answer_f', text: question.answers.answer_f },
  ].filter(option => option.text !== null);  // Filter out null values

  // Get the correct answer key
  const correctAnswerKey = question?.correct_answers; // e.g., { answer_a: 'true', answer_b: 'false', ... }
  const correctAnswers = Object.keys(correctAnswerKey).filter(
    (key) => correctAnswerKey[key] === 'true' // This will filter out only the correct answers
  );
console.log(correctAnswers);

  const handleSubmit = () => {
    console.log(userAnswer);

    // Extract the part before '_correct' in the correct answer key
    const correctAnswer = correctAnswers[0]?.replace('_correct', ''); // Assumes you have only one correct answer

    const isCorrect = userAnswer === correctAnswer; // Check if selected answer matches the correct answer
    setFeedback({
      isCorrect,
      message: isCorrect
        ? 'Correct! Great job!'
        : `Incorrect. The correct answer is ${correctAnswer}.`,
    });
    setIsAnswered(true); // Lock options after submitting answer
  };

  const handleNext = () => {
    // Reset the states when moving to the next question
    setFeedback(null);
    setUserAnswer('');
    setIsAnswered(false); // Unlock options again
    onNext(); // Trigger the onNext callback to load the next question
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
          aria-label="Go back to the question list"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Questions
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">{question.question}</h2>

          <div className="space-x-2 flex">
         <div className='mx-1'>
         <p className="text-sm text-gray-600">
            <strong>Category:</strong> {question.category}
          </p>
         </div>
         <div className='mx-1'>

          <p className="text-sm text-gray-600">
            <strong>Description:</strong> {question.description}
          </p>
         </div>
         <div className='mx-1'>
          <p className="text-sm text-gray-600">
          
            <strong>Difficulty:</strong> {question.difficulty}
          </p>
         </div>
        </div>


        <div className="space-y-4 mb-6">
          {answerOptions.map((option, index) => (
            <label
              key={index}
              className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                userAnswer === option.label
                  ? isAnswered
                    ? correctAnswers.includes(option.label)
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                    : 'bg-indigo-50 border-indigo-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={option.label}
                  checked={userAnswer === option.label}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isAnswered} // Disable after answer submission
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-3">{option.text}</span>
              </div>
            </label>
          ))}
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg ${feedback.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center">
              {feedback.isCorrect ? (
                <AiFillCheckCircle className="h-5 w-5 text-green-400 mr-2" />
              ) : (
                <AiFillCloseCircle className="h-5 w-5 text-red-400 mr-2" />
              )}
              <p className={feedback.isCorrect ? 'text-green-700' : 'text-red-700'}>
                {feedback.message}
              </p>
            </div>
            {isAnswered && question.explanation && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900">Explanation:</h4>
                <p className="mt-1 text-gray-600">{question.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Display additional question info like category, description, and difficulty */}
      
        <div className="flex justify-end space-x-4">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionSolver;
