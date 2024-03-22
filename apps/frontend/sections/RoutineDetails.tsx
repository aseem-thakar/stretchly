"use client";
import { ClockIcon, PencilIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../components/Button";
import { setExercises, setRoutineName } from "../lib/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import storage from "../utils/storage";

export function RoutineDetails() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { name, status, totalExercises, totalTimeInSeconds } = useAppSelector(
    (state) => state.timer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get routine name from storage
    const routineName = storage.getRoutineName();

    if (routineName) {
      dispatch(setRoutineName(routineName));
    }

    // Update exercises (and total time + total exercises)
    const exercises = storage.getExercises();
    dispatch(setExercises(exercises));
  }, []);

  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: name ?? "",
    },
  });

  const onSubmit = (data: { name: string }) => {
    try {
      dispatch(setRoutineName(data.name));
      toast.success("Routine name saved");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save routine name");
    }
  };

  return (
    <div className="mx-auto text-center justify-center my-8 space-y-8">
      <div className="flex flex-col items-center mx-auto">
        {editMode ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
              setEditMode(false);
            }}
            className="h-[60px] flex flex-row items-center justify-between w-full max-w-xl bg-white border-4 border-black rounded-full"
          >
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full p-2 px-4 mx-4 border-none focus:ring-0 placeholder:text-black"
            />
            <Button type="submit" className="h-[60px] -m-1" variant="primary">
              Save
            </Button>
          </form>
        ) : (
          <div className="sm:px-0 px-6 flex sm:flex-row flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <h1 className="text-xl sm:text-3xl font-bold">{name}</h1>
            {status !== "running" && (
              <Button
                onClick={() => setEditMode(true)}
                thickness="sm"
                variant="white"
                size="md"
              >
                <PencilIcon className="h-4 w-4 text-black" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center space-x-8 justify-center">
        <div className="flex flex-row items-center">
          <ClockIcon className="h-5 w-5 mr-1.5" />
          <span>{totalTimeInSeconds}s</span>
        </div>
        <div className="flex flex-row items-center">
          <TrophyIcon className="h-5 w-5 mr-1.5" />
          {totalExercises} Stretches
        </div>
      </div>
    </div>
  );
}
