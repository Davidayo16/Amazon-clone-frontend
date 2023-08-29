import React from "react";

const LazyLoading = () => {
  return (
    <div className="lazy">
      <div
        class="spinner-grow"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LazyLoading;
