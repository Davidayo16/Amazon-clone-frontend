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
const Blog = () => {
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
      <div className="blog-banner">
        <div>
          <h2>#Readmore</h2>
          <p>Read all case studies about our products</p>
        </div>
      </div>
      <BreadCrumb title="Blog" />
      <div className="blog-wrpper py-2">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-12">
              <div className="row d-flex justify-content-center align-items-center flex-column">
                {blogs?.map((blog) => {
                  const dateString = blog?.createdAt;
                  const dateObj = new Date(dateString);
                  const day = dateObj.getUTCDate();
                  const month = dateObj.getUTCMonth();
                  const year = dateObj.getUTCFullYear();
                  const formattedDate = `${day} ${monthNames[month]} ${year}`;
                  return (
                    <div className="col-12 col-sm-12  mb-5">
                      <div className="blog-card d-lg-flex justify-content-center align-items-center ">
                        <div className="blog-card-img w-md-50 w-100">
                          <img src={blog?.image} className="img-fluid" />
                        </div>
                        <div className="blog-content w-md-50 w-100">
                          <h3 className="fs-4"> {blog?.title}</h3>
                          <p className="dim">{blog?.description}</p>
                          <p className="dim">{formattedDate}</p>

                          <h3>
                            views: <span>{blog?.numViews}</span>
                          </h3>
                          <Link to={`/blogDetail/${blog?._id}`}>
                            <button
                              className=" d-flex gap-55 justify-content-center
                                    align-items-center  mt-4"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
