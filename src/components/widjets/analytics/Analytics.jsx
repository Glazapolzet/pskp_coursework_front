import './Analytics.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { apiDeposits } from '../../../api';

export const Analytics = () => {
  const [banksDistribution, setBanksDistribution] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const depositsResponse = await apiDeposits.analytics();
        const deposits = depositsResponse.data;


        const distribution = deposits.reduce((acc, deposit) => {
          acc[deposit.bank] = (acc[deposit.bank] || 0) + 1;
          return acc;
        }, {});

        setBanksDistribution(distribution);
      } catch (err) {
        if (err.response?.status === 403) {
          setError("У вас нет прав доступа к данной странице");
        } else {
          setError("Произошла непредвиденная ошибка");
        }
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#4B0082", "#9470DC", "#FED700", "#E5E6FA", "#FF69B3"];

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="analytics-container">
      <h2 className='analytics-title'>Панель аналитики</h2>
      {banksDistribution && (
        <div className="chart-container">
          <h3 className='chart-title'>Распределение косметики по брендам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(banksDistribution).map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {Object.entries(banksDistribution).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};