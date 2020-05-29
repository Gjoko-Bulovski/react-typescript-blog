import React from "react";
import "../BlogSidebar/BlogSidebar.css";
import { BlogProps } from "../Blogs/Blogs";
import DropDown from "../DropDown/DropDown";
import "../DropDown/DropDown.css";

type BlogSidebarProps = {
  blogs: Array<BlogProps>;
  category: string;
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  author: string;
  onChangeAuthor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleAuthor: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  showAuthorDropDown: boolean;
  handleAuthorBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  blogs,
  category,
  onChangeCategory,
  author,
  onChangeAuthor,
  handleToggleAuthor,
  showAuthorDropDown,
  handleAuthorBlur,
}) => {
  //getUnique
  const getUnique = (arr: any, comp: any) => {
    const unique = arr
      //store the comparison values in array
      .map((e: any) => e[comp])
      // store the keys of the unique objects
      .map((e: any, i: number, final: any) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);
    return unique;
  };
  let uniqueCategory = getUnique(blogs, "category");
  let uniqueAuthor = getUnique(blogs, "author");

  return (
    <aside>
      <div className="blog-sidebar">
        <div className="blog-sidebar-select-group">
          <label>
            <strong>Category</strong>
          </label>
          <select
            value={category}
            onChange={onChangeCategory}
            className="blog-sidebar-select"
          >
            {uniqueCategory.map((blog: any) => {
              return (
                <option
                  key={blog.id}
                  value={blog.category}
                  style={{ textTransform: "capitalize" }}
                >
                  {blog.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="blog-sidebar-select-group">
          <label>
            <strong>Author</strong>
          </label>
          <DropDown
            value={author}
            handleToggleAuthor={handleToggleAuthor}
            show={showAuthorDropDown}
            handleBlur={handleAuthorBlur}
          >
            {uniqueAuthor.map((blog: any) => {
              return (
                <li key={blog.id} className="option">
                  <label>
                    <input
                      type="radio"
                      name="author"
                      value={blog.author}
                      onChange={onChangeAuthor}
                      defaultChecked={blog.author === "all"}
                    />
                    <p>{blog.author}</p>
                  </label>
                </li>
              );
            })}
          </DropDown>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
