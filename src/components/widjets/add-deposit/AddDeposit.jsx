import { useEffect, useState } from 'react';
import { apiDeposits } from '../../../api';
import './AddDeposit.css';

export const AddDeposit = () => {
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    depositStartDate: '',
    depositEndDate: '',
    percentage: '',
    depositsCategory: '',
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Запрос категорий с бекенда
    const fetchCategories = async () => {
      try {
        const response = await apiDeposits.getCategories();
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Ошибка при загрузке категорий:", err);
        setError('Не удалось загрузить категории.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await apiDeposits.addDeposit(formData);
      setSuccess('Депозит успешно добавлен!');
      setFormData({
        name: '',
        bank: '',
        depositStartDate: '',
        depositEndDate: '',
        percentage: '',
        depositsCategory: '',
      });
    } catch (err) {
      console.error(err);
      setError('Ошибка при добавлении депозита. Проверьте введенные данные.');
    }
  };

  return (
    <div className="add-deposit">
      <h2 className="add-deposit-title">Добавить новый вклад</h2>
      {error && <p className="add-deposit-error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-deposit-form">
        <label className="add-deposit-label">
          Название вклада:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="add-deposit-input"
          />
        </label>
        <label className="add-deposit-label">
          Банк:
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            required
            className="add-deposit-input"
          />
        </label>
        <label className="add-deposit-label">
          Дата начала вклада:
          <input
            type="date"
            name="depositStartDate"
            value={formData.depositStartDate}
            onChange={handleChange}
            required
            className="add-deposit-input"
          />
        </label>
        <label className="add-deposit-label">
          Дата окончания вклада:
          <input
            type="date"
            name="depositEndDate"
            value={formData.depositEndDate}
            onChange={handleChange}
            required
            className="add-deposit-input"
          />
        </label>
        <label className="add-deposit-label">
          Процентная ставка:
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
            step="0.01"
            className="add-deposit-input"
          />
        </label>
        <label className="add-deposit-label">
          Категория вклада:
          <select
            name="depositsCategory"
            value={formData.depositsCategory}
            onChange={handleChange}
            required
            className="add-deposit-select"
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="add-deposit-button">
          Создать
        </button>
        {success && <p className="add-deposit-success">{success}</p>}
      </form>
    </div>
  );
};
