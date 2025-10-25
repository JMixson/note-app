"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type NoteInputs } from "@/types";

function NoteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteInputs>({
    defaultValues: {
      title: "",
      isPrivate: true,
      content: "",
    },
  });

  const createNote = useMutation(api.notes.createNote);

  const onSumbit: SubmitHandler<NoteInputs> = async (data) => {
    try {
      await createNote(data);
      console.log("Note Created");

      reset();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSumbit)} className="w-full">
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
        <input
          type="checkbox"
          {...register("isPrivate", { required: true })}
          className="mr-2 size-5 rounded border-gray-300 accent-teal-600 shadow-sm"
        />

        <span className="text-sm font-bold text-gray-700">Private Note</span>

        <div className="mt-0.5 h-2">
          {errors.isPrivate && (
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
          {errors.content && (
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
          Save Note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
