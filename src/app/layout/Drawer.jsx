import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "../context/home/Home";
import "./drawer.scss";
import { Button, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./drawer.scss";
import { Switch, Route, Link } from "react-router-dom";


import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTwitter,
  FaFacebookSquare,
  FaInstagram,
  FaBuromobelexperte,
  FaEnvelope,
  FaFilter,
} from "react-icons/fa";
import Trailer from "../context/trailer/Trailer";
import Contact from "../context/contact/Contact";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Axios from "axios";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import fire from "../config/fire";
import Favorites from '../context/favorites/Favorites';

const baseUrlPopular = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=popularity.desc&language=en-US`;
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`;
const baseUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`;
const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white",
    boxShadow: "none",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  btn: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    boxShadow: "none",
    fontWeight: "10px !important",
  },
  labelBtn: {
    fontSize: "14px !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  chevronButton: {
    marginRight: theme.spacing(2),
  },
  chevronButtonHide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "",
    fontSize: "16px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    fontSize: "14px",
    color: "black",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



export default function DrawerMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [displayUrl, setDisplayUrl] = useState("Popular");
  const [url, setUrl] = useState(baseUrlPopular);
  const [totalPages, setTotalPages] = useState(0);

  const logout = () => {
    fire.auth().signOut();
  };

  const getPopular = (page, currentCategory) => {
    Axios.get(`${baseUrlPopular}&page=${page}&with_genres=${currentCategory}`)
      .then((response) => {
        setFilms(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        setFilms([]);
      });
  };

  const getTopRated = (page, currentCategory) => {
    Axios.get(`${baseUrlTopRated}&page=${page}&with_genres=${currentCategory}`)
      .then((response) => {
        setFilms(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        setFilms([]);
      });
  };

  const getGenres = () => {
    Axios.get(genresUrl)
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
        setGenres([]);
      });
  };

  useEffect(() => {
    Axios.get(`${baseUrlPopular}&page=${page}&with_genres=${currentCategory}`)
      .then((response) => {
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        setTotalPages(0);
      });
  }, [currentCategory, page]);

  useEffect(() => {
    if (url === baseUrlPopular) {
      getPopular(page, currentCategory);
      setDisplayUrl("POPULAR");
    } else if (url === baseUrlTopRated) {
      getTopRated(page, currentCategory);
      setDisplayUrl("TOP RATED");
    }
    return () => {
      setFilms([]);
    };
  }, [page, currentCategory, url]);

  useEffect(() => {
    getGenres();
  }, []);

  const updateCurrentCategory = (id) => {
    setCurrentCategory(id);
    setPage(1);
  };

  const btnClickNext = () => {
    if (films && page !== totalPages) {
      setPage(page + 1);
    }
  };
  const btnClickPrev = () => {
    if (films && page !== 1) {
      setPage(page - 1);
    }
  };

  const toggleMenu = () => {
    if (open === true) {
      return "icon-menu-2";
    } else {
      return "icon-menu-1";
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaBars
              className={toggleMenu()}
              size="20px"
              onClick={() => {
                if (open === false) {
                  return setOpen(true);
                } else {
                  return setOpen(false);
                }
              }}
            />
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography
                className="mdb-appbar-title"
                noWrap
                onClick={() => {
                  setPage(1);
                  updateCurrentCategory("");
                  setUrl(baseUrlPopular);
                }}
              >
                <span style={{ fontWeight: "900" }}>M</span>db
              </Typography>
            </Link>
          </div>
          <div className="menu-right">
            <Favorites/>
            <Tooltip
              TransitionComponent={Zoom}
              id="soon"
              title={<p>soon...</p>}
              placement="bottom"
            >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon style={{ fontSize: "20px" }} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Tooltip>
            <Button
              className={classes.btn}
              variant="contained"
              style={{ marginLeft: "32px" }}
              onClick={() => logout()}
            >
              <FaSignOutAlt style={{ marginRight: "8px" }} /> LOG OUT
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List style={{ color: "#FFF", paddingTop: 0 }}>
          <Link style={{ textDecoration: "none" }} to="/">
            <ListItem
              button
              className="menu-buttons"
              onClick={() => {
                setPage(1);
                updateCurrentCategory("");
                setUrl(baseUrlPopular);
              }}
            >
              <ListItemIcon>
                <FaHome className="icons-drawer" />
              </ListItemIcon>
              <ListItemText primary="Home" className="drawerlinks" />
            </ListItem>
          </Link>
          <TreeView
            defaultCollapseIcon={<FaFilter style={{ color: "white" }} />}
            defaultExpandIcon={<FaFilter style={{ color: "white" }} />}
          >
            <TreeItem
              style={{ padding: "8px 16px 8px 16px" }}
              nodeId="1"
              label="Sort by"
            >
              <Link style={{ color: "#9E9E9E", textDecoration: "none" }} to="/">
                <TreeItem
                  nodeId="2"
                  label="Popular"
                  onClick={() => {
                    setUrl(baseUrlPopular);
                    setPage(1);
                    updateCurrentCategory("");
                  }}
                />
              </Link>
              <Link style={{ color: "#9E9E9E", textDecoration: "none" }} to="/">
                <TreeItem
                  nodeId="3"
                  label="Top Rated"
                  onClick={() => {
                    setUrl(baseUrlTopRated);
                    setPage(1);
                    updateCurrentCategory("");
                  }}
                />
              </Link>
            </TreeItem>
          </TreeView>
          <TreeView
            defaultCollapseIcon={
              <FaBuromobelexperte style={{ color: "white" }} />
            }
            defaultExpandIcon={
              <FaBuromobelexperte style={{ color: "white" }} />
            }
          >
            <TreeItem
              style={{ padding: "8px 16px 8px 16px" }}
              nodeId="1"
              label="Genres"
            >
              <Link style={{ color: "#9E9E9E", textDecoration: "none" }} to="/">
                <TreeItem
                  nodeId="2"
                  label="All"
                  onClick={() => {
                    updateCurrentCategory("");
                  }}
                />
              </Link>
              {genres.map((genre, idx) => {
                return (
                  <Link
                    key={idx}
                    style={{ color: "#9E9E9E", textDecoration: "none" }}
                    to="/"
                  >
                    <TreeItem
                      nodeId="3"
                      label={genre.name}
                      onClick={() => {
                        updateCurrentCategory(genre.id);
                      }}
                    />
                  </Link>
                );
              })}
            </TreeItem>
          </TreeView>
          <Link style={{ textDecoration: "none" }} to="/contact">
            <ListItem button className="menu-buttons">
              <ListItemIcon>
                <FaEnvelope className="icons-drawer" />
              </ListItemIcon>
              <ListItemText primary="Contact" className="drawerlinks" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                btnClickNext={btnClickNext}
                btnClickPrev={btnClickPrev}
                totalPages={totalPages}
                displayUrl={displayUrl}
                currentCategory={currentCategory}
                films={films}
                page={page}
                {...props}
                title={`Home`}
              />
            )}
          />
          <Route
            exact
            path="/trailer"
            render={(props) => <Trailer {...props} title={`Trailer`} />}
          />
          <Route
            exact
            path="/contact"
            render={(props) => <Contact {...props} title={`Contact`} />}
          />
        </Switch>
      </main>
      {props.user && (
        <Collapse
          style={{ position: "fixed", bottom: "20px", left: "20px" }}
          in={openAlert}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpenAlert(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="success"
          >
            Welcome {props.user.email}
          </Alert>
        </Collapse>
      )}
      <div className="socials">
        <a
          href="https://twitter.com/themoviedb?lang=fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="icons-socials" />
        </a>
        <a
          href="https://www.instagram.com/imdb/?hl=fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="icons-socials" />
        </a>
        <a
          href="https://fr-fr.facebook.com/themoviedb/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare className="icons-socials" />
        </a>
      </div>
    </div>
  );
}
