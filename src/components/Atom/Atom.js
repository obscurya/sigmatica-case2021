import { Typography, Button, Paper } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { useStyles } from './Atom.style';

const reactIcon = icon(faReact).icon;
const tasks = [
  {
    name: 'Пройти обучение',
    desc: 'Пройдите гайд и освойте основной функционал приложения!',
    price: 5,
  },
  {
    name: 'Coffee Break',
    desc: 'Самое время завести новые знакомства!',
    price: 15,
  },
  {
    name: 'История ГК Росатом',
    desc: 'Ознакомьтесь с невероятной историей компании!',
    price: 10,
  },
];

export const Atom = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="info">
        АТОМ – это внутренняя финансовая система и валюта Росатома.
        <br />
        <br />
        Накапливайте атомы за выполнение заданий в приложении и тратьте их на реальные полезные вещи!
      </Alert>
      <div className={classes.balance}>
        <Typography>Ваш баланс</Typography>
        <Typography className={classes.atoms} variant="h4">
          <span>100</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${reactIcon[0]} ${reactIcon[1]}`} height="30px">
              <path d={reactIcon[4]} />
            </svg>
          </span>
        </Typography>
      </div>
      <Button className={classes.button} variant="outlined" color="primary" fullWidth>
        <div>Перейти в магазин</div>
        <KeyboardArrowRight />
      </Button>
      <div className={classes.tasks}>
        <Typography gutterBottom>Доступные задания</Typography>
        {tasks.map(task => (
          <Paper key={task.name} className={classes.task} variant="outlined">
            <span>
              <Typography variant="body1" color="primary" gutterBottom>
                {task.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {task.desc}
              </Typography>
            </span>
            <div>
              <Typography className={classes.atoms} variant="body2">
                <span>{task.price}</span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${reactIcon[0]} ${reactIcon[1]}`} height="14px">
                    <path d={reactIcon[4]} />
                  </svg>
                </span>
              </Typography>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};
