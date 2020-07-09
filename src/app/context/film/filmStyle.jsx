const filmStyle = (theme) => ({
  section: {
    padding: "100px 0",
    marginBottom: "100px",
    justifyContent: 'center',
    position: 'relative'
  },
  textCenter: {
    textAlign: "center",
  },
  sharingArea: {
    marginTop: "80px"
  },
  socials: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    fontSize: "20px",
    marginRight: "4px"
  },
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
    textAlign: 'center'
  },
  root: {
    flexGrow: 1,
  },
  cardIaamge: {
    borderRadius: '4px !important',
  },
  contCards: {
    margin: '0.5rem !important'
  },
  containerAverage: {
    position: 'absolute',
    bottom: '0',
    paddingBottom: '0.4rem',
    paddingTop: '0.4rem',
    width: '100%',
    background: 'linear-gradient(transparent, black)',
  },
  starAverage: {
    width: '1.6rem',
    zIndex: '9999'
  },
  containerIconPlay: {
    marginTop: '50%',
    [theme.breakpoints.down("md")]: {
      marginTop: '65%'
    }
  },
  iconPlay: {
    color: 'white'
  },
  iconsHover: {
    color: 'white',
    fontSize: '1.5rem',
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  },
  iconsHoverFav: {
    color: 'white',
    fontSize: '1.5rem',
    "&:hover,&:focus": {
      color: "#F50057 !important"
    },
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  },
  titleOverlay: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    [theme.breakpoints.down("md")]: {
      fontSize: '0.9rem'
    }
  },
  navLink: {
    color: "white",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    backgroundColor: 'transparent',
    display: "inline-flex",
    "&:hover": {
      color: "lightgray",
      background: "transparent",
    },
    "&:focus": {
      outline: 'none',
      border: 'none',
    }
  },
  navLinkSort: {
    color: "white",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    marginLeft: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    boxShadow: 'none',
    display: "inline-flex",
    "&:hover,&:focus": {
      outline: 'none',
      border: 'none',
      color: "white",
      background: "rgba(0, 0, 0, 0.5)",
      boxShadow: 'none',
    }
  },
  iconButtonSort: {
    marginLeft: '0.5rem'
  },
  loading: {
    padding: '8rem',
    textAlign: 'center'
  },
  releaseDate: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  },
  textSectionPop: {
    marginBottom: '3rem',
    color: 'white'
  },
  searchAndCategories: {
    position: 'absolute',
    top: '-4rem',
    left: '0',
    display: 'flex',
    flexDirection: 'row'
  },
  iconButton: {
    padding: 10,
    color: 'black',
    '&:focus': {
      border: 'none',
      outline: 'none',
    }
  }
});

export default filmStyle;
