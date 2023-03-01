import React from "react";
import Exercise from "../exercise/Exercise";
import SimulateProgressBar from "../components/SimulateProgress";

const ProgressBarExercise = () => (
  <div className="progress-bar-exercise">
    <Exercise
      solution={<SimulateProgressBar />}
      specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
      title="Progress Bar Exercise"
    />
  </div>
);

export default ProgressBarExercise;
