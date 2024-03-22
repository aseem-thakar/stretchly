"use client";
import { v4 as uuid } from "uuid";

const storagePrefix = "stretchly_";

const storage = {
  getRoutineName: () => {
    const routineName = window.localStorage.getItem(
      `${storagePrefix}routine_name`
    );

    if (!routineName) {
      return null;
    }

    return JSON.parse(routineName) as string;
  },
  setRoutineName: (name: string) => {
    window.localStorage.setItem(
      `${storagePrefix}routine_name`,
      JSON.stringify(name)
    );
  },
  getExercises: () => {
    const exercises = window.localStorage.getItem(`${storagePrefix}exercises`);

    if (!exercises) {
      return [
        {
          id: uuid(),
          name: "Prepare",
          time: 15,
          elapsedTime: 0,
          type: "prepare",
          status: "pending",
          inchesCm: 0,
          intensity: "",
        },
      ];
    }

    return JSON.parse(exercises) as any[];
  },
  setExercises: (exercises: any[]) => {
    window.localStorage.setItem(
      `${storagePrefix}exercises`,
      JSON.stringify(exercises)
    );
  },
};

export default storage;
