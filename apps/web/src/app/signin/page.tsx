export default function Example() {
  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Dooctoor tech"
            src="/logo2.png"
            className="mx-auto h-10 w-auto dark:hidden"
          />
          <img
            alt="Dooctoor tech"
            src="/logo2.png"
            className="not-dark:hidden mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="focus:outline-brand dark:focus:outline-brand block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="focus:outline-brand dark:focus:outline-brand block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="checked:border-brand checked:bg-brand indeterminate:border-brand indeterminate:bg-brand focus-visible:outline-brand dark:checked:border-brand dark:checked:bg-brand dark:indeterminate:border-brand dark:indeterminate:bg-brand dark:focus-visible:outline-brand col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 dark:border-white/10 dark:bg-white/5 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25 pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-has-checked:opacity-100 opacity-0"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-has-indeterminate:opacity-100 opacity-0"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="remember-me"
                    className="block text-sm/6 text-gray-900 dark:text-white"
                  >
                    Recordarme
                  </label>
                </div>

                <div className="text-sm/6">
                  <a
                    href="#"
                    className="text-brand hover:text-brand-hover dark:text-brand dark:hover:text-brand-hover font-semibold"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="shadow-xs bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:outline-brand dark:bg-brand dark:hover:bg-brand-hover dark:focus-visible:outline-brand flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            <div>
              <div className="mt-10 flex items-center gap-x-6">
                <div className="w-full flex-1 border-t border-gray-200 dark:border-white/10" />
                <p className="text-nowrap text-sm/6 font-medium text-gray-900 dark:text-white">
                  O continúa con
                </p>
                <div className="w-full flex-1 border-t border-gray-200 dark:border-white/10" />
              </div>

              <div className="mt-6">
                <a
                  href="#"
                  className="shadow-xs inset-ring inset-ring-gray-300 focus-visible:inset-ring-transparent dark:inset-ring-white/5 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:hover:bg-white/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-sm/6 font-semibold">Google</span>
                </a>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
            ¿No eres miembro?{" "}
            <a
              href="#"
              className="text-brand hover:text-brand-hover dark:text-brand dark:hover:text-brand-hover font-semibold"
            >
              Comienza una prueba gratuita de 14 días
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
