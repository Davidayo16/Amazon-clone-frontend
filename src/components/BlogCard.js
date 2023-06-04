import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import {
  FaArrowRight,
  FaEye,
  FaHeart,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, listBlogs } from "../Redux/Action/BlogAction";
import { Link } from "react-router-dom";

const BlogCard = () => {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogList);
  const { blogs } = blogList;
  console.log(blogs);
  React.useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  return (
    <>
      {blogs?.map((blog) => {
        const dateString = blog?.createdAt;
        const dateObj = new Date(dateString);
        const day = dateObj.getUTCDate();
        const month = dateObj.getUTCMonth();
        const year = dateObj.getUTCFullYear();
        const formattedDate = `${day} ${monthNames[month]} ${year}`;
        return (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3  mb-2">
            <div className="blog-card  ">
              <div className="blog-card-img w-md-50 w-100">
                <img src={blog?.image} className="img-fluid" />
              </div>
              <div className="blog-content w-md-50 w-100">
                <p className="dim">{formattedDate}</p>
                <div className="d-flex gap-55 flex-lg-row flex-column">
                  <h3>
                    views: <span>{blog?.numViews}</span>
                  </h3>
                </div>
                <h3 className="fs-6 mt-2"> {blog?.title}</h3>
                <p className="dim">{blog?.description}</p>
                <Link to={`/blogDetail/${blog?._id}`}>
                  <button
                    className=" d-flex gap-55 justify-content-center align-items-center"
                    id="me"
                  >
                    <span>Read More</span>{" "}
                    <FaArrowRight className="fs-6 arrow" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogCard;
