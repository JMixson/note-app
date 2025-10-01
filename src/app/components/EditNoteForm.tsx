"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { type Inputs } from "@/types";

function EditNoteForm({ id }: { id: Id<"notes"> }) {
  const router = useRouter();
  const note = useQuery(api.notes.getPublicNoteById, { id });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: note?.title,
      content: note?.content,
    },
  });

  const editNote = useMutation(api.notes.editNote);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await editNote({ id, update: data });
      console.log("Note edited");

      reset();
      router.push(`/notes/${id}`);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <form key={note?._id} onSubmit={handleSubmit(onSubmit)} className="w-96">
      <label className="mb-4 block">
        <span className="text-sm font-bold text-gray-700"> Title </span>

        <input
          {...register("title", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
        />
        <div className="mt-0.5 h-2">
          {errors.title && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </label>

      <label className="mb-4 block">
        <span className="text-sm font-bold text-gray-700">Note Visibility</span>

        <select
          {...register("isPrivate", { required: true })}
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        >
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
        <div className="mt-0.5 h-2">
          {errors.title && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </label>

      <label className="mb-4 block">
        <span className="text-sm font-bold text-gray-700"> Notes </span>

        <textarea
          {...register("content", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
          rows={4}
        ></textarea>
        <div className="mt-0.5 h-2">
          {errors.title && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </label>

      <div className="mt-1.5 flex items-center justify-end gap-2">
        <button
          type="reset"
          className="rounded border border-transparent px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:cursor-pointer hover:text-gray-900"
        >
          Clear
        </button>

        <button
          type="submit"
          className="rounded border border-gray-300 px-3 py-1.5 text-sm font-bold text-gray-900 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-100"
        >
          Edit Note
        </button>
      </div>
    </form>
  );
}

export default EditNoteForm;
