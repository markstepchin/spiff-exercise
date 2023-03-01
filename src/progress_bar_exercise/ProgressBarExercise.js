import React from "react";
import Exercise from "../exercise/Exercise";
import ProgressBar from "../components/ProgressBar";

const ProgressBarExercise = () => (
  <div className="progress-bar-exercise">
    <Exercise
      solution={<ProgressBar progress={50} />}
      specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
      title="Progress Bar Exercise"
    />
  </div>
);

export default ProgressBarExercise;
