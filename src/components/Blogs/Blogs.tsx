import React, { FC, useState, useEffect } from "react";
import "../Blogs/Blogs.css";
import { blogsArray } from "../../Api";
import Tabs from "../Tabs/Tabs";
import Tab from "../Tabs/Tab";
import Blog from "../Blog/Blog";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import Search from "../Search/Search";
import NewBlog from "../NewBlog/NewBlog";
import { v4 as uuidv4 } from "uuid";
import Alert from "../Alert/Alert";

export type BlogProps = {
  id: string;
  name: string;
  date?: string;
  content: string;
  category: string;
  author: string;
  images: Array<ImageProps>;
};

export type ImageProps = {
  id?: string;
  image?: string;
};

const Blogs: FC = () => {
  //blogs
  const [blogs, setBlogs] = useState<Array<BlogProps>>([]);
  //updatedIndex
  const [updatedIndex, setUpdatedIndex] = useState<number>(0);
  //selected
  const [categorySelected, setCategorySelected] = useState<string>("all");
  const [authorSelected, setAuthorSelected] = useState<string>("all");
  const [showAuthorDropDown, setShowAuthorDropDown] = useState<boolean>(false);
  //updatedBlogs
  const [upadatedBlogs, setUpadatedBlogs] = useState<Array<BlogProps>>([]);
  //search
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("all");
  //newBlog
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [images, setImages] = useState<Array<ImageProps>>([]);
  const [image, setImage] = useState<string>("");
  //newBlog blured
  const [nameBlured, setNameBlured] = useState<boolean>(false);
  const [categoryBlured, setCategoryBlured] = useState<boolean>(false);
  const [authorBlured, setAuthorBlured] = useState<boolean>(false);
  const [imageBlured, setImageBlured] = useState<boolean>(false);
  //newBlog submitted
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  //editBlog
  const [editBlog, setEditBlog] = useState<boolean>(false);
  // id
  const [id, setId] = useState<string>(uuidv4());
  // alert
  const [alert, setAlert] = useState<{
    show: boolean;
    type?: string;
    text?: string;
  }>({ show: false });

  //useEffect
  useEffect(() => {
    setBlogs(blogsArray);
  }, []);

  //useEffect
  useEffect(() => {
    getFilteredBlogs();
  }, [blogs, categorySelected, authorSelected, query]);

  //onClickBtn
  const onClickBtn = (index: number) => {
    setUpdatedIndex(index);
  };

  //onClickEditBlog
  const onClickEditBlog = (
    id: string,
    name: string,
    date: string,
    content: string,
    category: string,
    author: string,
    images: Array<ImageProps>
  ) => {
    setName(name);
    setDate(date);
    setContent(content);
    setCategory(category);
    setAuthor(author);
    setImages([...images]);
    setEditBlog(true);
    setId(id);
    setUpdatedIndex(1);
  };

  //onClickDeleteBlog
  const onClickDeleteBlog = (id: string) => {
    let updatedBlog = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlog);
    handleAlert({
      type: "danger",
      text: `The Blog is deleted`,
    });
  };

  //onClickAddImage
  const onClickAddImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setImages([{ id: uuidv4(), image }, ...images]);
    setImage("");
    handleAlert({ type: "success", text: "The image is added" });
  };

  //onclickDeleteImage
  const onclickDeleteImage = (id: string) => {
    let updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    handleAlert({
      type: "danger",
      text: `The image is deleted`,
    });
  };

  //handleAuthorBlur
  const handleAuthorBlur = () => {
    if (showAuthorDropDown) {
      setTimeout(() => {
        setShowAuthorDropDown(false);
      }, 200);
    }
  };

  //valid
  const nameIsValid = () => {
    return name && name.length > 0;
  };

  const categoryIsValid = () => {
    return category && category.length > 0;
  };

  const authorIsValid = () => {
    return author && author.length > 0;
  };

  const hasTwoImages = () => {
    return images.length >= 2;
  };

  //isError
  const isErrorName = () => {
    return (formSubmitted || nameBlured) && !nameIsValid();
  };

  const isErrorCategory = () => {
    return (formSubmitted || categoryBlured) && !categoryIsValid();
  };

  const isErrorAuthor = () => {
    return (formSubmitted || authorBlured) && !authorIsValid();
  };

  const isErrorImage = () => {
    return (formSubmitted || imageBlured) && !hasTwoImages();
  };

  //onSubmitSearch
  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(search);
  };

  //onSubmitNewBlog
  const onSubmitNewBlog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    handleAlert({
      type: "danger",
      text: `Name is required,Category is required,Author is required and Please add a minimum 2 images`,
    });
    if (
      nameIsValid() &&
      authorIsValid() &&
      categoryIsValid() &&
      hasTwoImages()
    ) {
      if (editBlog) {
        let editedBlog = blogs.map((blog) => {
          if (blog.id === id) {
            blog = {
              ...blog,
              id,
              name,
              date,
              content,
              category,
              author,
              images,
            };
          }
          return blog;
        });
        setBlogs(editedBlog);
        setEditBlog(false);
        setName("");
        setDate("");
        setImage("");
        setContent("");
        setCategory("");
        setAuthor("");
        setImages([]);
        setNameBlured(false);
        setCategoryBlured(false);
        setAuthorBlured(false);
        setImageBlured(false);
        setFormSubmitted(false);
        setUpdatedIndex(0);
        handleAlert({ type: "success", text: "The Blog is edited" });
      } else {
        const newBlogObject = {
          id: uuidv4(),
          name,
          date,
          content,
          category,
          author,
          images,
        };
        setBlogs([newBlogObject, ...blogs]);
        setUpdatedIndex(0);
        setName("");
        setDate("");
        setImage("");
        setContent("");
        setCategory("");
        setAuthor("");
        setImages([]);
        setNameBlured(false);
        setCategoryBlured(false);
        setAuthorBlured(false);
        setImageBlured(false);
        setFormSubmitted(false);
        handleAlert({ type: "success", text: "The Blog is added" });
      }
    }
  };

  //getFilteredBlogs
  const getFilteredBlogs = () => {
    let filteredBlogs = [...blogs];
    if (categorySelected !== "all") {
      filteredBlogs = filteredBlogs.filter((b) => {
        return b.category === categorySelected;
      });
    }
    if (authorSelected !== "all") {
      filteredBlogs = filteredBlogs.filter((b) => {
        return b.author === authorSelected;
      });
    }
    if (query !== "all") {
      filteredBlogs = filteredBlogs.filter((b) => {
        return (
          b.category.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.content.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
    setUpadatedBlogs(filteredBlogs);
  };

  // handle alert
  const handleAlert = ({ type, text }: { type: string; text: string }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Tabs activeIndex={updatedIndex} onClick={onClickBtn} disabled={editBlog}>
        <Tab label={<i className="fas fa-home" title="home"></i>}>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={onSubmitSearch}
          />{" "}
          <div className="blog-container">
            <div className="blog-content">
              {upadatedBlogs.map((blog) => {
                return (
                  blog.name !== "" && (
                    <Blog
                      key={blog.id}
                      {...blog}
                      onClickDeleteBlog={onClickDeleteBlog}
                      onClickEditBlog={onClickEditBlog}
                    />
                  )
                );
              })}
              {upadatedBlogs.length === 0 && "No results found."}
            </div>
            <BlogSidebar
              blogs={blogs}
              category={categorySelected}
              onChangeCategory={(e) => setCategorySelected(e.target.value)}
              onChangeAuthor={(e) => setAuthorSelected(e.target.value)}
              author={authorSelected}
              showAuthorDropDown={showAuthorDropDown}
              handleToggleAuthor={() =>
                setShowAuthorDropDown(!showAuthorDropDown)
              }
              handleAuthorBlur={handleAuthorBlur}
            />
          </div>
        </Tab>
        <Tab
          label={
            editBlog ? (
              <i className="fas fa-edit"></i>
            ) : (
              <i className="fas fa-plus-circle" title="Add new blog"></i>
            )
          }
        >
          <NewBlog
            name={name}
            onChangeName={(e) => setName(e.target.value)}
            date={date}
            onChangeDate={(e) => setDate(e.target.value)}
            image={image}
            onChangeImage={(e) => setImage(e.target.value)}
            content={content}
            onChangeContent={(e) => setContent(e.target.value)}
            category={category}
            onChangeCategory={(e) => setCategory(e.target.value)}
            author={author}
            onChangeAuthor={(e) => setAuthor(e.target.value)}
            onSubmitNewBlog={onSubmitNewBlog}
            onBlurName={() => setNameBlured(true)}
            isErrorName={isErrorName()}
            onBlurCategory={() => setCategoryBlured(true)}
            isErrorCategory={isErrorCategory()}
            onBlurAuthor={() => setAuthorBlured(true)}
            isErrorAuthor={isErrorAuthor()}
            editBlog={editBlog}
            images={images}
            onClickAddImage={onClickAddImage}
            onclickDeleteImage={onclickDeleteImage}
            isErrorImage={isErrorImage()}
            onBlurImage={(e) => setImageBlured(true)}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default Blogs;
