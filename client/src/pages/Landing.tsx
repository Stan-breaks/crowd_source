import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <MedicalIcon className="h-6 w-6" />
          <span className="sr-only">Crowd-Sourced Health</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/SignUp"
          >
            Get Involved
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/SignUp"
          >
            Resources
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-cyan-100 px-3 py-1 text-sm dark:bg-cyan-800">
                  Crowd-Sourced Health
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Accelerating Medical Breakthroughs
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Crowd-Sourced Health is a platform that harnesses the power of
                  collective knowledge and data to drive medical innovation. By
                  engaging patients, researchers, and the broader community, we
                  aim to unlock new insights and accelerate the development of
                  life-changing treatments.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-cyan-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-600 dark:text-gray-900 dark:hover:bg-cyan-600/90 dark:focus-visible:ring-gray-300"
                  to="/SignUp"
                >
                  Join the Movement
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cyan-100 dark:bg-cyan-800">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="crowd"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="http://localhost:3000/static/crowd.jpeg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-cyan-100 px-3 py-1 text-sm dark:bg-cyan-800">
                    Collaborative Research
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Unlocking New Insights Together
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Crowd-Sourced Health brings together patients, researchers,
                    and the broader community to share data, insights, and
                    ideas. By harnessing the power of collective knowledge, we
                    can uncover new avenues for medical breakthroughs and
                    accelerate the development of life-changing treatments.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-cyan-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-cyan-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-600 dark:text-gray-900 dark:hover:bg-cyan-600/90 dark:focus-visible:ring-gray-300"
                    to="/SignUp"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Crowd-Sourced Health. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MedicalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20M9 7h6M7 9v6M18 11h-5v5h-2v-5h-5" />
    </svg>
  );
}
