import Link from "next/link";
import { NotepadText } from "lucide-react";

function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <NotepadText />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden font-bold md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/notes"
                  >
                    Notes
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
