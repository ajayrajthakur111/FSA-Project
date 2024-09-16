import "./ToastComponent.css";
import React, { useEffect, useState } from "react";
import { Portal } from "@reach/portal";
import { CrossIcon } from "../icons/CrossIcon";
interface ToastCompnentProps {
  message: string;
  duration?: number;
  type?: "success" | "warning" | "error";
  warning?: string;
}

export const ToastCompnent: React.FC<ToastCompnentProps> = ({
  message,
  duration = 2000,
  type = "success",
  warning,
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = 100;
    const increment = (100 / duration) * interval;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, [duration]);
  return (
    <>
      {progress !== 100 ? (
        <Portal>
          <div
            className={`success-notification success-notification-container ${
              type === "error" && "error-notification-container"
            }`}  style={warning ? { left: "40vw", top: "10px" } : {}}
          >
            <div className="icon">
              {type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="checkmark-icon"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <CrossIcon />
              )}
            </div>
            <span className={`message ${type === "error" && "error-message"}`} >
              {message}
            </span>
            <div className="progress-bar-container" 
            >
              <div
                className={`progress-bar ${
                  type === "error"
                    ? "progress-bar-error"
                    : type === "warning"
                    ? "progress-bar-warning"
                    : ""
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};
