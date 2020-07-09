import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { CardImg } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import Favorite from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import LanguageIcon from "@material-ui/icons/Language";
import AppsIcon from "@material-ui/icons/Apps";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import filmStyle from "./filmStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import "./film.scss";
import PropTypes from "prop-types";
import Axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

const posterUrl = "http://image.tmdb.org/t/p/original/";
const baseUrlGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`;
const debutUrlMovieDetails = `https://api.themoviedb.org/3/movie/`;
const imagesAndVideos = `&append_to_response=videos,images`;

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      currentCategory: "",
      details: [],
      page: 1,
      film: props.film,
    };
  }
  
  getDetails() {
    Axios.get(
      `${debutUrlMovieDetails}${this.props.film.id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}${imagesAndVideos}`
    )
      .then((response) => {
        this.setState({ details: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          details: [],
        });
      });
  }

  getGenres() {
    Axios.get(baseUrlGenres)
      .then((response) => {
        this.setState({ genres: response.data.genres });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMovieGenreName(genre_ids) {
    let genreIds = [];
    let genreNames = [];
    let genres = "";
    this.state.genres.forEach((genre, index) => {
      genreIds[index] = genre.id;
      genreNames[index] = genre.name;
    });
    genre_ids.forEach((genre) => {
      let genreIndex = genreIds.indexOf(genre);
      let genreName = genreNames[genreIndex];
      genres += genreName + ", ";
    });
    genres = genres.slice(0, -2);
    return genres;
  }

  componentDidMount() {
    this.getGenres();
    this.getDetails();
  }

  componentWillUnmount() {
    this.setState({ genres: [] });
    this.setState({ details: [] });
  }

  render() {
    const { classes } = this.props;
    const film = this.state.film;
    const note = this.props.film.vote_average / 2;
    return (
      <Grid id="films-section" item xs={6} sm={6} md={3} lg={3}>
        <Card className="container-card-poster">
          <CardImg
            className={classes.cardIaamge}
            top
            width="100%"
            src={`${posterUrl}${film.poster_path}`}
            alt="Card image cap"
          />
          <div className={classes.containerAverage}>
            <Rating
              name="half-rating-read"
              value={note}
              precision={0.5}
              readOnly
              max={5}
              size="small"
            />
          </div>
          <div className="overlay">
            <div className={classes.containerIconPlay}>
              <div className={classes.containerIconPlay}>
                <Link
                  to={{
                    pathname: "/trailer",
                    state: { ...this.state },
                  }}
                >
                  <FaPlayCircle className={classes.iconPlay} size="45%" />
                </Link>
              </div>
            </div>
            <figcaption className="fig-caption">
              <h4 className={classes.titleOverlay}>{film.title}</h4>
            </figcaption>
            <div>
              <p className={classes.releaseDate}>{film.release_date}</p>
            </div>
            <div className="forBottomPlacementOfIconsHover">
              <Tooltip
                className={classes.toolTip}
                TransitionComponent={Zoom}
                id="Add to favorite"
                title={<p>Add to favorite</p>}
                placement="top"
              >
                <Favorite
                  className={classes.iconsHoverFav}
                  style={{
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                  }}
                />
              </Tooltip>
              <Tooltip
                className={classes.toolTip}
                TransitionComponent={Zoom}
                id="Add to favorite"
                title={
                  <p>Category: {this.getMovieGenreName(film.genre_ids)}</p>
                }
                placement="top"
              >
                <AppsIcon
                  style={{
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                  }}
                  className={classes.iconsHover}
                />
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                id="Overview"
                title={<p>Overview : {film.overview}</p>}
                placement="top"
              >
                <CreateIcon
                  style={{
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                  }}
                  className={classes.iconsHover}
                />
              </Tooltip>
              <Tooltip
                className={classes.toolTip}
                TransitionComponent={Zoom}
                id="Language"
                title={<p>Original Language : {film.original_language}</p>}
                placement="top"
              >
                <LanguageIcon
                  style={{
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                  }}
                  className={classes.iconsHover}
                />
              </Tooltip>
            </div>
            <div className={classes.containerAverage}>
              <Rating
                name="half-rating-read"
                value={note}
                precision={0.5}
                readOnly
                max={5}
                size="small"
              />
            </div>
          </div>
        </Card>
      </Grid>
    );
  }
}

Film.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(filmStyle)(Film);
