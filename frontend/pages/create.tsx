import { useState } from "react";
import { Question, QuestionType } from "../types/quiz";
import API from "../services/api";

let questionIdCounter = 1;

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const startQuestion = (type: QuestionType) => {
    const newQuestion: Question = { id: questionIdCounter++, type, text: "" };
    if (type === "boolean") newQuestion.correctAnswer = true;
    if (type === "checkbox") {
      newQuestion.options = [""];
      newQuestion.correctAnswers = [];
    }
    if (type === "input") newQuestion.correctAnswer = "";
    setCurrentQuestion(newQuestion);
  };

  const handleTextChange = (text: string) => {
    if (!currentQuestion) return;
    setCurrentQuestion({ ...currentQuestion, text });
  };

  const handleBooleanChange = (value: boolean) => {
    if (!currentQuestion) return;
    setCurrentQuestion({ ...currentQuestion, correctAnswer: value });
  };

  const handleInputChange = (value: string) => {
    if (!currentQuestion) return;
    setCurrentQuestion({ ...currentQuestion, correctAnswer: value });
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!currentQuestion || !currentQuestion.options) return;
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const addCheckboxOption = () => {
    if (!currentQuestion || !currentQuestion.options || currentQuestion.type !== "checkbox") return;
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""]
    });
  };

  const toggleCorrectAnswer = (option: string) => {
    if (!currentQuestion || !currentQuestion.correctAnswers || currentQuestion.type !== "checkbox") return;
    const correctAnswers = currentQuestion.correctAnswers.includes(option)
      ? currentQuestion.correctAnswers.filter(a => a !== option)
      : [...currentQuestion.correctAnswers, option];
    setCurrentQuestion({ ...currentQuestion, correctAnswers });
  };

  const saveQuestion = () => {
    if (!currentQuestion) return;

    if (!currentQuestion.text.trim()) {
      alert("Question text is required");
      return;
    }
    if (currentQuestion.type === "checkbox") {
      if (!currentQuestion.options || currentQuestion.options.length === 0 || currentQuestion.options.some(o => !o.trim())) {
        alert("Checkbox questions must have at least one non-empty option");
        return;
      }
      if (!currentQuestion.correctAnswers || currentQuestion.correctAnswers.length === 0) {
        alert("Select at least one correct answer");
        return;
      }
    }
    if (currentQuestion.type === "input" && (!currentQuestion.correctAnswer || !currentQuestion.correctAnswer.toString().trim())) {
      alert("Input question must have a correct answer");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion(null);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Quiz title is required");
      return;
    }
    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    try {
      await API.post("/quizzes", {
        title,
        questions: questions.map(q => ({
          type: q.type,
          text: q.text,
          options: q.options || [],
          correctAnswer: q.type === "boolean" || q.type === "input" ? q.correctAnswer?.toString() : null,
          correctAnswers: q.type === "checkbox" ? q.correctAnswers : [],
        })),
      });
      alert("Quiz created!");
      setTitle("");
      setQuestions([]);
      setCurrentQuestion(null);
    } catch (err) {
      console.error(err);
      alert("Error creating quiz. Make sure all fields are filled correctly.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-700 mb-6 text-center">Create a Quiz</h1>

        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
        />

        {!currentQuestion && (
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <button onClick={() => startQuestion("boolean")} className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold shadow">Add Boolean</button>
            <button onClick={() => startQuestion("input")} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold shadow">Add Input</button>
            <button onClick={() => startQuestion("checkbox")} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold shadow">Add Checkbox</button>
          </div>
        )}

        {currentQuestion && (
          <div className="border rounded-xl p-4 bg-gray-50 shadow-sm mb-6">
            <label className="block text-gray-600 font-medium mb-2">New {currentQuestion.type} Question</label>
            <input
              type="text"
              placeholder="Enter question text"
              value={currentQuestion.text}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
            />

            {currentQuestion.type === "boolean" && (
              <div className="flex gap-4 items-center mt-2">
                <label className="flex items-center gap-1">
                  <input type="radio" checked={currentQuestion.correctAnswer === true} onChange={() => handleBooleanChange(true)} /> True
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" checked={currentQuestion.correctAnswer === false} onChange={() => handleBooleanChange(false)} /> False
                </label>
              </div>
            )}

            {currentQuestion.type === "input" && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Correct answer"
                  value={currentQuestion.correctAnswer?.toString() || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            )}

            {currentQuestion.type === "checkbox" && (
              <div className="mt-2 space-y-2">
                {currentQuestion.options?.map((opt, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={currentQuestion.correctAnswers?.includes(opt) || false}
                        onChange={() => toggleCorrectAnswer(opt)}
                      />
                      Correct
                    </label>
                  </div>
                ))}
                <button onClick={addCheckboxOption} className="mt-1 px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500 transition">Add Option</button>
              </div>
            )}

            <button onClick={saveQuestion} className="mt-3 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold shadow">
              Save Question
            </button>
          </div>
        )}

        <ul className="space-y-4 mb-6">
          {questions.map(q => (
            <li key={q.id} className="border rounded-xl p-4 bg-gray-50 shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Question ({q.type}): {q.text}</div>
              {q.type === "boolean" && <div>Answer: {q.correctAnswer ? "True" : "False"}</div>}
              {q.type === "input" && <div>Answer: {q.correctAnswer}</div>}
              {q.type === "checkbox" && (
                <div>
                  Options: {q.options?.join(", ")}
                  <br />
                  Correct: {q.correctAnswers?.join(", ")}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button onClick={handleSubmit} className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-lg">Submit Quiz</button>
      </div>
    </div>
  );
}
