import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import YouTube from "react-youtube";
import Rating from "@material-ui/lab/Rating";

export default function Trailer(props) {
  const details = props;
  const note = props.location.state.film.vote_average / 2;

  const useStyles = makeStyles({
    containerTrailer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      marginTop: "64px",
    },
    containerVideoAndInfos: {
      margin: "2rem",
      width: "80%",
      display: "flex",
      flexWrap: "wrap",
    },
    video: {
      width: "100%",
      height: "400px",
    },
    overviewTitle: {
      fontWeight: "200",
    },
    textGray: {
      color: "gray",
      margin: "0",
    },
    containerAverage: {
      marginTop: "40px",
    },
  });
  const classes = useStyles();

  return (
    <div key={props.history.location.key} className={classes.containerTrailer}>
      <div className={classes.containerVideoAndInfos}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <YouTube
              className={classes.video}
              videoId={details.location.state.details.videos.results[0].key} // try / catch ici ?
            />
          </Grid>
          <Grid item xs={12}>
            <h3 className={classes.overviewTitle}>
              {details.location.state.film.original_title}
            </h3>
            <p style={{ fontSize: "0.9rem" }}>
              {details.location.state.details.overview}
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className={classes.textGray}>
                  <b>Category: </b>
                  {details.location.state.details.genres
                    .map((e) => e.name)
                    .join(", ")}
                </p>
                <p className={classes.textGray}>
                  <b>Language: </b>
                  {details.location.state.details.spoken_languages
                    .map((e) => e.name)
                    .join(", ")}
                </p>
                <p className={classes.textGray}>
                  <b>Nationality: </b>
                  {details.location.state.details.production_countries
                    .map((e) => e.name)
                    .join(", ")}
                </p>
              </div>
              <div className={classes.containerAverage}>
                <Rating
                  name="half-rating-read"
                  value={note}
                  precision={0.5}
                  readOnly
                  max={5}
                  size="medium"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
