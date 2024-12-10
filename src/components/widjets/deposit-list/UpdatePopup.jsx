import './UpdatePopup.css';

import PropTypes from 'prop-types';

export const UpdatePopup = ({
  deposit,
  categories,
  onClose,
  onSave,
  onChange,
}) => {
  if (!deposit) return null;

  const handleClose = (e) => {
    e.preventDefault();

    onClose();
  }

  const handleSave = (e) => {
    e.preventDefault();

    onSave();
  }

  return (
    <div className="edit-popup">
      <form className="edit-popup-content" onSubmit={handleSave}>
        <h3>Редактировать данные</h3>
        <label>
          Название:
          <input
            required
            type="text"
            value={deposit.name}
            onChange={(e) => onChange({ ...deposit, name: e.target.value })}
          />
        </label>
        <label>
          Банк:
          <input
            required
            type="text"
            value={deposit.bank}
            onChange={(e) => onChange({ ...deposit, bank: e.target.value })}
          />
        </label>
        <label>
          Дата начала:
          <input
            required
            type="date"
            value={deposit.depositStartDate}
            onChange={(e) =>
              onChange({ ...deposit, depositStartDate: e.target.value })
            }
          />
        </label>
        <label>
          Дата окончания:
          <input
            required
            type="date"
            value={deposit.depositEndDate}
            onChange={(e) =>
              onChange({ ...deposit, depositEndDate: e.target.value })
            }
          />
        </label>
        <label>
          Процент:
          <input
            required
            type="number"
            value={deposit.percentage}
            onChange={(e) =>
              onChange({ ...deposit, percentage: e.target.value })
            }
          />
        </label>
        <label>
          Категория:
          <select
            value={deposit.depositsCategory}
            onChange={(e) =>
              onChange({ ...deposit, depositsCategory: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button className="save-button">
          Сохранить изменения
        </button>
        <button onClick={handleClose} className="cancel-button">
          Отмена
        </button>
      </form>
    </div>
  );
};

UpdatePopup.propTypes = {
  deposit: PropTypes.object,
  categories: PropTypes.array,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
}
