import axios from 'axios';
import slugify from 'slugify';
import * as types from './types';

export const fetchData = () => async dispatch => {
  dispatch(showBackdrop());

  const data = (await axios.get(`${process.env.PUBLIC_URL}/static/data.json`)).data;
  const images = [
    'https://thumb.fakeface.rest/thumb_male_32_f80c2fab4d24b61e23135dd0e557840432eefe9d.jpg',
    'https://thumb.fakeface.rest/thumb_male_34_db2e9e0fd0798f9404fb9a8e5cf2343c9ac5d3f1.jpg',
    'https://thumb.fakeface.rest/thumb_male_38_d785512c73c6685f8d5bc73704f2f299828f4a6a.jpg',
    'https://thumb.fakeface.rest/thumb_female_38_7c2f8060d9b1e1a0dcffe6c6891980020131dd9e.jpg',
    'https://thumb.fakeface.rest/thumb_female_28_95967713899fd7de92199c6978f6f270d5a35889.jpg',
    'https://thumb.fakeface.rest/thumb_male_32_a2d68e221d80e399f87036e32050d7f8cc681d1a.jpg',
  ];

  for (let i = 0; i < data.employees.length; i++) {
    const employee = data.employees[i];

    data.employees[i] = {
      ...employee,
      id: `${i + 1}`,
      image: images[i],
      contacts: {
        email: `${slugify(employee.name.split(' ').slice(0, 2).join(' '), '.').toLowerCase()}@rosatom.ru`,
        phone: `8${Math.floor(Math.random() * 10000000000)}`,
      },
    };
  }

  dispatch({ type: types.FETCH_DATA, payload: data });
  dispatch(setTechProcess());
  dispatch(hideBackdrop());
};

export const findProcessById = processId => (_, getState) => {
  const { app } = getState();
  return app.data.processes.find(process => process.id === processId);
};

export const createNestedProcess = (process, parentProcess = '') => dispatch => {
  const process_ = dispatch(findProcessById(process.id));

  if (parentProcess) {
    process_.parentProcess = parentProcess;
  }

  if (process.subprocesses) {
    process_.opened = false;
    process_.subprocesses = process.subprocesses.map(subprocess =>
      dispatch(createNestedProcess(subprocess, process.id))
    );
  }

  return process_;
};

export const toggleProcessOpenedById = (process, processId) => dispatch => {
  if (process.id === processId) {
    process.opened = !process.opened;
  } else if (process.subprocesses) {
    process.subprocesses.forEach((subprocess, index) => {
      process.subprocesses[index] = dispatch(toggleProcessOpenedById(subprocess, processId));
    });
  }

  return process;
};

export const toggleProcessOpened = processId => (dispatch, getState) => {
  const { app } = getState();
  dispatch({ type: types.SET_TECH_PROCESS, payload: dispatch(toggleProcessOpenedById(app.techProcess, processId)) });
};

export const setTechProcess = () => (dispatch, getState) => {
  const { app } = getState();
  dispatch({ type: types.SET_TECH_PROCESS, payload: dispatch(createNestedProcess(app.data.process)) });
};

export const getProcessesByResourceId = resourceId => (_, getState) => {
  const { app } = getState();
  const processes = [];

  app.data.processes.forEach(process => {
    if (process.products.indexOf(resourceId) >= 0) {
      processes.push(process);
    }
  });

  return processes;
};

export const getResourceById = resourceId => (dispatch, getState) => {
  const { app } = getState();
  const resource = app.data.products.find(product => product.id === resourceId);

  resource.providers = dispatch(getProcessesByResourceId(resourceId));

  return resource;
};

export const getProcessesByProductId = productId => (_, getState) => {
  const { app } = getState();
  const processes = [];

  app.data.processes.forEach(process => {
    if (process.resources.indexOf(productId) >= 0) {
      processes.push(process);
    }
  });

  return processes;
};

export const getProductById = productId => (dispatch, getState) => {
  const { app } = getState();
  const product = app.data.products.find(product => product.id === productId);

  product.consumers = dispatch(getProcessesByProductId(productId));

  return product;
};

export const findEmployeesByProcess = process => dispatch => {
  if (!process.subprocesses) return [];

  return process.subprocesses.reduce((employees, subprocess) => {
    if (subprocess.employee) {
      employees.push(dispatch(findEmployeeById(subprocess.employee)));
    } else {
      employees = employees.concat(dispatch(findEmployeesByProcess(subprocess)));
    }

    return employees;
  }, []);
};

export const getAllProcessDataById = processId => dispatch => {
  let process = dispatch(findProcessById(processId));

  if (!process) return;

  process = { ...process };
  process.resources = process.resources.map(resourceId => dispatch(getResourceById(resourceId)));
  process.products = process.products.map(productId => dispatch(getProductById(productId)));

  if (process.employee) {
    process.employees = [dispatch(findEmployeeById(process.employee))];
  } else {
    const employees = dispatch(findEmployeesByProcess(process));

    process.employees = [];

    employees.forEach(employee => {
      if (!process.employees.find(employee_ => employee_.id === employee.id)) {
        process.employees.push(employee);
      }
    });
  }

  if (process.parentProcess) {
    process.parentProcess = dispatch(findProcessById(process.parentProcess));
  }

  return process;
};

export const findEmployeeById = employeeId => (_, getState) => {
  const { app } = getState();
  return app.data.employees.find(employee => employee.id === employeeId);
};

export const findProcessesByEmployeeId = employeeId => (_, getState) => {
  const { app } = getState();
  const processes = [];

  app.data.processes.forEach(process => {
    if (process.employee === employeeId) {
      processes.push(process);
    }
  });

  return processes;
};

export const findSpecialtyById = specialtyId => (_, getState) => {
  const { app } = getState();
  return app.data.specialties.find(specialty => specialty.id === specialtyId);
};

export const getAllEmployeeDataById = employeeId => dispatch => {
  let employee = dispatch(findEmployeeById(employeeId));

  if (!employee) return;

  employee = { ...employee };
  employee.processes = dispatch(findProcessesByEmployeeId(employeeId));
  employee.specialty = dispatch(findSpecialtyById(employee.specialty));

  return employee;
};

export const getEmployees = () => (_, getState) => {
  const { app } = getState();
  return app.data.employees;
};

export const findEmployeeByEmail = email => (_, getState) => {
  const { app } = getState();
  return app.data.employees.find(employee => employee.contacts.email === email);
};

export const authUser = authData => dispatch => {
  if (authData === 'logout') {
    localStorage.removeItem('user');
    dispatch({ type: types.AUTH_USER, payload: null });
  } else {
    if (authData) {
      authData = { ...authData };

      const employee = dispatch(findEmployeeByEmail(authData.email.value));

      if (!employee) {
        authData.email.error = 'Такого пользователя не существует';
        authData.password.error = '';
        return authData;
      } else {
        authData.email.error = '';
      }

      if (authData.password.value !== employee.password) {
        authData.password.error = 'Неверный пароль';
        return authData;
      }

      localStorage.setItem('user', JSON.stringify(employee));
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: types.AUTH_USER, payload: user });
    }
  }
};

export const createScheduleByEmployeeId = employeeId => dispatch => {
  const processes = dispatch(findProcessesByEmployeeId(employeeId));
  const schedule = {
    employee: dispatch(findEmployeeById(employeeId)),
    days: [],
  };

  for (let d = 0; d < 5; d++) {
    const processes_ = [];
    const consumers = [];
    const providers = [];

    processes.forEach(process => {
      if (process.schedule.days.indexOf(d + 1) !== -1) {
        const process_ = { ...dispatch(getAllProcessDataById(process.id)) };

        processes_.push(process_);

        process_.products.forEach(product => {
          product.consumers.forEach(consumer => {
            if (consumer.employee) {
              consumers.push({ ...dispatch(getAllProcessDataById(consumer.id)) });
            }
          });
        });

        process_.resources.forEach(resource => {
          resource.providers.forEach(provider => {
            if (provider.employee) {
              providers.push({ ...dispatch(getAllProcessDataById(provider.id)) });
            }
          });
        });
      }
    });

    schedule.days[d] = { processes: processes_, providers, consumers };
  }

  return schedule;
};

export const findCommonDocumentById = documentId => (_, getState) => {
  const { app } = getState();
  return app.data.commonDocuments.find(document => document.id === documentId);
};

export const showBackdrop = () => (dispatch, getState) => {
  const { app } = getState();

  if (app.showBackdrop) return;

  dispatch({ type: types.SHOW_BACKDROP });
};

export const hideBackdrop = () => (dispatch, getState) => {
  const { app } = getState();

  if (!app.showBackdrop) return;

  dispatch({ type: types.HIDE_BACKDROP });
};

export const nextGuideStep = () => (dispatch, getState) => {
  const { app } = getState();
  const newIndex = app.guideStepIndex + 1;

  if (newIndex === app.guide.length) {
    dispatch(hideGuide());
    dispatch(setGuideCompleted());
    return;
  }

  dispatch({ type: types.SET_GUIDE_STEP_INDEX, payload: newIndex });
};

export const showGuide = () => dispatch => {
  dispatch({ type: types.SHOW_GUIDE });
};

export const hideGuide = () => dispatch => {
  dispatch({ type: types.HIDE_GUIDE });
};

export const hideGuideDialog = () => dispatch => {
  dispatch({ type: types.HIDE_GUIDE_DIALOG });
};

export const setGuideCompleted = () => dispatch => {
  dispatch({ type: types.SET_GUIDE_COMPLETED });
};

export const setGuideNotCompleted = () => dispatch => {
  dispatch({ type: types.SET_GUIDE_NOT_COMPLETED });
};
