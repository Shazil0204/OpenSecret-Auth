import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  LockIcon,
  RightArrowIcon,
  UserIcon,
} from "../components/icons";
import { Link, useNavigate } from "react-router-dom";
import authData from "../secure/data.json";

type AuthAccount = {
  id: string;
  username: string;
  hashedpassword: string;
  timestamp: string;
  seen: boolean;
};

type AuthData = {
  accounts: AuthAccount[];
  stats: {
    totalAccountsCreated: number;
    totalAdminPageVisits: number;
  };
};

const hashPassword = (rawPassword: string) => {
  // Demo-only hash: keep deterministic so it can be matched against JSON seed data.
  return `v1:${btoa(rawPassword)}`;
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const canLogin =
    username.trim().length > 0 && password.trim().length > 0 && acceptedTerms;

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (!canLogin) {
      return;
    }

    const authStore = authData as AuthData;
    const targetAccount = authStore.accounts.find(
      (account) => account.username === username.trim(),
    );
    const candidateHash = hashPassword(password);

    if (!targetAccount || targetAccount.hashedpassword !== candidateHash) {
      setLoginError(true);
      return;
    }

    setLoginError(false);
    navigate("/admin");
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(26,35,126,0.18)_0,transparent_38%),radial-gradient(circle_at_87%_82%,rgba(69,90,100,0.2)_0,transparent_40%)]" />
      <div className="pointer-events-none absolute -left-24 top-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-6 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-primary/10 bg-white/90 p-7 shadow-[0_30px_90px_rgba(26,35,126,0.18)] ring-1 ring-white/70 backdrop-blur-md sm:p-9">
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="rounded-full bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
              Welcome Back
            </p>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              Exit
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-[2rem]">
            Log in to OpenSecret
          </h1>
          <p className="text-sm leading-6 text-secondary/95">
            Use your credentials to continue the educational security module.
          </p>
        </div>

        {loginError && (
          <div className="mb-6 rounded-lg border-l-4 border-red-600 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-semibold text-red-600">
                  LOGIN ERROR
                </p>
                <p className="mt-1 text-sm text-red-800">
                  Username or password is wrong. Try again, or <Link to="/signup" className="font-semibold text-red-800 hover:text-red-600">
                    create a new account
                  </Link> if you don't have one.
                </p>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-5" autoComplete="off" onSubmit={handleLogin}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 rounded-md bg-primary/8 p-1.5 text-primary/80">
              <UserIcon className="h-4 w-4" />
            </span>
            <input
              type="text"
              id="Username"
              name="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                if (loginError) {
                  setLoginError(false);
                }
              }}
              className="peer w-full rounded-xl border border-gray-200/90 bg-white pb-3 pl-12 pr-3 pt-6 text-[15px] text-primary shadow-sm transition-[border-color,box-shadow] placeholder:text-transparent focus:border-primary/45 focus:outline-none focus:ring-4 focus:ring-primary/10"
              placeholder=" "
            />
            <label
              htmlFor="Username"
              className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 rounded bg-white px-1 text-sm text-secondary/70 transition-all duration-200 ease-out peer-focus:left-2/12 peer-focus:top-0 peer-focus:-translate-x-1/2 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-not-placeholder-shown:left-2/12 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-x-1/2 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-primary"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 rounded-md bg-primary/8 p-1.5 text-primary/80">
              <LockIcon className="h-4 w-4" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="Password"
              name="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (loginError) {
                  setLoginError(false);
                }
              }}
              className="peer w-full rounded-xl border border-gray-200/90 bg-white pb-3 pl-12 pr-12 pt-6 text-[15px] text-primary shadow-sm transition-[border-color,box-shadow] placeholder:text-transparent focus:border-primary/45 focus:outline-none focus:ring-4 focus:ring-primary/10"
              placeholder=" "
            />
            <label
              htmlFor="Password"
              className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 rounded bg-white px-1 text-sm text-secondary/70 transition-all duration-200 ease-out peer-focus:left-2/12 peer-focus:top-0 peer-focus:-translate-x-1/2 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-not-placeholder-shown:left-2/12 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-x-1/2 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-primary"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-secondary/80 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          <label
            htmlFor="acceptTerms"
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-primary/10 bg-primary/5 p-3 text-sm text-secondary"
          >
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
            />
            <span>
              I accept the{" "}
              <Link
                to="/terms"
                className="text-primary font-bold hover:underline"
              >
                Terms and Conditions
              </Link>{" "}
              for this educational simulation.
            </span>
          </label>
          <Link className="text-primary hover:underline" to="/signup">
            Don't have an account?{" "}
            <span className="font-semibold">Sign up</span>
          </Link>
          <button
            type="submit"
            disabled={!canLogin}
            className={
              canLogin
                ? `cursor-pointer group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-[background-color,box-shadow,transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 enabled:hover:bg-primary/90 enabled:hover:shadow-inner enabled:active:translate-y-px`
                : `cursor-not-allowed group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary/20 transition-[background-color,box-shadow,transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 opacity-80`
            }
          >
            Login
            <RightArrowIcon className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
