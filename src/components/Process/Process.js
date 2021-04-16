import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from '@material-ui/core';
import { useStyles } from './Process.style';
import { getAllProcessDataById } from '../../redux/actions';
import { Tooltip } from '../Tooltip/Tooltip';

export const Process = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const params = useParams();
  const classes = useStyles();
  const [process, setProcess] = useState(null);

  useEffect(() => {
    if (appState.data && (!process || process.id !== params.processId)) {
      setProcess(dispatch(getAllProcessDataById(params.processId)));
    }
  }, [process, appState.data, params.processId, dispatch]);

  return process ? (
    <div className={classes.root}>
      <Typography gutterBottom variant="h6">
        {process.name}
      </Typography>
      <Typography className={classes.description} gutterBottom variant="body2">
        {process.description}
      </Typography>
      <Paper className={classes.tablePaper} variant="outlined">
        <TableContainer>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ресурс</TableCell>
                <TableCell align="right">Процесс-поставщик</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {process.resources.map((resource, resourceIndex) => (
                <TableRow key={resource.id}>
                  <TableCell component="th" scope="row">
                    {resource.name}
                  </TableCell>
                  <TableCell align="right">
                    {resource.providers.length
                      ? resource.providers.map((provider, providerIndex) => (
                          <React.Fragment key={providerIndex}>
                            {resourceIndex === 0 && providerIndex === 0 ? (
                              <Tooltip guideStepIndex={3} placement="right-start">
                                <Link className={classes.link} to={`/process-list/${provider.id}`}>
                                  {provider.name}
                                </Link>
                              </Tooltip>
                            ) : (
                              <Link className={classes.link} to={`/process-list/${provider.id}`}>
                                {provider.name}
                              </Link>
                            )}
                            {providerIndex < resource.providers.length && <br />}
                          </React.Fragment>
                        ))
                      : 'Внешняя среда'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper className={classes.tablePaper} variant="outlined">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Продукт</TableCell>
                <TableCell align="right">Процесс-потребитель</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {process.products.map(product => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">
                    {product.consumers.length
                      ? product.consumers.map((consumer, index) => (
                          <React.Fragment key={index}>
                            <Link className={classes.link} to={`/process-list/${consumer.id}`}>
                              {consumer.name}
                            </Link>
                            {index < product.consumers.length && <br />}
                          </React.Fragment>
                        ))
                      : 'Внешняя среда'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {process.parentProcess && (
        <Paper className={classes.tablePaper} variant="outlined">
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Процесс-родитель</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Link className={classes.link} to={`/process-list/${process.parentProcess.id}`}>
                      {process.parentProcess.name}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {process.subprocesses && (
        <Paper className={classes.tablePaper} variant="outlined">
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Подпроцессы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {process.subprocesses.map(subprocess => (
                  <TableRow key={subprocess.id}>
                    <TableCell component="th" scope="row">
                      <Link className={classes.link} to={`/process-list/${subprocess.id}`}>
                        {subprocess.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {Boolean(process.employees.length) && (
        <Paper className={classes.tablePaper} variant="outlined">
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Ответственные сотрудники</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {process.employees.map(employee => (
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
      )}
    </div>
  ) : null;
};
