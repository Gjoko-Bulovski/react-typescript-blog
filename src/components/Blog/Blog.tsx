import React, { useState, useEffect } from "react";
import "../Blog/Blog.css";
import { BlogProps } from "../Blogs/Blogs";
import ImagesSlider from "../ImagesSlider/ImagesSLider";

type BtnProps = {
  onClickDeleteBlog?: any;
  onClickEditBlog?: any;
};

type OwnBlogProps = BlogProps & BtnProps;

const Blog: React.FC<OwnBlogProps> = ({
  id,
  name,
  date,
  content,
  category,
  author,
  onClickEditBlog,
  onClickDeleteBlog,
  images,
}) => {
  //imagesSlider
  //indexImage
  const [indexImage, setIndexImage] = useState<number>(0);
  // Auto slider
  let [auto, setAuto] = useState<boolean>(true);
  let [intervalTime] = useState<number>(5000);

  useEffect(() => {
    let sliderInterval: any;
    if (auto) {
      sliderInterval = setInterval(nextOnClick, intervalTime);
    }
    return () => {
      clearTimeout(sliderInterval);
    };
  }, [indexImage, auto, intervalTime]);

  //nextOnClick
  const nextOnClick = () => {
    if (images?.length !== undefined) {
      if (indexImage === images?.length - 1) {
        setIndexImage(0);
      } else {
        setIndexImage(indexImage + 1);
      }
    }
  };

  //prevOnClick
  const prevOnClick = () => {
    setIndexImage(indexImage - 1);
  };

  //onMouseEnter
  const onMouseEnter = () => {
    setAuto(false);
  };

  //onMouseLeave
  const onMouseLeave = () => {
    setAuto(true);
  };

  //onClickDot
  const onClickDot = (index: number) => {
    if (images?.length !== undefined) {
      setIndexImage(index);
    }
  };

  return (
    <article className="blog-post">
      <div className="blog-post-btn-groups">
        <button
          onClick={() =>
            onClickEditBlog(id, name, date, content, category, author, images)
          }
          title="Edit"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={() => onClickDeleteBlog(id)} title="Delete">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <h1>{name}</h1>
      <span className="blog-post-date">{date}</span>{" "}
      {images?.length !== undefined ? (
        <ImagesSlider
          nextOnClick={nextOnClick}
          indexImagePlusOne={indexImage + 1}
          imagesLength={images.length}
          src={images[indexImage].image}
          alt={images[indexImage].image}
          prevOnClick={prevOnClick}
          disabledPrevBtn={indexImage === 0}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          images={images}
          onClickDot={onClickDot}
          indexImage={indexImage}
        />
      ) : (
        ""
      )}
      <p className="blog-post-content">{content}</p>
    </article>
  );
};

export default Blog;
