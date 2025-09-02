import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../../services/api";
import { Quiz } from "../../types/quiz";

export default function QuizDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (!id) return;
    API.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <ul className="space-y-4">
        {quiz.questions.map((q) => (
          <li key={q.id} className="border p-2 rounded">
            <p className="font-semibold">{q.text}</p>
            {q.type === "boolean" && <p>True / False</p>}
            {q.type === "input" && <p>Text input</p>}
            {q.type === "checkbox" && <p>Options: {q.options?.join(", ")}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
