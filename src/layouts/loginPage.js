import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import Button from "@mui/material/Button";
import AuthService from "../services/authService";

import IconButton from "@mui/material/IconButton";
import "../App.css";
import { Component } from "react";
import { useNavigate } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      showPassword: false,
    };
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
    // this.form.validateAll();
    // if (this.checkBtn.context._errors.length === 0) {
    AuthService.login(this.state.username, this.state.password).then(
      () => {
        useNavigate("/product");
        // this.props.history.push("/product");
        // this.setState({ redirect: true });
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
    // } else {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleClickShowPassword = () => {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword,
    });
  };
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                s
                src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/13db067b90a908bad6fd230ff720fe6a.png"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              onSubmit={this.handleLogin}
              method="POST"
            >
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    name="username"
                    label="Username"
                    variant="outlined"
                    // value={this.state.username}
                    onChange={this.onChangeUsername}
                    required
                  />
                </div>
                <div>
                  <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      name="password"
                      // value={this.state.password}
                      onChange={this.onChangePassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      required
                    />
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center justify-between"></div>
              <div>
                <Button fullWidth variant="contained" type="submit">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
