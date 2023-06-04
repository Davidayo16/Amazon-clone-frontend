import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSingleBlog } from "../Redux/Action/BlogAction";
import {
  FaArrowRight,
  FaEye,
  FaHeart,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { likeBlog, listBlogs } from "../Redux/Action/BlogAction";
import { Link } from "react-router-dom";
import Loading from "../Loading/Error/Loading";
import Message from "../Loading/Error/Error";

const BlogDetail = () => {
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const dispatch = useDispatch();
  const blogDetails = useSelector((state) => state.blogDetails);
  const { blog, loading, error } = blogDetails;
  console.log(blog);
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

  const dateString = blog?.createdAt;

  // Create a new Date object using the input string
  const dateObj = new Date(dateString);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth();
  const year = dateObj.getUTCFullYear();
  const formattedDate = `${day} ${monthNames[month]} ${year}`;
  console.log(blog);
  React.useEffect(() => {
    dispatch(listSingleBlog(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="blog-banner">
        <div>
          <h2>#Readmore</h2>
          <p>Read all case studies about our products</p>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="blog-wrapper py-2">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-12">
                <div className="row d-flex justify-content-center align-items-center flex-column">
                  <div className="col-12 col-sm-12  mb-5">
                    <div className="blog-card">
                      <div className="blog-card-img w-75">
                        <img src={blog?.image} className="img-fluid" />
                      </div>
                      <div className="blog-content w-100">
                        <p className="dim">{formattedDate}</p>

                        <h3>
                          views: <span>{blog?.numViews}</span>
                        </h3>

                        <h3 className="fs-3 mt-3"> {blog?.title}</h3>
                        <p className="fs-6">{blog?.introduction}</p>
                        <p className="fs-6">{blog?.section1}</p>
                        <p className="fs-6">{blog?.section2}</p>
                        <p className="fs-6">{blog?.section3}</p>
                        <p className="fs-6">{blog?.section4}</p>
                        <p className="fs-6">{blog?.section5}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
