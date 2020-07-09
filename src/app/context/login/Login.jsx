import React, { Component } from "react";
import fire from "../../config/fire";
import "./login.scss";
import { Button } from "@material-ui/core";
import {
  FaTwitter,
  FaFacebookSquare,
  FaInstagram,
  FaSignInAlt,
} from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handlChange.bind(this);
    this.signup = this.signup.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.state = {
      email: "",
      password: "",
      errorLogin: "",
      errorSignup: "",
      open: true,
      auth: fire.auth(),
      emailAddress: "",
    };
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
        this.setState({ loginMessageConfirmation: "Connecté !" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorLogin: err.message });
      });
  }
  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorSignup: err.message });
      });
  }
  handlChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.setState({
      open: true,
    });
  }
  closeAlert() {
    this.setState({
      open: false,
      email: "",
      password: "",
      errorLogin: "",
      errorSignup: "",
    });
  }

  render() {
    return (
      <div>
        <div className="container-login">
          <div style={{ position: "fixed", top: "20px", left: "20px" }}>
            <Typography className="logo-login" noWrap>
              <span style={{ fontWeight: "900" }}>M</span>db
            </Typography>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "900",
                  fontSize: "52px",
                }}
              >
                MOVIE<span style={{ fontWeight: "200" }}>db</span>
              </h1>
            </div>

            <div style={{ marginTop: "20px" }}>
              <form>
                <div className="d-flex flex-column">
                  <TextField
                    size="small"
                    label="enter email adress"
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    style={{ marginTop: "16px" }}
                  />
                  <TextField
                    size="small"
                    label="enter password"
                    variant="outlined"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="enter password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    style={{ marginTop: "16px" }}
                  />
                </div>
                <Button
                  href=""
                  target="_blank"
                  className="btn-login"
                  onClick={this.login}
                >
                  Login <FaSignInAlt style={{ marginLeft: "8px" }} />
                </Button>
                <p style={{ marginTop: "8px", fontSize: "12px" }}>
                  If you don't have account, enter an email and password and
                  <Link
                    component="button"
                    variant="body2"
                    onClick={this.signup}
                    style={{
                      fontSize: "12px",
                      textDecoration: "none",
                      marginLeft: "4px",
                      marginBottom: "2px",
                    }}
                  >
                    sign up here !
                  </Link>
                </p>
                <div>
                  {this.state.errorLogin !== "" && (
                    <Collapse
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                      }}
                      in={this.state.open}
                    >
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={this.closeAlert}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        severity="error"
                      >
                        {this.state.errorLogin}
                      </Alert>
                    </Collapse>
                  )}
                </div>
                <div>
                  {this.state.errorSignup !== "" && (
                    <Collapse
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                      }}
                      in={this.state.open}
                    >
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={this.closeAlert}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        severity="error"
                      >
                        {this.state.errorSignup}
                      </Alert>
                    </Collapse>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
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
}

export default Login;
