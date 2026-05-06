import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
import './SuccessPage.css';

function SuccessPage() {
  const navigate = useNavigate()
  return (
    <div className="success-page">
      <div className="success-page__content">
        <div className="success-page__icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18.5L15 24.5L27 12.5"
              stroke="#5cad9a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="success-page__title">Почти готово!</h1>

        <p className="success-page__text">
          Проводим финальную проверку перед выдачей кредита.
        </p>

        <p className="success-page__text">
          Деньги придут на счёт в течение 1-2 рабочих дней. Обычно это занимает 15&nbsp;минут.
        </p>
      </div>

      <div className="success-page__footer">
        <Button onClick={() => navigate('/')}>Готово</Button>
      </div>
    </div>
  );
}

export default SuccessPage;
