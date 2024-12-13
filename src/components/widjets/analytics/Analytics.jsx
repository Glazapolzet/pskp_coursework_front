import './Analytics.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { apiDeposits } from '../../../api';

export const Analytics = () => {
  const [banksDistribution, setBanksDistribution] = useState(null);
  const [categoryPercentages, setCategoryPercentages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос данных по вкладам
        const depositsResponse = await apiDeposits.analytics();
        const deposits = depositsResponse.data;

        // Обработка распределения по банкам
        const distribution = deposits.reduce((acc, deposit) => {
          acc[deposit.bank] = (acc[deposit.bank] || 0) + 1;
          return acc;
        }, {});

        // Обработка данных для графика максимальных процентов по категориям
        const categoryMaxPercentages = deposits.reduce((acc, deposit) => {

          acc[deposit.depositsCategory] = Math.max(
            acc[deposit.depositsCategory] || 0,
            deposit.percentage
          );
          return acc;
        }, {});

        const categoryData = Object.entries(categoryMaxPercentages).map(
          ([category, percentage]) => ({
            category,
            percentage,
          })
        );

        setBanksDistribution(distribution);
        setCategoryPercentages(categoryData);
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="analytics-container">
      <h2>Аналитика</h2>
      {banksDistribution && (
        <div className="chart-container">
          <h3>Распределение вкладов по банкам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(banksDistribution).map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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

      {categoryPercentages && (
        <div className="chart-container">
          <h3>Максимальные проценты по категориям вкладов</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPercentages} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="percentage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};