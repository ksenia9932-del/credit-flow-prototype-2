import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomSheet from '../components/BottomSheet';
import { useLoan } from '../context/LoanContext'
import './PaymentSchedulePage.css';


function PaymentSchedulePage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { amount, term } = useLoan()

  const commissionRate = 0.0149
const principalPart = amount / term
const commission = amount * commissionRate
const monthlyPayment = principalPart + commission

  const payments = Array.from({ length: term + 1 }, (_, index) => {
    const date = index === 0
    ? new Date(2025, 4, 1)
    : new Date(2025, 4 + index - 1, 2)

  const isFirstPayment = index === 0
  const isLastPayment = index === term

  return {
    id: index + 1,
    number: index + 1,
    dateLabel: date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  }),
    year: date.getFullYear(),

    amount: isFirstPayment
    ? commission
    : isLastPayment
      ? principalPart
      : principalPart + commission,

principal: isFirstPayment ? 0 : principalPart,

commission: isFirstPayment
  ? commission
    : isLastPayment
      ? 0
      : commission,
  }

}).filter((payment) => payment.year === selectedYear)

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="payment-schedule-page">
      {/* Header */}
      <header className="payment-schedule-header">
        <button
          className="payment-schedule-header__back"
          aria-label="Назад"
          onClick={() => navigate('/confirmation')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="payment-schedule-header__title">График платежей</h1>
        <div className="payment-schedule-header__spacer"></div>
      </header>

      {/* Инфо-плашка */}
      <div className="payment-schedule-info">
        <svg className="payment-schedule-info__icon" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 4.5C9.55228 4.5 10 4.94772 10 5.5C10 6.05228 9.55228 6.5 9 6.5C8.44772 6.5 8 6.05228 8 5.5C8 4.94772 8.44772 4.5 9 4.5ZM9 7.5C9.41421 7.5 9.75 7.83579 9.75 8.25V12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75V8.25C8.25 7.83579 8.58579 7.5 9 7.5Z"/>
        </svg>
        <p className="payment-schedule-info__text">
          Это предварительный расчёт. Точные даты и суммы покажем после подписания документов.
        </p>
      </div>

      {/* Переключатель годов */}
      <div className="payment-schedule-years">
        <button
          className={`payment-schedule-years__btn ${selectedYear === 2025 ? 'payment-schedule-years__btn--active' : ''}`}
          onClick={() => setSelectedYear(2025)}
        >
          2025
        </button>
        <button
          className={`payment-schedule-years__btn ${selectedYear === 2026 ? 'payment-schedule-years__btn--active' : ''}`}
          onClick={() => setSelectedYear(2026)}
        >
          2026
        </button>
      </div>

      {/* Список платежей */}
      <div className="payment-schedule-list">
        {payments.map((payment) => (
          <div
            className="payment-schedule-item"
            key={payment.id}
            onClick={() => handlePaymentClick(payment)}
          >
            <div className="payment-schedule-item__circle">
              <span className="payment-schedule-item__number">{payment.number}</span>
            </div>
            <div className="payment-schedule-item__content">
              <span className="payment-schedule-item__date">
  {payment.dateLabel}
</span>

<span className="payment-schedule-item__amount">
  {Math.round(payment.amount).toLocaleString('ru-RU')} ₽
</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet с расшифровкой платежа */}
      <BottomSheet
  isOpen={isSheetOpen}
  onClose={handleSheetClose}
  title={selectedPayment ? `Платёж ${selectedPayment.dateLabel}` : ''}
>
  {selectedPayment && (
    <div className="payment-detail">
      <div className="payment-detail__row">
        <span className="payment-detail__label">Основной долг</span>
        <span className="payment-detail__value">
          {Math.round(selectedPayment.principal).toLocaleString('ru-RU')} ₽
        </span>
      </div>

      <div className="payment-detail__row">
        <span className="payment-detail__label">Комиссия</span>
        <span className="payment-detail__value">
          {Math.round(selectedPayment.commission).toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </div>
  )}
</BottomSheet>
    </div>
  );
}

export default PaymentSchedulePage;
