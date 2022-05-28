import React, { Component } from "react";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js";

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  loginHandler = () => {};

  signUphandler = () => {};

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, formControlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[formControlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[formControlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      isFormValid,
      formControls,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map(
      (formControlName, index) => {
        const inputData = this.state.formControls[formControlName];
        return (
          <Input
            type={inputData.type}
            label={inputData.label}
            onChange={(event) => {
              this.onChangeHandler(event, formControlName);
            }}
            errorMessage={inputData.errorMessage}
            key={formControlName + index}
            valid={inputData.valid}
            touched={inputData.touched}
            shouldValidate={!!inputData.validation}
            value={inputData.value}
          />
        );
      }
    );
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.onSubmitHandler} className={classes.__form}>
            {this.renderInputs()}

            <div className={classes.__buttons}>
              <Button
                type="login"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Войти
              </Button>
              <Button
                type="signUp"
                onClick={this.signUphandler}
                disabled={!this.state.isFormValid}
              >
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
