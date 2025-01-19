import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { fetchQuestions } from '../utils/questionDataFetch';
import QuestionSolver from '../components/QuestionSolver';
import { useParams } from 'react-router-dom';

function QuestionBank() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchedQuestions = async () => {
      try {
        const response = await fetchQuestions();
        console.log(response);
        setQuestions(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchedQuestions();
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'linux', name: 'Linux' },
    { id: 'devops', name: 'DevOps' },
    { id: 'networking', name: 'Networking' },
    { id: 'programming', name: 'Programming' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'docker', name: 'Docker' },
    { id: 'kubernetes', name: 'Kubernetes' },
  ];

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const handleSolveClick = (question) => {
    useParams(question.id)
    setSelectedQuestion(question);
  };

  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === selectedQuestion.id);
    const nextQuestion = questions[currentIndex + 1] || questions[0];
    handleSolveClick(nextQuestion);
  };

  const formatDifficulty = (difficulty) => {
    const difficultyMap = {
      easy: { label: 'Easy', className: 'bg-green-100 text-green-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      hard: { label: 'Hard', className: 'bg-red-100 text-red-800' },
    };
    return difficultyMap[difficulty] || { label: 'Unknown', className: 'bg-gray-100 text-gray-800' };
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error loading questions: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {selectedQuestion ? (
        <QuestionSolver
          question={selectedQuestion}
          onNext={handleNextQuestion}
          onBack={() => setSelectedQuestion(null)}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
            <div className="flex space-x-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {questions.filter((question) => {
                const isMatchingCategory =
                  selectedCategory === 'all' || question.category === selectedCategory;
                const isMatchingDifficulty =
                  selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
                const isSearchMatch =
                  question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  question.description?.toLowerCase().includes(searchQuery.toLowerCase());
                return isMatchingCategory && isMatchingDifficulty && isSearchMatch;
              }).map((question) => (
                <li key={question.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
                      <div className="flex space-x-2">
                        {question.tags && question.tags.map((tag) => (
                          <span
                            key={tag.name}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{question.description}</p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {question.category}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formatDifficulty(question.difficulty).className}`}>
                          {formatDifficulty(question.difficulty).label}
                        </span>
                      </div>
                      <button
                        onClick={() => handleSolveClick(question)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Solve
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionBank;
