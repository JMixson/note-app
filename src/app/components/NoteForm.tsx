"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  author: string;
  content: string;
};

function NoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSumbit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSumbit)}>
      <label>
        <span className="text-sm font-medium text-gray-700"> Title </span>

        <input
          {...register("title", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
        />
        {errors.title && <span>This field is required</span>}
      </label>

      <label>
        <span className="text-sm font-medium text-gray-700"> Author </span>

        <input
          {...register("author", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
        />
        {errors.author && <span>This field is required</span>}
      </label>

      <label>
        <span className="text-sm font-medium text-gray-700"> Notes </span>

        <textarea
          {...register("content", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
          rows={4}
        ></textarea>
        {errors.content && <span>This field is required</span>}
      </label>

      <div className="mt-1.5 flex items-center justify-end gap-2">
        <button
          type="reset"
          className="rounded border border-transparent px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:cursor-pointer hover:text-gray-900"
        >
          Clear
        </button>

        <button
          type="submit"
          className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-100"
        >
          Save Note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
