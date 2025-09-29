"use client";

import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import EditNoteForm from "@/app/components/EditNoteForm";

function EditNote() {
  const params = useParams();
  const id = params.id as Id<"notes">;

  // return <EditNoteForm id={id} />;
  return <>Hello</>;
}

export default EditNote;
