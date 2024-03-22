"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { StartButton } from "../components/StartButton";
import { addExercise, resetTimer } from "../lib/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { Exercise } from "./Exercise";

export function ExerciseFeed() {
  const dispatch = useAppDispatch();
  const { exercises, status } = useAppSelector((state) => state.timer);
  const [resetAudio, setResetAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setResetAudio(new Audio("/reset.mp3"));
  }, []);

  const handleReset = () => {
    dispatch(resetTimer());

    if (resetAudio) {
      resetAudio.play();
    }
  };

  return (
    <div className="flow-root sm:max-w-lg justify-center mx-auto space-y-8">
      <ul role="list" className="-mb-8">
        {exercises.map((exercise, exerciseIdx) => (
          <li key={exercise.id}>
            <div className="relative pb-8">
              {exerciseIdx !== exercises.length - 1 ? (
                <span
                  className="absolute left-4 top-4 sm:-ml-px h-full w-0.5 bg-gray-500 mx-6"
                  aria-hidden="true"
                />
              ) : null}
              <Exercise exercise={exercise} />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row justify-center sm:space-y-0 space-y-4 sm:space-x-4 items-center">
        {status === "idle" && (
          <Button
            onClick={() => dispatch(addExercise())}
            variant="secondary"
            startIcon={<PlusIcon className="h-5 w-5" />}
          >
            Add Stretch
          </Button>
        )}

        <StartButton />
        {status !== "idle" && (
          <Button
            variant="info"
            size="sm"
            onClick={() => handleReset()}
            startIcon={<ArrowPathIcon className="h-5 w-5" />}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
