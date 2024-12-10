import './DepositList.css';

import {
  useEffect,
  useState,
} from 'react';

import { apiDeposits } from '../../../api';
import { SearchBar } from './SearchBar';

export const DepositList = () => {
  const [deposits, setDeposits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // Для сообщения об ошибке

  useEffect(() => {
    const fetchDeposits = async () => {
      const response = await apiDeposits.getDeposits();
      setDeposits(response.data);
    };

    fetchDeposits();
  }, []);

  const deleteDeposit = async (id) => {
    try {
      await apiDeposits.deleteDeposit(id);
      setDeposits(deposits.filter((deposit) => deposit.id !== id));
      setErrorMessage(null); // Сбрасываем сообщение об ошибке
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Вы не обладаете правами администратора для этой операции");
      } else {
        console.error("Failed to delete deposit:", error);
      }
    }
  };

  const filteredDeposits = deposits.filter(
    (deposit) =>
      (deposit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deposit.bank.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="deposit-list">
      <h2 className="deposit-list-title">Список вкладов</h2>

      <SearchBar searchTerm={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <div className="deposit-content">
        <div className="results-section">
          <div className="deposit-table">
            <div className="deposit-row deposit-header">
              <div>Название</div>
              <div>Банк</div>
              <div>Начало</div>
              <div>Конец</div>
              <div>Процент</div>
              <div>Действия</div>
            </div>
            {filteredDeposits.length > 0 ? (
              filteredDeposits.map((deposit) => (
                <div className="deposit-row" key={deposit.id}>
                  <div>{deposit.name}</div>
                  <div>{deposit.bank}</div>
                  <div>{deposit.depositStartDate}</div>
                  <div>{deposit.depositEndDate}</div>
                  <div>{deposit.percentage}%</div>
                  <div className="button-container">
                    <button
                      className="delete-button"
                      onClick={() => deleteDeposit(deposit.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-deposits">Ничего не найдено.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
