import * as types from './types';

const initialState = {
  data: null,
  pages: [
    {
      link: 'schedule',
      title: 'Расписание',
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
      link: 'atom',
      title: 'АТОМ',
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
  showBackdrop: false,
  guide: [
    ['Это кнопка вызова главного меню приложения.', 'кнопку Меню'],
    [
      'В меню можно быстро переключаться между страницами приложения. Эта ссылка меню ведет на страницу с Вашим расписанием.',
      'ссылку Расписание',
    ],
    [
      'Это одна из ваших задач, в ней представлено название процесса и временной промежуток.',
      'ссылку Управление производством',
    ],
    ['На данной странице представлено полное описание процесса.', 'ссылку Техническое обслуживание и ремонт'],
    ['Эта кнопка с Вашим изображением ведет на страницу Вашего профиля.', 'Ваш аватар'],
  ],
  showGuide: false,
  guideStepIndex: 0,
  showGuideDialog: true,
  guideCompleted: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GUIDE_COMPLETED:
      return { ...state, guideCompleted: true };
    case types.SET_GUIDE_NOT_COMPLETED:
      return { ...state, guideCompleted: false };
    case types.HIDE_GUIDE_DIALOG:
      return { ...state, showGuideDialog: false };
    case types.SHOW_GUIDE:
      return { ...state, showGuide: true };
    case types.HIDE_GUIDE:
      return { ...state, showGuide: false };
    case types.SET_GUIDE_STEP_INDEX:
      return { ...state, guideStepIndex: action.payload };
    case types.SHOW_BACKDROP:
      return { ...state, showBackdrop: true };
    case types.HIDE_BACKDROP:
      return { ...state, showBackdrop: false };
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
