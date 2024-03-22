import {
  EllipsisHorizontalIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { editExercise, removeExercise } from "../lib/features/timer/timerSlice";
import { toast } from "sonner";

interface ExerciseProps {
  exercise: any;
}

export function Exercise({ exercise }: ExerciseProps) {
  const status = useAppSelector((state) => state.timer.status);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);

  const saveEdits = () => {
    setEditMode(false);

    dispatch(editExercise({ name: "Prepare", time: 15 }));

    toast.success("Exercise updated");
  };

  const getExerciseIcon = (status: string) => {
    if (status === "pending") {
      return (
        <span
          className={clsx(
            "bg-gray-500",
            "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
          )}
        >
          <EllipsisHorizontalIcon
            className="h-5 w-5 text-white"
            aria-hidden="true"
          />
        </span>
      );
    } else if (status === "current") {
      return (
        <span
          className={clsx(
            "bg-secondary",
            "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
          )}
        >
          <EllipsisHorizontalIcon
            className="h-5 w-5 text-black"
            aria-hidden="true"
          />
        </span>
      );
    } else if (status === "complete") {
      return (
        <span
          className={clsx(
            "bg-primary",
            "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
          )}
        >
          <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    }
  };

  return (
    <div className="relative flex space-x-3 sm:px-0 px-6">
      <div>{getExerciseIcon(exercise.status)}</div>
      <div className="flex min-w-0 flex-1 sm:flex-row flex-col">
        <div>
          {editMode ? (
            <input
              type="text"
              className="border-2 border-black rounded-md focus:ring-0"
              value={exercise.name}
              onChange={(e) =>
                dispatch(
                  editExercise({
                    id: exercise.id,
                    name: e.target.value,
                    time: exercise.time,
                  })
                )
              }
            />
          ) : (
            <p className="text-md ml-1.5">{exercise.name}</p>
          )}
        </div>
        <div className="flex-1 space-x-2 sm:mt-0 mt-4 flex flex-row justify-start sm:justify-end">
          {status !== "running" && (
            <>
              <div>
                {editMode ? (
                  <Button
                    onClick={() => saveEdits()}
                    thickness="sm"
                    variant="primary"
                    size="sm"
                  >
                    <CheckIcon className="h-4 w-4 text-black" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setEditMode(true)}
                    thickness="sm"
                    variant="white"
                    size="sm"
                  >
                    <PencilIcon className="h-4 w-4 text-black" />
                  </Button>
                )}
              </div>
              <div>
                <Button
                  onClick={() => {
                    dispatch(removeExercise(exercise.id));
                    toast.success("Exercise removed");
                  }}
                  thickness="sm"
                  variant="danger"
                  size="sm"
                >
                  <TrashIcon className="h-4 w-4 text-black" />
                </Button>
              </div>
            </>
          )}

          <div className="whitespace-nowrap text-right text-sm ">
            {editMode ? (
              <input
                type="number"
                className="border-2 border-black rounded-md focus:ring-0 max-w-[70px]"
                value={exercise.time}
                onChange={(e) =>
                  dispatch(
                    editExercise({
                      id: exercise.id,
                      name: exercise.name,
                      time: parseInt(e.target.value),
                    })
                  )
                }
              />
            ) : (
              <Badge
                variant={
                  exercise.status === "pending" ? "lightsecondary" : "primary"
                }
              >
                {status !== "idle" && exercise.elapsedTime + " / "}
                {exercise.time}s
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
