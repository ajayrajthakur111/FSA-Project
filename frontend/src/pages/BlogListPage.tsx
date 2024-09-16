import React, { useEffect } from "react";
import { RootState } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setBlogs } from "../redux/slices/blogSlice";
import "./BlogListPage.css"; // Import your CSS file
import Button from "../components/Button";
import { ToastCompnent } from "../toast/ToastComponent";
import { setToastActive } from "../redux/slices/toastSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BlogListPage: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isToastComponentActive } = useSelector(
    (state: RootState) => state.toastInfo
  );

  useEffect(() => {
    const fetchBlogList = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      } else {
        const response = await fetch(`${BASE_URL}/api/blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setBlogs(data));
      }
    };
    fetchBlogList();
  }, [dispatch, navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToastActive(true));
    setTimeout(() => {
      dispatch(setToastActive(false));
      navigate("/login");
    }, 1900)
 };

  return (<>
    <div className="blog-list-container">
      <h2>Blogs</h2>
      <div className="logout-button" onClick={handleLogout}>
        <Button type="submit" label="Logout" backgroundColor="red" />
      </div>

      <div className="blog-list">
        {blogs.map((elem: any, index: number) => (
            <div className="blog-card" key={elem._id}>
            <div className="blog-header">
              <div className="blog-title">{elem.title}</div>
              <Link
                to={`/blogs/${elem._id}`}
                className="edit-icon"
                aria-label="Edit Blog"
                >
                <span role="img" aria-label="edit" >
                  ✏️
                </span>
              </Link>
            </div>
            <p className="blog-content">{elem.content.substring(0, 100)}...</p>
            <p className="blog-meta">
              <strong>Last Edited By:</strong> {elem.lastEditedBy}
            </p>
          </div>
        ))}
      </div>
    </div>
    {isToastComponentActive && (
        <ToastCompnent
          message="Logout successfull"
          type="error"
        />
      )}
                  </>
  );
};
