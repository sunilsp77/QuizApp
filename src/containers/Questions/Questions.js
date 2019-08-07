import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import Question from '../../components/Question/Question';
import * as actionTypes from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Questions.module.css';

// this component displays the Question Screen

class Questions extends Component {
  // Fetching the questions from the server and
  //dispatching an action to store them in store
  componentDidMount() {
    let parser = new DOMParser();
    axios
      .get('')
      .then(response => {
        const questions = response.data.results;
        const updatedQuestions = questions.map(q => {
          let questn = parser.parseFromString(q.question, 'text/html').body
            .textContent;
          return {
            question: questn,
            correct_answer: q.correct_answer,
            incorrect_answer: q.incorrect_answers.toString(),
          };
        });
        this.props.set_questions(updatedQuestions);
      })
      .catch(error => {
        this.props.fetch_questions_failed();
      });
  }

  // onClick of seeResults button
  seeResults = () => {
    this.props.history.push('/end');
  };

  render() {
    //to display the result of the selected option
    let result = null;
    if (this.props.currentResponse === 'Y') {
      result = (
        <p className={classes.Result}>
          Your answer is <span style={{ color: 'green' }}>Correct</span>
        </p>
      );
    } else if (this.props.currentResponse === 'N') {
      result = (
        <p className={classes.Result}>
          Your answer is <span style={{ color: 'red' }}>Incorrect</span>
        </p>
      );
    }
    // display next button or seeResults button
    let btn = (
      <button
        className={classes.Btn}
        disabled={this.props.disableNextQ}
        onClick={this.props.navigate_next_question}
      >
        Next
      </button>
    );
    if (this.props.endOfQuiz) {
      btn = (
        <button className={classes.Btn} onClick={this.seeResults}>
          See your Score!
        </button>
      );
    }
    // display the question card with a question and two options
    let questionCard = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Something went wrong!</p>
    ) : (
      <Spinner />
    );
    if (Array.isArray(this.props.questions) && this.props.questions.length) {
      let currentQuestion = this.props.questions[this.props.currentQ];
      questionCard = (
        <div className={classes.QuestionCard}>
          <Question
            qnumber={this.props.currentQ}
            question={currentQuestion.question}
            rightAnswer={currentQuestion.correct_answer}
            wrongAnswer={currentQuestion.incorrect_answer}
            checkAnswer={this.props.validate_selected_option}
          />
          {result}
          <div className={classes.BtnDiv}>{btn}</div>
        </div>
      );
    }

    return questionCard;
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    error: state.error,
    disableNextQ: state.disableNextQ,
    currentQ: state.currentQ,
    currentResponse: state.response[state.currentQ],
    endOfQuiz: state.endOfQuiz,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_questions: questions =>
      dispatch({ type: actionTypes.SET_QUESTIONS, questions: questions }),
    fetch_questions_failed: () =>
      dispatch({
        type: actionTypes.FETCH_QUESTIONS_FAILED,
      }),
    validate_selected_option: event =>
      dispatch({ type: actionTypes.VALIDATE_SELECTED_OPTION, event: event }),
    navigate_next_question: () =>
      dispatch({ type: actionTypes.NAVIGATE_NEXT_QUESTION }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
