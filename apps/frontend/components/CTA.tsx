import { SubscribeForm } from "./SubscribeForm";

export default function CTA() {
  return (
    <div className="bg-lightprimary">
      <div className="py-12 mx-auto max-w-7xl sm:px-6 sm:py-16 lg:px-8">
        <div className="relative px-6 py-24 space-y-8 overflow-hidden text-center border-4 border-b-8 border-black shadow-2xl bg-primary isolate rounded-3xl sm:px-16">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight sm:text-4xl">
            Subscribe for the latest updates to Stretchly
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-md sm:text-lg leading-8">
            Just enter your email below and you'll get notified when Stretchly
            has updates (no spam, I promise).
          </p>
          <div className="flex flex-col items-center mx-auto">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
