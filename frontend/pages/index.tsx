
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50 p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-purple-700">Quiz App</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/create"
          className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
        >
          Create a New Quiz
        </Link>

        <Link
          href="/quizzes"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Quizzes
        </Link>
      </div>
    </div>
  );
}
