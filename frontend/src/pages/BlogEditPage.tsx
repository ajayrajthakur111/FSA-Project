// src/components/BlogEditPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBlog, clearSelectedBlog } from "../redux/slices/blogSlice";
import "./BlogEditPage.css";
import { RootState } from "../redux/store/store";
import { ToastCompnent } from "../toast/ToastComponent";
import { setToastActive } from "../redux/slices/toastSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BlogEditPage: React.FC = () => {
  const { isToastComponentActive } = useSelector(
    (state: RootState) => state.toastInfo
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [lockStatus, setLockStatus] = useState("");
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.auth.username);
  console.log(username);
  const fetchBlogDetail = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/blogs/${id}?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        dispatch(setToastActive(true));
        setTimeout(() => {
          dispatch(setToastActive(false));
          navigate("/blogs");
        }, 1000);
        throw new Error("Failed to fetch the blog details");
      }

      const data = await response.json();
      dispatch(selectBlog(data.blog));
      setContent(data.blog.content);
      setLockStatus(data.blog.isLocked ? "Locked" : "Unlocked");
      if (data.blog.isLocked) {
        setRemainingTime(30 * 60);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      console.error("Failed to fetch blog detail", error);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
    return () => {
      dispatch(clearSelectedBlog());
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 2000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [remainingTime]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/blogs/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, content, username }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the blog");
      }

      navigate(`/blogs`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <>
      {isToastComponentActive ? (
        <ToastCompnent
          message="SomeOne is already perfoming operation on this blog"
          type="error"
          warning="warning"
        />
      ) : (
        <div className="blog-edit-container">
          <h2 className="blog-edit-header">Edit Blog - {lockStatus}</h2>
          {lockStatus === "Locked" && remainingTime > 0 ? (
            <p>
              Data is locked for {formatTime(remainingTime)}. Only you can edit.
            </p>
          ) : (
            <></>
          )}

          <textarea
            className="blog-edit-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            readOnly={lockStatus !== "Locked" && remainingTime > 0}
          />
          <button className="blog-edit-button" onClick={handleSave}>
            Save
          </button>
          {error && <p className="blog-edit-error">{error}</p>}
        </div>
      )}
    </>
  );
};
