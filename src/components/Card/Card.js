import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    border: '1px solid black',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
  },
  p: {
    fontSize: 25,
    fontWeight: 'bold',
  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.h1}
        </Typography>
        <Typography className={classes.p} component="p">
          {props.p1}/10
        </Typography>
        <Typography className={classes.p} component="p">
          {props.p2}
        </Typography>
      </Paper>
    </div>
  );
}
