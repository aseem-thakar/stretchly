import { Button } from "./Button";

export function SubscribeForm() {
  return (
    <form className="h-[60px] flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-xl bg-white border-4 border-black sm:rounded-full">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        className="w-full sm:p-2 sm:px-4 sm:mx-4 border-none focus:ring-0 placeholder:text-black"
      />
      <Button
        href="https://tally.so/r/3XDYYj"
        type="submit"
        className="h-[60px] mt-8 sm:-m-1"
        variant="secondary"
      >
        Subscribe
      </Button>
    </form>
  );
}
