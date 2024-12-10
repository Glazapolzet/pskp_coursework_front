import { apiInstance, unauthApiInstance } from "./base";

export const login = async ({ username, password }) => {
  const { data } = await unauthApiInstance.post('/auth/login/', {
    username,
    password,
  });

  const { access, refresh } = data;
  if (access && refresh) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  return data;
}

export const register = async ({ username, password, role }) => {
  const { data } = await unauthApiInstance.post('/auth/register/', {
    username,
    password,
    role
  });

  const { access, refresh } = data;
  if (access && refresh) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  return data;
};

export const logout = async () => {
  return await apiInstance.post('/auth/logout/');
}

export const getAccessToken = async (refreshToken) => {
  try {
    const { data } = await unauthApiInstance.post('/token/refresh/', {
      refresh: refreshToken,
    });

    return data.access
  }
  catch (refreshError) {
    Promise.reject(refreshError);
  }
}
