import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'
import './CodePage.css';

function CodePage() {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);

  const navigate = useNavigate()
  const { amount, term } = useLoan()

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (newCode.every((digit) => digit !== '')) {
  navigate('/success');
}

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    if (newCode.every((digit) => digit !== '')) {
  navigate('/success');
}
    const focusIndex = Math.min(pastedData.length, 4);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="code-page">
      {/* Close button */}
      <button 
      className="code-page__close-btn" 
      aria-label="Закрыть"
      onClick={() => navigate('/confirmation')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Title */}
      <h1 className="code-page__title">Введите код №1</h1>

      {/* Description */}
      <p className="code-page__description">
        Мы отправили пятизначный код<br />
        в пуш-уведомлении или смс
      </p>

      {/* Code input */}
      <div className="code-page__input-group">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="code-page__input-cell"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {/* Details card */}
      <div className="code-page__card">
        <div className="code-page__card-title">Вы берёте Оборотный кредит</div>
        <div className="code-page__card-block">
          <div className="code-page__card-primary">{amount.toLocaleString('ru-RU')} ₽ на {term} месяцев</div>
          <div className="code-page__card-secondary">Комиссия 1,49% в месяц</div>
        </div>
        <div className="code-page__card-block">
          <div className="code-page__card-primary">167 765,89 ₽ — Расчётный, **9804</div>
          <div className="code-page__card-secondary">Зачислим на счёт</div>
        </div>
      </div>

      {/* Footer link */}
      <div className="code-page__footer">
        <p className="code-page__resend">
          <span className="code-page__resend-text">Не приходит код? </span>
          <button className="code-page__resend-link">Отправьте ещё один</button>
        </p>
      </div>
    </div>
  );
}

export default CodePage;
