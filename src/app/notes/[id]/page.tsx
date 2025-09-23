"use client";

import { useParams, redirect } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

function SingleNotePage() {
  const params = useParams();
  const id = params.id as Id<"notes">;
  const note = useQuery(api.notes.getNote, { id });
  const deleteNote = useMutation(api.notes.deleteNote);

  async function handleDelete() {
    const confirmation = confirm("Note will be deleted. Are you sure?");

    if (confirmation) {
      await deleteNote({ id });
      redirect("/");
    }
  }

  return (
    <div className="mx-auto w-2/3">
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

      <div className="mt-6 inline-flex">
        <button className="cursor-pointer rounded-l-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50">
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="-ml-px cursor-pointer rounded-r-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-red-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleNotePage;
