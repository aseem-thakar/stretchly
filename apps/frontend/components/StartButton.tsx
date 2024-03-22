"use client";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { TimerContainer } from "../app/TimerContainer";
import { pauseTimer, startTimer } from "../lib/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { Button } from "./Button";
import { useEffect, useState } from "react";

export function StartButton() {
  const state = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  const [startAudio, setStartAudio] = useState<HTMLAudioElement | null>(null);
  const [pauseAudio, setPauseAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setStartAudio(new Audio("/start.mp3"));
    setPauseAudio(new Audio("/pause.mp3"));
  }, []);

  const handlePause = () => {
    dispatch(pauseTimer());

    if (pauseAudio) {
      setStartAudio(new Audio("/start.mp3"));
      pauseAudio.play();
    }
  };

  const handleStart = () => {
    dispatch(startTimer());
    if (startAudio) {
      setPauseAudio(new Audio("/pause.mp3"));
      startAudio.play();
    }
  };

  return (
    <>
      {state.status === "running" ? (
        <Button
          variant="black"
          onClick={() => handlePause()}
          startIcon={<PauseIcon className="h-5 w-5" />}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Pause
        </Button>
      ) : (
        <Button
          variant="black"
          onClick={() => handleStart()}
          startIcon={<PlayIcon className="h-5 w-5" />}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Start
        </Button>
      )}
      {state.status === "running" && <TimerContainer />}
    </>
  );
}
