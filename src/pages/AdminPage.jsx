import React, { useState } from "react";



const AdminPage = () => {
  const [tests, setTests] = useState([]);
  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    type: "mcq",
    question: "",
    options: [],
    correctAnswer: "",
    starterCode: "",
    correctOutput: "",
  });

  const addQuestion = () => {
    const questionCopy = { ...newQuestion }; // Clone the question
    setQuestions([...questions, questionCopy]); // Add the clone to the questions array
    // Reset the form
    setNewQuestion({
      type: "mcq",
      question: "",
      options: [],
      correctAnswer: "",
      starterCode: "",
      correctOutput: "",
    });
  };
  

  const handleSubmitTest = () => {
    const newTest = { id: Date.now(), name: testName, problems: questions };
    setTests([...tests, newTest]);
    setTestName("");
    setQuestions([]);
    alert("Test added successfully!");
  };

  return (
    <div className="admin-page p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="add-test">
        <label className="block mb-2">
          Test Name:
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="block w-full border p-2 rounded mb-4"
          />
        </label>

        <h2 className="text-xl font-semibold mb-2">Add Questions</h2>
        <label className="block mb-2">
          Question Type:
          <select
            value={newQuestion.type}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, type: e.target.value })
            }
            className="block w-full border p-2 rounded mb-4"
          >
            <option value="mcq">MCQ</option>
            <option value="code">Code</option>
          </select>
        </label>
        <label className="block mb-2">
          Question:
          <input
            type="text"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            className="block w-full border p-2 rounded mb-4"
          />
        </label>
        {newQuestion.type === "mcq" && (
          <>
            <label className="block mb-2">
              Options (comma-separated):
              <input
                type="text"
                value={newQuestion.options.join(",")}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    options: e.target.value.split(","),
                  })
                }
                className="block w-full border p-2 rounded mb-4"
              />
            </label>
            <label className="block mb-2">
              Correct Answer:
              <input
                type="text"
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                }
                className="block w-full border p-2 rounded mb-4"
              />
            </label>
          </>
        )}
        {newQuestion.type === "code" && (
          <>
            <label className="block mb-2">
              Starter Code:
              <textarea
                value={newQuestion.starterCode}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, starterCode: e.target.value })
                }
                className="block w-full border p-2 rounded mb-4"
              />
            </label>
            <label className="block mb-2">
              Correct Output:
              <input
                type="text"
                value={newQuestion.correctOutput}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    correctOutput: e.target.value,
                  })
                }
                className="block w-full border p-2 rounded mb-4"
              />
            </label>
          </>
        )}
        <button
          onClick={addQuestion}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </div>

      <button
        onClick={handleSubmitTest}
        className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit Test
      </button>

      <h2 className="text-xl font-semibold mt-6">Tests Overview</h2>
      <ul className="mt-4 space-y-3">
        {tests.map((test) => (
          <li key={test.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{test.name}</h3>
            <ul className="mt-2">
              {test.problems.map((problem, idx) => (
                <li key={idx} className="mb-2">
                  {problem.question}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
