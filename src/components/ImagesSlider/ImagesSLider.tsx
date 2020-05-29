import React from "react";
import "../ImagesSlider/ImagesSlider.css";
import { ImageProps } from "../Blogs/Blogs";

export type ImagesSliderProps = {
  nextOnClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  indexImagePlusOne?: number;
  indexImage?: number;
  imagesLength?: number;
  src?: string;
  alt?: string;
  prevOnClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  disabledPrevBtn?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  images?: Array<ImageProps>;
  onClickDot?: any;
};

const ImagesSlider: React.FC<ImagesSliderProps> = ({
  nextOnClick,
  indexImagePlusOne,
  imagesLength,
  src,
  alt,
  prevOnClick,
  disabledPrevBtn,
  onMouseEnter,
  onMouseLeave,
  images,
  onClickDot,
  indexImage,
}) => {
  return (
    <div
      className="images-slider-wrapper"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p>{`${indexImagePlusOne}/${imagesLength}`}</p>
      <button onClick={nextOnClick} className="btn-next">
        <i className="fas fa-chevron-right fa-2x"></i>
      </button>
      <img src={src} alt={alt} className="images-slider-img" />
      <button
        disabled={disabledPrevBtn}
        onClick={prevOnClick}
        className="btn-prev"
      >
        <i className="fas fa-chevron-left fa-2x"></i>
      </button>
      <div className="dots-wrapper">
        {images?.length !== undefined &&
          images.map((img, index) => {
            return (
              <span
                key={img.id}
                onClick={() => onClickDot(index)}
                className={indexImage === index ? "dot activeDot" : "dot"}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ImagesSlider;
