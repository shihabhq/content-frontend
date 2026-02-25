import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-center lg:gap-12">
          {/* Left: text statement */}
          <div className="-w-0">
            <p className="text-base font-sans sm:text-2xl text-gray-800 leading-relaxed font-semibold text-center mx-auto max-w-md">
              This is a project implemented under the{" "}
              <Link href="https://ddisouthasia.org/" className="underline">
                <br /> DDI South Asia
              </Link>{" "}
              initiative.
            </p>
          </div>

          {/* Right: partner logos row */}
          <div className="flex flex-1 items-center justify-center lg:justify-end">
            <img
              src="/footer/partners.png"
              alt="CIVICUS, ADI South Asia, Accountability Lab, Kashful Foundation, Artivism for Democracy"
              width={500}
              height={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
