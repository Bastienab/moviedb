import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Film from "../film/Film";
import "./home.scss";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Home(props) {
  const page = props.page;

  const changeBtnNextAndPrev = () => {
    const btnPagination = document.querySelector(".buttons-pagination");
    if (window.scrollY > 50) {
      btnPagination.classList.add("scroll");
    } else {
      btnPagination.classList.remove("scroll");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBtnNextAndPrev);
    return () => {
      window.removeEventListener("scroll", changeBtnNextAndPrev);
    };
  }, []);

  const removeTitle = () => {
    if (page >= 2) {
      return "remove-title";
    } else {
      return "title-landing";
    }
  };

  const theMovies = props.films.map((film) => {
    return <Film film={film} key={film.id} />;
  });

  return (
    <div>
      <div className="background">
        <div id="home" className={removeTitle()}>
          <div
            style={{
              width: "50%",
              marginRight: "60px",
              marginTop: "32px",
            }}
          >
            <h1 className="title">
              MOVIE
              <span style={{ fontWeight: "100" }}>db</span>
            </h1>
            <p className="subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              quis quidem earum, laudantium labore dolores itaque eum sequi
              quas, repellat quaerat eius, dicta quo eligendi. Quis praesentium
              doloribus quasi quod!
            </p>
          </div>
        </div>
        <div id="movies" className="content-films">
          {props.films.length < 20 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress style={{ color: "black" }} />
            </div>
          ) : (
            <div className="container-films">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h1 className="title-films-content">{props.displayUrl}</h1>
                <div
                  style={{
                    width: "100px",
                    borderTop: "1px solid black",
                    marginLeft: "20px",
                  }}
                ></div>
              </div>
              <Grid container spacing={2}>
                {theMovies}
              </Grid>
            </div>
          )}
          <div className="buttons-pagination">
            <p style={{ marginTop: "17px", fontWeight: "bold" }}>
              PAGE n° {props.page} / {props.totalPages}
            </p>
            <Button
              href=""
              target="_blank"
              className="btn-prev-next"
              onClick={() => props.btnClickPrev()}
            >
              <FaChevronLeft /> Prev
            </Button>
            <Button
              href=""
              target="_blank"
              className="btn-prev-next"
              onClick={() => props.btnClickNext()}
            >
              Next <FaChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
