export function Header() {
  return (
    <header className="flex flex-col items-center text-center sm:items-start justify-center">
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        Welcome to <span className="text-blue-600">Todo</span> App
      </h1>

      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        Manage your tasks efficiently with our simple and intuitive interface.
      </p>
    </header>
  );
}
