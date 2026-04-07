import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-nowrap font-bold">EDUCATIONAL MODULE 01</div>
        <h1 className="mt-4 text-4xl font-extrabold text-black tracking-tight sm:text-5xl lg:text-6xl">
          The Anatomy of a <span className="text-primary">Breach</span>
        </h1>
        <p className="mt-6 text-lg md:text-4xl md:leading-13 text-secondary">
          This is a fun project, but it also teaches an important lesson: even
          small, careless decisions about what to tell users during login or
          signup can leak sensitive information and lead to serious
          vulnerabilities.
        </p>
        <Link
          to="/login"
          className="mt-6 md:mt-12 inline-block rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/80"
        >
          Get Started
        </Link>
        {/* Disclaimer */}
        <div className="mt-12 max-w-4xl border-l-4 border-primary/60 pl-4 sm:pl-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-primary sm:h-6 sm:w-6">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-full w-full"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 6a.75.75 0 10-1.5 0v.5a.75.75 0 001.5 0V8zm-.75 3a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary sm:text-sm">
                Disclaimer
              </p>
              <p className="mt-1 text-sm leading-6 text-secondary sm:text-base sm:leading-7">
                Controlled educational environment using dummy data. A session
                cookie is issued upon login solely to track the administrative
                account used and ensure the simulation count is accurate. No
                personal data is stored or collected.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
