import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card/Card';
import Table from '../../components/UI/Table/Table';
import * as actionTypes from '../../store/actions';
import classes from './EndScreen.module.css';

// this Component handles the EndScreen
class EndScreen extends Component {
  // onClick of playAgain button
  playAgain = () => {
    this.props.playQuizAgain();
    this.props.history.push('/start-quiz');
  };
  render() {
    // creating an array of questions and results for sending to Table component
    let questionsAndResultsArray = [];
    for (let i = 0; i < this.props.questions.length; i++) {
      let questn = this.props.questions[i].question;
      let option = this.props.response[i] === 'Y' ? 'Correct' : 'Incorrect';
      questionsAndResultsArray.push({
        question: questn,
        value: option,
      });
    }
    return (
      <div>
        {/* Table for displaying the questions and results */}
        <Table quizQuestions={questionsAndResultsArray} />
        {/* Card for displaying score */}
        <Card h1="Your Score is:" p1={this.props.score} />
        {/* playAgain button */}
        <div className={classes.BtnDiv}>
          <button className={classes.Btn} onClick={this.playAgain}>
            Play Again!
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    score: state.score,
    response: state.response,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    playQuizAgain: () => dispatch({ type: actionTypes.PLAY_QUIZ_AGAIN }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndScreen);
