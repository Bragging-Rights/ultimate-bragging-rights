import api from './api';



export const login = async (data) => {
  const response = await api.post('/signin', data);

  console.log(response);
//   if (response?.data?.token) {
//     localStorage.setItem('token', response?.data?.token);
//     const role = response?.data?.role;

//     role?.length ? localStorage.setItem('role', role[0]) : localStorage.removeItem('role');
//   }

  return response;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('clientId');
 
};

export const createUser = async (data) => {
  const response = await api.post('/signup', data);
  return response;
};

export const verifyUser = async (data) => {
  const response = await api.post('Authenticate/verifycode', data);
  if (response?.data?.token) {
    localStorage.setItem('token', response?.data?.token);
    const role = response?.data?.role;

    role?.length ? localStorage.setItem('role', role[0]) : localStorage.removeItem('role');
  }
  return response;
};