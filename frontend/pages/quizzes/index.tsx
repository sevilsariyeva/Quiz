import { useEffect, useState } from "react";
import API from "../../services/api";
import { Quiz } from "../../types/quiz";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [expandedQuizId, setExpandedQuizId] = useState<number | null>(null);
  const [quizDetails, setQuizDetails] = useState<{ [key: number]: any }>({});

  const fetchQuizzes = async () => {
    const res = await API.get("/quizzes");
    setQuizzes(res.data);
  };

  const fetchQuizDetails = async (id: number) => {
    if (quizDetails[id]) return;
    const res = await API.get(`/quizzes/${id}`);
    setQuizDetails((prev) => ({ ...prev, [id]: res.data }));
  };

  const toggleQuiz = async (id: number) => {
    if (expandedQuizId === id) {
      setExpandedQuizId(null);
    } else {
      await fetchQuizDetails(id);
      setExpandedQuizId(id);
    }
  };

  const deleteQuiz = async (id: number) => {
    await API.delete(`/quizzes/${id}`);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    if (expandedQuizId === id) setExpandedQuizId(null);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Quizzes</h1>

      <ul className="space-y-4">
        {quizzes.map((quiz) => {
          const details = quizDetails[quiz.id];
          return (
            <li key={quiz.id} className="border rounded-lg shadow bg-white">
              <div
                onClick={() => toggleQuiz(quiz.id)}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <span className="text-lg font-medium text-blue-600">
                  {quiz.title} ({quiz.questionCount} questions)
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteQuiz(quiz.id);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>

              {expandedQuizId === quiz.id && details && (
                <div className="p-4 border-t space-y-4 bg-gray-50">
                  {details.questions.map((q: any) => (
                    <div key={q.id} className="border p-3 rounded-lg shadow-sm bg-white">
                      <p className="font-medium">{q.text}</p>

                      {q.type === "boolean" && (
                        <p className="mt-1">
                          Correct answer: <span className="text-green-600">{q.correctAnswer ? "True" : "False"}</span>
                        </p>
                      )}

                      {q.type === "input" && (
                        <p className="mt-1">
                          Correct answer: <span className="text-green-600">{q.correctAnswer}</span>
                        </p>
                      )}

                      {q.type === "checkbox" && (
                        <div className="mt-1">
                          <p>Options:</p>
                          <ul className="ml-4 list-disc">
                            {q.options.map((opt: string) => (
                              <li key={opt}>
                                {opt} {q.correctAnswers.includes(opt) && <span className="text-green-600">(Correct)</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
