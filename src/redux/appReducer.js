import * as types from './types';

const initialState = {
  data: null,
  pages: [
    {
      link: 'schedule',
      title: 'Мое расписание',
    },
    {
      link: 'process-list',
      title: 'Технологический процесс',
    },
    // {
    //   link: 'departments',
    //   title: 'Отделы',
    // },
    {
      link: 'employees',
      title: 'Сотрудники',
    },
    {
      link: 'common-documents',
      title: 'Общие документы',
    },
    {
      link: 'profile',
      title: 'Профиль',
    },
    {
      link: 'specialties',
      title: 'Специализация',
    },
  ],
  techProcess: null,
  user: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, user: action.payload };
    case types.SET_TECH_PROCESS:
      return { ...state, techProcess: action.payload };
    case types.FETCH_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
