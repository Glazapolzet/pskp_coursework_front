import { apiInstance } from './base';

export const getDeposits = async () => {
  return await apiInstance.get('/deposits/');
}

export const analytics = async () => {
  return await apiInstance.post('/deposits/analytics/');
}

export const addDeposit = async ({
  name, 
  bank, 
  depositStartDate, 
  depositEndDate, 
  percentage, 
  depositsCategory
}) => {
  return await apiInstance.post('/deposits/', {
    name,
    bank,
    depositStartDate,
    depositEndDate,
    percentage,
    depositsCategory
  })
}

export const getDeposit = async (id) => {
  return await apiInstance.get(`/deposits/${id}/`)
}

export const updateDeposit = async (id, {
  name,
  bank,
  depositStartDate,
  depositEndDate,
  percentage,
  depositsCategory
}) => {
  return await apiInstance.put(`/deposits/${id}/`, {
    name,
    bank,
    depositStartDate,
    depositEndDate,
    percentage,
    depositsCategory
  })
}

export const deleteDeposit = async (id) => {
  return await apiInstance.delete(`/deposits/${id}/`)
}

export const getCategories = async () => {
  return await apiInstance.get('/deposits/categories/');
}

export const searchDeposits = async ({ name, bank }) => {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (bank) params.append('bank', bank);

  return await apiInstance.get(`/deposits/search/?${params.toString()}/`);
};
