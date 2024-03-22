import { createSlice } from "@reduxjs/toolkit";
import storage from "../../../utils/storage";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    name: "New Routine",
    status: "idle", // "paused" | "running" | "idle"
    totalTimeInSeconds: 15,
    totalExercises: 1,
    exercises: [
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
    ],
  },
  reducers: {
    setRoutineName: (state, action) => {
      state.name = action.payload;
      storage.setRoutineName(action.payload);
    },
    setExercises: (state, action) => {
      state.exercises = action.payload;
      // Update total time
      state.totalTimeInSeconds = state.exercises.reduce(
        (acc, exercise) => acc + exercise.time,
        0
      );

      // Update total exercises
      state.totalExercises = state.exercises.length;
    },
    addExercise: (state) => {
      state.exercises.push({
        id: uuid(),
        name: "New Stretch",
        time: 30,
        elapsedTime: 0,
        type: "prepare",
        status: "pending",
        inchesCm: 0,
        intensity: "",
      });

      // Add exercise to storage
      storage.setExercises(state.exercises);

      // Update total time
      state.totalTimeInSeconds = state.exercises.reduce(
        (acc, exercise) => acc + exercise.time,
        0
      );

      // Update total exercises
      state.totalExercises = state.exercises.length;
    },
    addExerciseMetadata: (state, action) => {
      const exercise = state.exercises.find(
        (exercise) => exercise.id === action.payload.id
      );
      if (exercise) {
        exercise.intensity = action.payload.intensity;
        exercise.inchesCm = action.payload.inchesCm;
      }
    },
    editExercise: (state, action) => {
      const exercise = state.exercises.find(
        (exercise) => exercise.id === action.payload.id
      );
      if (exercise) {
        exercise.name = action.payload.name;
        exercise.time = action.payload.time;
      }

      // Update storage
      storage.setExercises(state.exercises);

      // Update total time
      state.totalTimeInSeconds = state.exercises.reduce(
        (acc, exercise) => acc + exercise.time,
        0
      );
    },
    removeExercise: (state, action) => {
      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== action.payload
      );

      // Update storage
      storage.setExercises(state.exercises);

      // Update total time
      state.totalTimeInSeconds = state.exercises.reduce(
        (acc, exercise) => acc + exercise.time,
        0
      );

      // Update total exercises
      state.totalExercises = state.exercises.length;
    },
    startTimer: (state) => {
      if (state.exercises.length > 0) {
        state.exercises[0]!.status = "current";
        state.status = "running";
      }
    },
    tick: (state) => {
      console.log("TICKING IN REDUX FN");

      const currentExercise = state.exercises.find(
        (exercise) => exercise.status === "current"
      );
      if (currentExercise && state.status === "running") {
        currentExercise.elapsedTime += 1;

        // Check if exercise is complete
        if (currentExercise.elapsedTime >= currentExercise.time) {
          currentExercise.status = "complete";

          // Find the next pending exercise
          const nextExerciseIndex = state.exercises.findIndex(
            (exercise) => exercise.status === "pending"
          );

          if (nextExerciseIndex !== -1) {
            state.exercises[nextExerciseIndex]!.status = "current";
          } else {
            state.status = "idle";
            state.exercises.forEach((exercise) => {
              exercise.status = "pending";
              exercise.elapsedTime = 0;
            });
            toast.success("Routine complete");
          }
        }
      }
    },
    pauseTimer: (state) => {
      state.status = "paused";
      toast.info("Timer paused");
    },
    resetTimer: (state) => {
      state.status = "idle";
      state.exercises.forEach((exercise) => {
        exercise.status = "pending";
        exercise.elapsedTime = 0;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRoutineName,
  setExercises,
  addExercise,
  editExercise,
  removeExercise,
  startTimer,
  tick,
  pauseTimer,
  resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
