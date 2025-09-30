"use client";

import Link from "next/link";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoteCard from "../components/NoteCard";

function NotesPage() {
  const loadAmount = 8;
  const { results, status, loadMore } = usePaginatedQuery(
    api.notes.paginatePublicNotes,
    {},
    { initialNumItems: loadAmount },
  );

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="/"
              className="block transition-colors hover:text-gray-900 dark:hover:text-white"
              aria-label="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <a
              href="/notes"
              className="block transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              All Notes
            </a>
          </li>
        </ol>
      </nav>

      <div className="my-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {results?.map(({ _id }) => (
          <NoteCard key={_id} id={_id} />
        ))}
      </div>
      <button
        onClick={() => loadMore(loadAmount)}
        disabled={status !== "CanLoadMore"}
        className="rounded border border-gray-300 px-3 py-1.5 text-sm font-bold text-gray-900 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-100 disabled:bg-gray-200"
      >
        Load More
      </button>
    </>
  );
}

export default NotesPage;
