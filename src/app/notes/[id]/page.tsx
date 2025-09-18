"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

function SingleNotePage() {
  const params = useParams();
  const id = params.id as Id<"notes">;
  const note = useQuery(api.notes.getNote, { id });

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {note?.title}
      </h1>
      <h2 className="mb-2 font-bold tracking-tight text-gray-900">
        By: {note?.author}
      </h2>
      <p className="mt-1 font-normal text-gray-700">
        {new Date(note?._creationTime || "").toLocaleDateString()}
      </p>
      <p className="font-normal text-gray-700">{note?.content}</p>
    </>
  );
}

export default SingleNotePage;
