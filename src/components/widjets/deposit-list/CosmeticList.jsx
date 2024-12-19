import './CosmeticList.css';

import {
  useEffect,
  useState,
} from 'react';

import { apiDeposits } from '../../../api';
import { SearchBar } from './SearchBar';
import { Tabs } from './Tabs';
import { UpdatePopup } from './UpdatePopup';

export const CosmeticList = () => {
  const [deposits, setDeposits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // Для сообщения об ошибке

  const [isEditing, setIsEditing] = useState(false);
  const [currentDeposit, setCurrentDeposit] = useState(null);

  useEffect(() => {
    const fetchDeposits = async () => {
      const response = await apiDeposits.getDeposits();
      setDeposits(response.data);
    };
    const fetchCategories = async () => {
      const response = await apiDeposits.getCategories();
      setCategories(response.data.categories);
    };

    fetchDeposits();
    fetchCategories();
  }, []);

  const deleteDeposit = async (id) => {
    try {
      await apiDeposits.deleteDeposit(id);
      setDeposits(deposits.filter((deposit) => deposit.id !== id));
      setErrorMessage(null); // Сбрасываем сообщение об ошибке
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("У вас нет прав доступа к операции удаления");
      } else {
        console.error("Failed to delete deposit:", error);
      }
    }
  };

  const openEditPopup = (deposit) => {
    setCurrentDeposit(deposit);
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
    setCurrentDeposit(null);
  };

  const saveChanges = async () => {
    try {
      await apiDeposits.updateDeposit(currentDeposit.id, currentDeposit);
      setDeposits((prev) =>
        prev.map((deposit) =>
          deposit.id === currentDeposit.id ? currentDeposit : deposit
        )
      );
      closeEditPopup();
    } catch (error) {
      console.error("Failed to update deposit:", error);
      setErrorMessage("У вас нет прав доступа к изменению данных");
      closeEditPopup();
    }
  };

  const filteredDeposits = deposits.filter(
    (deposit) =>
      (activeCategory === "all" || deposit.depositsCategory === activeCategory) &&
      (deposit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deposit.bank.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="deposit-list">
      <h2 className="deposit-list-title">Перечень косметики</h2>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <SearchBar searchTerm={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="deposit-content">
        <div className="categories-section">
          <Tabs tabItems={categories} activeTab={activeCategory} setTab={setActiveCategory} />
        </div>
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
                    <button
                      className="edit-button"
                      onClick={() => openEditPopup(deposit)}
                    >
                      Изменить
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-deposits">Косметика по данному запросу не найдена.</div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <UpdatePopup
          deposit={currentDeposit}
          categories={categories}
          onClose={closeEditPopup}
          onSave={saveChanges}
          onChange={setCurrentDeposit}
        />
      )}
    </div>
  );
};