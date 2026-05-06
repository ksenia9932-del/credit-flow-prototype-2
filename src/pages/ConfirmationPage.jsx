import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import DocumentListItem from '../components/DocumentListItem';
import BottomSheet from '../components/BottomSheet';
import { useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'
import './ConfirmationPage.css';

const documents = [
  'Кредитный договор с Т-Банком',
  'Согласие на проверку и передачу кредитной истории для Т-Банка',
  'Согласие на хранение и передачу персональных данных для Т-Банка',
  'Заявление ЗДА для Точка Банка',
  'Согласие на передачу банковской тайны для Точка Банка',
  'Договор поручительства с Т-Банком',
];

const accounts = [
  { id: 1, balance: '167 765,89 ₽', name: 'Расчётный', lastDigits: '9804' },
  { id: 2, balance: '120 900 ₽', name: 'Корпоративный', lastDigits: '8945' },
];

function ConfirmationPage() {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigate = useNavigate()
  const { amount, term } = useLoan()

  const commissionRate = 0.0149

const principalPart = amount / term
const commission = amount * commissionRate
const monthlyPayment = principalPart + commission
const totalReturn = monthlyPayment * term

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setIsSheetOpen(false);
  };

  return (
    <div className="confirmation-page">
      {/* Header */}
      <header className="confirmation-header">
        <button 
        className="confirmation-header__back" 
        aria-label="Назад"
        onClick={() => navigate('/')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="confirmation-header__progress">
          <div className="progress-step progress-step--completed"></div>
          <div className="progress-step progress-step--active"></div>
        </div>
      </header>

      {/* Заголовок */}
      <h1 className="confirmation-title">
        Проверьте всё перед тем, как взять кредит
      </h1>

      {/* Карточка с условиями кредита */}
      <Card className="confirmation-terms">
        <div className="terms-row">
          <span className="terms-label">Сумма</span>
          <span className="terms-value">{amount.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="terms-row">
          <span className="terms-label">Срок</span>
          <span className="terms-value">{term} месяцев</span>
        </div>
        <div className="terms-row">
          <span className="terms-label">Ежемесячный платёж</span>
          <span className="terms-value">
            {monthlyPayment.toLocaleString('ru-RU', {
  maximumFractionDigits: 2,
})} ₽, <Link to="/payment-schedule" className="terms-link">график платежей</Link>
          </span>
        </div>
        <div className="terms-row">
          <span className="terms-label">Комиссия</span>
          <span className="terms-value">1,49% в месяц</span>
        </div>
        <div className="terms-divider"></div>
        <div className="terms-row terms-row--total">
          <span className="terms-label">Всего к возврату</span>
          <span className="terms-value terms-value--bold">{totalReturn.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽</span>
        </div>
      </Card>

      {/* Куда зачислить деньги */}
      <section className="confirmation-section">
        <h2 className="confirmation-section__title">Куда зачислить деньги</h2>
        <Card className="account-card" onClick={() => setIsSheetOpen(true)}>
          <div className="account-card__content">
            <div className="account-card__info">
              <span className="account-card__label">Счёт</span>
              <span className="account-card__details">
                {selectedAccount.balance} — {selectedAccount.name}, **{selectedAccount.lastDigits}
              </span>
            </div>
            <div className="account-card__actions">
              <span className="account-card__flag" aria-label="Флаг РФ">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="5.33" fill="white" rx="1"/>
                  <rect y="5.33" width="24" height="5.33" fill="#0039A6"/>
                  <rect y="10.67" width="24" height="5.33" fill="#D52B1E" rx="1"/>
                </svg>
              </span>
              <svg className="account-card__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Card>
      </section>

      {/* Инфо-плашка */}
      <div className="confirmation-info-banner">
        <svg className="confirmation-info-banner__icon" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 4.5C9.55228 4.5 10 4.94772 10 5.5C10 6.05228 9.55228 6.5 9 6.5C8.44772 6.5 8 6.05228 8 5.5C8 4.94772 8.44772 4.5 9 4.5ZM9 7.5C9.41421 7.5 9.75 7.83579 9.75 8.25V12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75V8.25C8.25 7.83579 8.58579 7.5 9 7.5Z"/>
        </svg>
        <p className="confirmation-info-banner__text">
          Первая комиссия списывается сразу при выдаче. Если на счёте не хватит собственных денег, спишутся кредитные.
        </p>
      </div>

      {/* Документы на подпись */}
      <section className="confirmation-section">
        <h2 className="confirmation-section__title">Документы на подпись</h2>
        <div className="confirmation-documents">
          {documents.map((doc, index) => (
            <DocumentListItem key={index} title={doc} onClick={() => {}} />
          ))}
        </div>
      </section>

      {/* Кнопка */}
      <div className="confirmation-footer">
        <Button 
        onClick={() => navigate('/code')}
        >
          Подписать и получить деньги</Button>
      </div>

      {/* Bottom Sheet для выбора счёта */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Со счёта"
      >
        <div className="account-list">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`account-list-item ${selectedAccount.id === account.id ? 'account-list-item--selected' : ''}`}
              onClick={() => handleAccountSelect(account)}
            >
              <div className="account-list-item__flag">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="5.33" fill="white" rx="1"/>
                  <rect y="5.33" width="24" height="5.33" fill="#0039A6"/>
                  <rect y="10.67" width="24" height="5.33" fill="#D52B1E" rx="1"/>
                </svg>
              </div>
              <div className="account-list-item__info">
                <span className="account-list-item__balance">{account.balance}</span>
                <span className="account-list-item__name">{account.name}, **{account.lastDigits}</span>
              </div>
              {selectedAccount.id === account.id && (
                <svg className="account-list-item__check" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}

export default ConfirmationPage;
