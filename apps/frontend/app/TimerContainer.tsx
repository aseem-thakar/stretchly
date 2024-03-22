"use client";
import { useEffect } from "react";
import { tick } from "../lib/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export function TimerContainer() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.timer);

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.status !== "running") {
        clearInterval(timer);
      } else {
        dispatch(tick());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status]);

  return <></>;
}
