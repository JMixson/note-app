"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoteCard from "./NoteCard";

function NoteList() {
  const notes = useQuery(api.notes.get);

  return (
    <>
      <h2 className="text-3xl font-bold">Notes</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {notes?.map(({ _id }) => (
          <NoteCard key={_id} id={_id} />
        ))}
      </div>
    </>
  );
}

export default NoteList;
