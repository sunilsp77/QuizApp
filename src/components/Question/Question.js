import React from 'react';
import classes from './Question.module.css';

const question = props => {
  // to randomize the options to be displayed on question card
  let randomIndex = Math.floor(Math.random() * 2);
  let firstOption = props.wrongAnswer,
    secondOption = props.rightAnswer;
  if (randomIndex === 1) {
    firstOption = props.rightAnswer;
    secondOption = props.wrongAnswer;
  }
  return (
    <article>
      <h1 className={classes.header}>
        Q.{props.qnumber + 1}&nbsp;&nbsp;{props.question}
      </h1>

      <input
        className={classes.RadioButton}
        id="10"
        type="radio"
        name="radioButtons"
        value={firstOption}
        onChange={props.checkAnswer}
      />
      <label htmlFor="10" className={classes.label}>
        {firstOption}
      </label>
      <br />

      <input
        className={classes.RadioButton}
        id="11"
        type="radio"
        name="radioButtons"
        value={secondOption}
        onChange={props.checkAnswer}
      />
      <label htmlFor="11" className={classes.label}>
        {secondOption}
      </label>
      <br />
    </article>
  );
};

export default React.memo(question);
