import { apiInstance } from "./base";

export const getDeposits = async () => {
  return await apiInstance.get('/deposits/');
}

export const addDeposit = async ({
  name, 
  bank, 
  deposit_start_date, 
  deposit_end_date, 
  percentage, 
  deposits_category
}) => {
  return await apiInstance.post('/deposits/', {
    name,
    bank,
    deposit_start_date,
    deposit_end_date,
    percentage,
    deposits_category
  })
}

export const getDeposit = async (id) => {
  return await apiInstance.get(`/deposits/${id}/`)
}

export const updateDeposit = async (id, {
  name,
  bank,
  deposit_start_date,
  deposit_end_date,
  percentage,
  deposits_category
}) => {
  return await apiInstance.put(`/deposits/${id}/`, {
    name,
    bank,
    deposit_start_date,
    deposit_end_date,
    percentage,
    deposits_category
  })
}

export const deleteDeposit = async (id) => {
  return await apiInstance.delete(`/deposits/${id}/`)
}

export const searchDeposits = async ({ name, bank }) => {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (bank) params.append('bank', bank);

  return await apiInstance.get(`/deposits/search/?${params.toString()}/`);
};
