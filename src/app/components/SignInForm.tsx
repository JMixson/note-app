"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type SignInInputs } from "@/types";

function SignInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      console.log(data);

      reset();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label className="mb-4 block">
        <span className="text-sm font-bold text-gray-700"> Display Name </span>

        <input
          {...register("displayName", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
        />
        <div className="mt-0.5 h-2">
          {errors.displayName && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </label>

      <label className="mb-4 block">
        <span className="text-sm font-bold text-gray-700"> Email </span>

        <input
          {...register("email", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
        />
        <div className="mt-0.5 h-2">
          {errors.email && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </label>

      <label className="mb-4 block">
        <span className="text-sm font-bold text-gray-700"> Password </span>

        <input
          {...register("password", { required: true })}
          className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
        />
        <div className="mt-0.5 h-2">
          {errors.password && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </label>

      <button
        type="submit"
        className="mt-1.5 rounded border border-gray-300 px-3 py-1.5 text-sm font-bold text-gray-900 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-100"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
