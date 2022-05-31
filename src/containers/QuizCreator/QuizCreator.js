import React, { Component } from "react";
import classes from "./QuizCreator.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm,
} from "../../frameworks/form/formFramework";

function createOptionControl(num) {
  return createControl(
    {
      label: `Вариант ${num}`,
      errorMessage: "Ответ не может быть пустым",
    },
    {
      required: true,
    }
  );
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswer: 1,
    formControls: {
      question: createControl(
        {
          label: "Задайте вопрос",
          errorMessage: "Вопрос не может быть пустым",
        },
        {
          required: true,
        }
      ),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4),
    },
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map(
      (formControlName, index) => {
        let control = this.state.formControls[formControlName];

        return (
          <React.Fragment>
            <Input
              key={`${control}+${index}`}
              label={control.label}
              touched={control.touched}
              valid={control.valid}
              value={control.value}
              errorMessage={control.errorMessage}
              validation={!!control.validation}
              onChange={(event) => {
                this.inputChangeHandler(event, formControlName);
              }}
            />
            {index === 0 ? <hr /> : null}
          </React.Fragment>
        );
      }
    );
  };

  inputChangeHandler = (event, formControlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[formControlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[formControlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  addQuestionHandler = () => {};

  addQuizHandler = () => {};

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswer: +event.target.value,
    });
  };

  render() {
    // console.log(this.state.formControls);
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создать тест</h1>

          <form>
            {this.renderInputs()}

            <Select
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
              label={"Выберите правильный ответ"}
              onChange={this.selectChangeHandler}
              value={this.state.rightAnswer}
            />
          </form>
          <div className={classes.__buttons}>
            <Button onClick={this.addQuestionHandler}>Добавить вопрос</Button>
            <Button onClick={this.createQuizHandler}>Создать тест</Button>
          </div>
        </div>
      </div>
    );
  }
}
