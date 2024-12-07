import PropTypes from "prop-types";
import "./UpdateDepositPopup.css";

export const UpdateDepositPopup = ({
  deposit,
  categories,
  onClose,
  onSave,
  onChange,
}) => {
  if (!deposit) return null;

  return (
    <div className="edit-popup">
      <div className="edit-popup-content">
        <h3>Редактирование вклада</h3>
        <label>
          Название:
          <input
            type="text"
            value={deposit.name}
            onChange={(e) => onChange({ ...deposit, name: e.target.value })}
          />
        </label>
        <label>
          Банк:
          <input
            type="text"
            value={deposit.bank}
            onChange={(e) => onChange({ ...deposit, bank: e.target.value })}
          />
        </label>
        <label>
          Дата начала:
          <input
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
        <button onClick={onSave} className="save-button">
          Сохранить изменения
        </button>
        <button onClick={onClose} className="cancel-button">
          Отмена
        </button>
      </div>
    </div>
  );
};

UpdateDepositPopup.propTypes = {
  deposit: PropTypes.object,
  categories: PropTypes.array,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
}
