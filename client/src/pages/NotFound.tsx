import { Link } from "react-router-dom";

export default function Component() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-800">
      <div className="container mx-auto max-w-md space-y-6 text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
          Oops! Page not found.
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist. Don't worry, you can
          navigate back to the homepage.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to="/home"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
