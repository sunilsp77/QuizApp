import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  tablecellheader: {
    fontSize: '140%',
  },
  tablecelldata: {
    fontSize: '125%',
  },
}));

function createData(question, value) {
  return { question, value };
}

export default function SimpleTable(props) {
  const classes = useStyles();

  const rows = props.quizQuestions.map(quizQuestion =>
    createData(quizQuestion.question, quizQuestion.value),
  );
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tablecellheader}>Questions</TableCell>
            <TableCell className={classes.tablecellheader} align="left">
              Correct/Incorrect
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.question}>
              <TableCell
                className={classes.tablecelldata}
                component="th"
                scope="row"
              >
                {row.question}
              </TableCell>
              <TableCell className={classes.tablecelldata} align="left">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
