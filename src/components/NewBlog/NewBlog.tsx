import React from "react";
import "../NewBlog/NewBlog.css";
import InputGroups from "../InputGroups/InputGroups";
import { ImageProps } from "../Blogs/Blogs";

type NewBlogProps = {
  name: string;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  date?: string;
  onChangeDate?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image: string;
  onChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  content?: string;
  onChangeContent?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  category: string;
  onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  author: string;
  onChangeAuthor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitNewBlog?: (event: React.FormEvent<HTMLFormElement>) => void;
  onBlurName?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isErrorName?: boolean;
  onBlurCategory?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isErrorCategory?: boolean;
  onBlurAuthor?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isErrorAuthor?: boolean;
  editBlog?: boolean;
  images: Array<ImageProps>;
  onClickAddImage?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onclickDeleteImage?: any;
  isErrorImage?: boolean;
  onBlurImage?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const NewBlog: React.FC<NewBlogProps> = ({
  name,
  onChangeName,
  date,
  onChangeDate,
  image,
  onChangeImage,
  content,
  onChangeContent,
  category,
  onChangeCategory,
  author,
  onChangeAuthor,
  onSubmitNewBlog,
  onBlurName,
  isErrorName,
  onBlurCategory,
  isErrorCategory,
  onBlurAuthor,
  isErrorAuthor,
  editBlog,
  images,
  onClickAddImage,
  onclickDeleteImage,
  isErrorImage,
  onBlurImage,
}) => {
  return (
    <form onSubmit={onSubmitNewBlog} className="newBlog-form">
      <h2>{editBlog ? "Edit blog" : "Add new blog"}</h2>
      <InputGroups
        type="text"
        value={name}
        onChange={onChangeName}
        placeholder="Name"
        labelTitle="Name"
        onBlur={onBlurName}
        isError={isErrorName}
        isErrorTitle="Name is required"
      />
      <InputGroups
        type="date"
        value={date}
        onChange={onChangeDate}
        placeholder="Date"
        labelTitle="Date"
      />
      <>
        <div className="newBlog-images-wrapper">
          <div className="newBlog-images-container">
            {images.length !== undefined &&
              images?.map((i) => {
                return (
                  <p
                    key={i.id}
                    className="newBlog-images-content"
                    style={{ backgroundImage: `url(${i.image})` }}
                  >
                    <img src={i.image} alt={i.image} />
                    <i
                      className="fas fa-trash-alt delete-img"
                      onClick={() => onclickDeleteImage(i.id)}
                      title="Delete"
                    ></i>
                  </p>
                );
              })}
          </div>
        </div>
        <div>
          <InputGroups
            type="text"
            value={image}
            onChange={onChangeImage}
            placeholder="https://image.com/500x300"
            labelTitle="Image URL"
            onBlur={onBlurImage}
            isError={isErrorImage}
            isErrorTitle="Please add a minimum 2 images"
          />
          <button
            disabled={image === ""}
            onClick={onClickAddImage}
            className={
              image !== ""
                ? "newBLog-btn-AddImage"
                : "newBLog-btn-AddImage isDisabled"
            }
          >
            Add Image
          </button>
        </div>
      </>
      <div className="newBlog-input-group">
        <label>
          <strong>Content</strong>
        </label>
        <textarea
          value={content}
          onChange={onChangeContent}
          className="newBlog-textarea"
          placeholder="Content"
          rows={4}
        />
      </div>
      <InputGroups
        type="text"
        value={category}
        onChange={onChangeCategory}
        placeholder="Category"
        labelTitle="Category"
        onBlur={onBlurCategory}
        isError={isErrorCategory}
        isErrorTitle="Category is required"
      />
      <InputGroups
        type="text"
        value={author}
        onChange={onChangeAuthor}
        placeholder="Author"
        labelTitle="Author"
        onBlur={onBlurAuthor}
        isError={isErrorAuthor}
        isErrorTitle="Author is required"
      />
      <button type="submit" className="newBlog-btn-submit">
        {editBlog ? "EDIT" : "SUBMIT"}
      </button>
    </form>
  );
};

export default NewBlog;
