import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title }) => {
  return (
    <>
      <div className="breadcrumb mb-0 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="">
                <Link to="/" className="text-dark">
                  Home
                </Link>{" "}
                <span>/</span> {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
