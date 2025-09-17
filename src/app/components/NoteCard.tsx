"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

function NoteCard({ id }: { id: Id<"notes"> }) {
  const note = useQuery(api.notes.getNote, { id });

  return (
    <Link
      href={`/notes/${id}`}
      className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-100"
    >
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {note?.title}
      </h3>
      <h4 className="mb-2 font-bold tracking-tight text-gray-900">
        By: {note?.author}
      </h4>
      <p className="font-normal text-gray-700">{note?.content}</p>
      <p className="mt-1 font-normal text-gray-700">
        {new Date(note?._creationTime || "").toLocaleDateString()}
      </p>
    </Link>
  );
}

export default NoteCard;
