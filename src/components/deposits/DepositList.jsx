import { useEffect, useState } from 'react';
import { apiDeposits } from '../../api';
import './DepositList.css';


export const DepositList = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await apiDeposits.getDeposits();
        setDeposits(response.data); // Заполняем данные депозитов
        setLoading(false); // Ожидание завершено
      } catch (err) {
        setError('Failed to fetch deposits');
        setLoading(false);

        console.log(err);
      }
    };

    fetchDeposits();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="deposit-list">
    <h2>Список депозитов</h2>
    <ul className="deposit-items">
      {deposits.map((deposit) => (
        <li key={deposit.id} className="deposit-item">
          <h3>{deposit.name}</h3>
          <p>Банк: {deposit.bank}</p>
          <p>Процент: {deposit.percentage}%</p>
          <p>
            Срок действия: {deposit.deposit_start_date} - {deposit.deposit_end_date}
          </p>
          <p>Категория: {deposit.deposits_category}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}
