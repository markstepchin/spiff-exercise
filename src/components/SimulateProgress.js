import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

const INITIAL_LOADING_TIME = 1;
const HANGING_BREAKPOINT = 90;
const SECONDS_SHOWN_AFTER_LOADED = 3;

const LOADING_STATE = {
  NOT_STARTED: "NOT_STARTED",
  LOADING: "LOADING",
  COMPLETE: "COMPLETE",
};

const SimulateProgressBar = () => {
  let interval = useRef(null);
  const [seconds, setSeconds] = useState(INITIAL_LOADING_TIME);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(LOADING_STATE.NOT_STARTED);

  // progress bar starts at width of 0% and takes 15 seconds to reach 90%
  // width-increase/second: 90% / 15sec = 6% / sec
  const progressIncrement = HANGING_BREAKPOINT / seconds;

  useEffect(() => {
    if (loading === LOADING_STATE.LOADING) {
      // start the loader as soon as the user clicks the button, not after 1 second inside the setInterval
      setProgress(progressIncrement);

      interval = setInterval(
        () =>
          setProgress((prev) =>
            prev < HANGING_BREAKPOINT
              ? prev + progressIncrement
              : HANGING_BREAKPOINT
          ),
        1000
      );
    }

    if (loading === LOADING_STATE.COMPLETE) {
      setProgress(100);

      setTimeout(() => {
        clearInterval(interval);
        setLoading(LOADING_STATE.NOT_STARTED);
        setProgress(0);
      }, [SECONDS_SHOWN_AFTER_LOADED * 1000]);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const isLoading =
    loading === LOADING_STATE.LOADING ||
    loading === LOADING_STATE.NINETY_PERCENT ||
    loading === LOADING_STATE.COMPLETE;

  return (
    <div>
      <div className="simulate-request">
        <h3>Simulate Request</h3>
        <label
          title={isLoading ? "Disabled while loading" : ""}
          className={isLoading ? "disabled" : ""}
        >
          Load Time (seconds):
          <input
            value={seconds}
            type="number"
            min="1"
            onChange={(e) => setSeconds(e.target.value)}
            disabled={isLoading}
          />
        </label>

        <div>
          <button
            className="button start"
            disabled={isLoading}
            onClick={() => setLoading(LOADING_STATE.LOADING)}
          >
            {isLoading ? "loading..." : "start request"}
          </button>

          {isLoading && (
            <button
              className="button end"
              onClick={() => setLoading(LOADING_STATE.COMPLETE)}
              disabled={loading === LOADING_STATE.COMPLETE}
            >
              finish request
            </button>
          )}
        </div>
      </div>

      {isLoading ? <ProgressBar progress={progress} /> : null}

      {loading === LOADING_STATE.COMPLETE && (
        <i>progress bar will disappear in 3 seconds</i>
      )}
    </div>
  );
};

export default SimulateProgressBar;
