import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar } from '@material-ui/core';
import { useStyles } from './Employees.style';
import { getEmployees } from '../../redux/actions';

export const Employees = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    if (appState.data && !employees) {
      setEmployees(dispatch(getEmployees()));
    }
  }, [employees, appState.data, dispatch]);

  return employees ? (
    <div className={classes.root}>
      <Paper className={classes.tablePaper} variant="outlined">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Сотрудники</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {employees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell component="th" scope="row">
                    <div className={classes.employee}>
                      <Avatar src={employee.image} />
                      <Link className={classes.link} to={`/profile/${employee.id}`}>
                        {employee.name}
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  ) : null;
};
