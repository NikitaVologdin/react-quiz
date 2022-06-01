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
      id: num,
    },
    {
      required: true,
    }
  );
}

function createFormControls() {
  return {
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
  };
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswer: 1,
    formControls: createFormControls(),
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map(
      (formControlName, index) => {
        let control = this.state.formControls[formControlName];

        return (
          <React.Fragment key={formControlName + index}>
            <Input
              label={control.label}
              touched={control.touched}
              valid={control.valid}
              value={control.value}
              shouldValidate={control.errorMessage}
              validation={!!control.validation}
              onChange={(event) => {
                this.inputChangeHandler(event.target.value, formControlName);
              }}
            />
            {index === 0 ? <hr /> : null}
          </React.Fragment>
        );
      }
    );
  };

  inputChangeHandler = (value, formControlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[formControlName] };

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[formControlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const { question, option1, option2, option3, option4 } =
      this.state.formControls;
    const questionItem = {
      question: question.value,
      option1: { value: option1.value, id: option1.id },
      option2: { value: option2.value, id: option2.id },
      option3: { value: option3.value, id: option3.id },
      option4: { value: option4.value, id: option4.id },
      rightAnswer: this.state.rightAnswer,
      id: quiz.length + 1,
    };
    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswer: 1,
      formControls: createFormControls(),
    });
  };

  submitHandler = () => {
    console.log(this.state.quiz);
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswer: +event.target.value,
    });
  };

  render() {
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
            <Button onClick={this.submitHandler}>Создать тест</Button>
          </div>
        </div>
      </div>
    );
  }
}
