import React from "react";

const Category = ({
  category,
  activeCategory,
  setActiveCategory,
  setCategory,
}) => {
  const handleClick = () => {
    setActiveCategory(category._id);
    setCategory(category._id);
  };
  return (
    <div className="category">
      <h4
        className={category?._id === activeCategory ? "catActive" : ""}
        onClick={handleClick}
      >
        {category?.name}
      </h4>
      {category?.children && (
        <ul className="ps-0 i">
          {category?.children?.map((child) => (
            <li key={child?._id}>
              <Category
                category={child}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setCategory={setCategory}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
