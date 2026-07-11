import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[26vw] font-extrabold leading-none text-outline md:text-[14rem]">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold text-cream md:text-3xl">
        This route returned <em className="font-serif italic font-normal text-ember">nothing</em>
      </h1>
      <p className="mt-4 max-w-md text-sm text-cream-dim">
        The page you&apos;re after doesn&apos;t exist — maybe it got refactored away.
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </section>
  );
}
