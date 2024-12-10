import './DepositList.css';

import {
  useEffect,
  useState,
} from 'react';

import { apiDeposits } from '../../../api';
import { SearchBar } from './SearchBar';
import { Tabs } from './Tabs';
import { UpdateDepositPopup } from './UpdateDepositPopup';

export const DepositList = () => {
  const [deposits, setDeposits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
    } catch (error) {
      console.error("Failed to delete deposit:", error);
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
      <h2 className="deposit-list-title">Список вкладов</h2>

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
              <div className="no-deposits">Нет вкладов для отображения.</div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <UpdateDepositPopup
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
