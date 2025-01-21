import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";

const MockTestsPage = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Fetch mock tests dynamically
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("/api/upload-test");
        if (Array.isArray(response.data)) {
          setTests(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setTests([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
        setTests([]); // Fallback in case of an error
      }
    };
    

    fetchTests();
  }, []);

  // Start timer when a test is selected
  useEffect(() => {
    if (selectedTest && timerInterval === null) {
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      setTimerInterval(interval);
    }
    return () => clearInterval(timerInterval);
  }, [selectedTest]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswer = (index, answer) => {
    setUserAnswers({ ...userAnswers, [index]: answer });
  };

  const handleSubmit = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);

    // Evaluate the test (This is just a placeholder)
    console.log("User answers:", userAnswers);
    console.log("Total time taken:", formatTime(timer));
    alert("Test submitted! Time taken: " + formatTime(timer));

    resetTest();
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentProblemIndex(0);
    setUserAnswers({});
    setTimer(0);
  };

  return (
    <div className="mock-tests-page p-6">
      {!selectedTest ? (
        <div className="test-selection">
          <h1 className="text-2xl font-bold mb-4">Available Mock Tests</h1>
          {Array.isArray(tests) && tests.length > 0 ? (
  tests.map((test) => (
    <li key={test.id} className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{test.name}</h2>
      <button
        onClick={() => setSelectedTest(test)}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
      >
        Start Test
      </button>
    </li>
  ))
) : (
  <p>Loading tests...</p>
)}
</div>
      ) : (
        <div className="test-problems">
          <h2 className="text-2xl font-bold mb-2">{selectedTest.name}</h2>
          <p className="mb-4 text-gray-600">Timer: {formatTime(timer)}</p>

          {selectedTest.problems[currentProblemIndex].type === "mcq" && (
            <div className="mcq">
              <p className="mb-4">
                {selectedTest.problems[currentProblemIndex].question}
              </p>
              {selectedTest.problems[currentProblemIndex].options.map(
                (option, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleAnswer(currentProblemIndex, option)
                    }
                    className={`block w-full text-left border py-2 px-4 rounded mb-2 ${
                      userAnswers[currentProblemIndex] === option
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {selectedTest.problems[currentProblemIndex].type === "code" && (
            <div className="code-problem">
              <p className="mb-4">
                {selectedTest.problems[currentProblemIndex].question}
              </p>
              <CodeMirror
                value={selectedTest.problems[currentProblemIndex].starterCode}
                height="200px"
                extensions={[javascript()]}
                onChange={(value) =>
                  handleAnswer(currentProblemIndex, value)
                }
              />
            </div>
          )}

          <div className="navigation mt-6 flex justify-between">
            <button
              onClick={() =>
                setCurrentProblemIndex((prev) => Math.max(prev - 1, 0))
              }
              className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400"
              disabled={currentProblemIndex === 0}
            >
              Previous
            </button>
            {currentProblemIndex === selectedTest.problems.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentProblemIndex((prev) =>
                    Math.min(prev + 1, selectedTest.problems.length - 1)
                  )
                }
                className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTestsPage;
