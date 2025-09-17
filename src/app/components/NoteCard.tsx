"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

function NoteCard({ id }: { id: Id<"notes"> }) {
  const note = useQuery(api.notes.getNote, { id });

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{note?.title}</div>
        <p className="text-base text-gray-700">{note?.content}</p>
      </div>
    </div>
  );
}

export default NoteCard;
