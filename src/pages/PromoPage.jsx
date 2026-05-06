import React, { useState, useRef, useCallback, useEffect } from 'react';
import BottomSheet from '../components/BottomSheet';
import TapIndicator from '../components/TapIndicator';
import { useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'
import './PromoPage.css';

export default function PromoPage() {
  const { amount, setAmount, term, setTerm } = useLoan();

  const navigate = useNavigate();

  // Editable input states
  const [isAmountEditing, setIsAmountEditing] = useState(false);
  const [amountInputValue, setAmountInputValue] = useState('');
  const [isTermEditing, setIsTermEditing] = useState(false);
  const [termInputValue, setTermInputValue] = useState('');

  const handleAmountFocus = () => {
    setIsAmountEditing(true);
    setAmountInputValue(String(amount));
  };

  const handleAmountBlur = () => {
    setIsAmountEditing(false);
    let val = parseInt(amountInputValue.replace(/\s/g, ''), 10);
    if (isNaN(val) || val < 50000) val = 50000;
    if (val > 5200000) val = 5200000;
    setAmount(val);
  };

  const handleAmountKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleTermFocus = () => {
    setIsTermEditing(true);
    setTermInputValue(String(term));
  };

  const handleTermBlur = () => {
    setIsTermEditing(false);
    let val = parseInt(termInputValue, 10);
    if (isNaN(val) || val < 3) val = 3;
    if (val > 12) val = 12;
    setTerm(val);
  };

  const handleTermKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value) + ' ₽';

  const formatWhole = (value) =>
    new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' ₽';

  // Расчёт: комиссия 1.49% в месяц от суммы кредита
  const commissionRate = 0.0149;
  const monthlyCommission = amount * commissionRate;
  const monthlyPaymentValue = (amount / term) + monthlyCommission;
  const totalReturnValue = monthlyPaymentValue * term;

  const monthlyPayment = formatCurrency(monthlyPaymentValue);
  const commission = '1,49% в месяц';
  const totalReturn = formatCurrency(totalReturnValue);

  const faqItems = [
    {
      question: 'Что такое оборотный кредит?',
      answer: 'Это краткосрочный кредит для быстрого пополнения оборотных средств. С его помощью можно быстро использовать деньги, вырастить обороты и получить больше прибыли.\nЕсли кредит оформляет ООО, нужно будет подписать договор поручительства.',
    },
    {
      question: 'Что такое комиссия?',
      answer: 'В Оборотном кредите нет процентной ставки, вместо неё — ежемесячная комиссия. Она рассчитывается от первоначально выданной суммы и не меняется в течение срока кредита.\nПервая комиссия списывается сразу при выдаче. Если на счёте не хватит своих денег, спишутся кредитные. Дальше комиссия будет начисляться в дату платежа.',
    },
    {
      question: 'От чего зависит сумма?',
      answer: 'От среднемесячного оборота вашей компании в Точка Банке. Чем больше оборот, тем больше сумма кредита.',
    },
    {
      question: 'На что можно тратить?',
      answer: 'На любые цели, можно даже снимать наличные и переводить физлицам — лимиты зависят от тарифа вашего счёта.\nЕдинственное ограничение: кредитными деньгами нельзя погашать другие кредиты.',
    },
    {
      question: 'Можно ли погасить досрочно?',
      answer: 'Да, полностью или частично и без штрафов. Здесь всё гибко, можно выбрать любой подходящий вариант:\n• Погасить весь кредит\n• Погасить ближайшие платежи\n• Уменьшить срок кредита\n• Уменьшить ежемесячный платёж',
    },
  ];

  const [openFaq, setOpenFaq] = useState([]);
  const [isCommissionSheetOpen, setIsCommissionSheetOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const steps = [
    { number: '1', title: 'Выберите сумму и срок', description: 'В калькуляторе' },
    { number: '2', title: 'Подпишите документы', description: 'На следующем шаге' },
    { number: '3', title: 'Получите деньги', description: 'Они придут на счёт в Точка Банке течение 1-2 рабочих дней' },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isCalcVisible, setIsCalcVisible] = useState(true);
  const trackRef = useRef(null);
  const calculatorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCalcVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (calculatorRef.current) {
      observer.observe(calculatorRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    const cardWidth = track.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveStep(index);
  }, []);

  const scrollToStep = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.offsetWidth;
    track.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  const benefits = [
    { title: 'Оборотный кредит для вашего бизнеса' },
  ];

  return (
    <TapIndicator>
    <div className="promo-page">
      {/* Banner Section */}
      <section className="promo-banner">

        <div className="promo-banner__content">
          <div className="promo-banner__image">
            <img
              src="/assets/images/Promo Page Image.png"
              alt="Промо"
              className="promo-banner__img"
            />
          </div>
          <div className="promo-banner__info">
            <h1 className="promo-banner__title">
              Вам предодобрено<br />
              5&nbsp;200&nbsp;000&nbsp;₽<br />
              на любые цели
            </h1>
            <p className="promo-banner__subtitle">
              Предложение действует до 30 мая
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="promo-calculator" ref={calculatorRef}>
        <div className="promo-calculator__header">
          <h2 className="promo-calculator__title">Выберите условия</h2>
          <p className="promo-calculator__description">
            Кредит предварительно одобрен: выберите сумму, срок и подпишите документы. Мы всё финально проверим и зачислим деньги на ваш счёт.
          </p>
        </div>

        <div className="promo-calculator__fields">
          {/* Amount Slider */}
          <div className="promo-slider-input">
            <span className="promo-slider-input__label">Сумма</span>
            <input
              type="text"
              inputMode="numeric"
              className="promo-slider-input__value promo-slider-input__value--editable"
              value={isAmountEditing ? amountInputValue : formatWhole(amount)}
              onFocus={handleAmountFocus}
              onBlur={handleAmountBlur}
              onKeyDown={handleAmountKeyDown}
              onChange={(e) => setAmountInputValue(e.target.value)}
            />
            <input
              type="range"
              className="promo-slider-input__range"
              min={50000}
              max={5200000}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div className="promo-slider-input__limits">
              <span>от 50 000 ₽</span>
              <span>до 5 200 000 ₽</span>
            </div>
          </div>

          {/* Term Slider */}
          <div className="promo-slider-input">
            <span className="promo-slider-input__label">Срок</span>
            <input
              type="text"
              inputMode="numeric"
              className="promo-slider-input__value promo-slider-input__value--editable"
              value={isTermEditing ? termInputValue : `${term} месяцев`}
              onFocus={handleTermFocus}
              onBlur={handleTermBlur}
              onKeyDown={handleTermKeyDown}
              onChange={(e) => setTermInputValue(e.target.value)}
            />
            <input
              type="range"
              className="promo-slider-input__range"
              min={3}
              max={12}
              step={1}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            />
            <div className="promo-slider-input__limits">
              <span>от 3 месяцев</span>
              <span>до 12 месяцев</span>
            </div>
          </div>

          {/* Summary */}
          <div className="promo-summary">
            <div className="promo-summary__row">
              <span className="promo-summary__label">Ежемесячный платёж</span>
              <span className="promo-summary__value">{monthlyPayment}</span>
            </div>
            <div className="promo-summary__row">
              <span className="promo-summary__label">
                Комиссия
                <button
                  className="promo-summary__info-btn"
                  onClick={() => setIsCommissionSheetOpen(true)}
                  aria-label="Подробнее о комиссии"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 5V5.01M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </span>
              <span className="promo-summary__value">{commission}</span>
            </div>
            <div className="promo-summary__divider" />
            <div className="promo-summary__row promo-summary__row--total">
              <span className="promo-summary__label">Всего к возврату</span>
              <span className="promo-summary__value">{totalReturn}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button 
        className="promo-button promo-button--primary"
        onClick={() => {
          navigate('/confirmation')
          setTimeout(() => window.scrollTo(0, 0), 0)
        }}
        >
          К подписанию документов
          </button>
      </section>

      {/* Benefits Section */}
      <section className="promo-section">
        <h2 className="promo-section__title">Оборотный кредит для&nbsp;вашего бизнеса</h2>
        <div className="promo-cards-list">
          <div className="promo-card">
            <img src="/assets/images/Hand & Money.png" alt="" className="promo-card__img" />
            <div className="promo-card__content">
              <h3 className="promo-card__title">Получите деньги быстро</h3>
              <p className="promo-card__text">Они придут на ваш счёт в Точка Банке за 1‑2 рабочих дня, обычно это занимает всего 15 минут</p>
            </div>
          </div>
          <div className="promo-card">
            <img src="/assets/images/Darts.png" alt="" className="promo-card__img" />
            <div className="promo-card__content">
              <h3 className="promo-card__title">Тратьте на любые цели</h3>
              <p className="promo-card__text">Снимайте наличные, закупайте товары, оплачивайте услуги или рекламу — используйте кредит для любых задач</p>
            </div>
          </div>
          <div className="promo-card">
            <img src="/assets/images/Heart.png" alt="" className="promo-card__img" />
            <div className="promo-card__content">
              <h3 className="promo-card__title">Погашайте досрочно без переплат</h3>
              <p className="promo-card__text">Можно вернуть деньги раньше — частично или полностью, за это нет штрафов</p>
            </div>
          </div>
          <div className="promo-card">
            <img src="/assets/images/Pig With Coins.png" alt="" className="promo-card__img" />
            <div className="promo-card__content">
              <h3 className="promo-card__title">Без залога и запроса документов</h3>
              <p className="promo-card__text">Мы рассчитали условия кредита по вашим оборотам — вам остаётся только взять деньги</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to get money */}
      <section className="promo-section">
        <h2 className="promo-section__title">Как получить деньги</h2>
        <div className="promo-steps-carousel">
          <div
            className="promo-steps-carousel__track"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {steps.map((step) => (
              <div className="promo-step-card" key={step.number}>
                <div className="promo-step-card__number">{step.number}</div>
                <h3 className="promo-step-card__title">{step.title}</h3>
                <p className="promo-step-card__text">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="promo-pager">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`promo-pager__dot${index === activeStep ? ' promo-pager__dot--active' : ''}`}
                onClick={() => scrollToStep(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="promo-section">
        <h2 className="promo-section__title">Частые вопросы</h2>
        <div className="promo-faq">
          {faqItems.map((item, index) => (
            <div
              className={`promo-faq__item${openFaq.includes(index) ? ' promo-faq__item--open' : ''}`}
              key={index}
            >
              <div className="promo-faq__header" onClick={() => toggleFaq(index)}>
                <span className="promo-faq__question">{item.question}</span>
                <svg
                  className={`promo-faq__chevron${openFaq.includes(index) ? ' promo-faq__chevron--open' : ''}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {openFaq.includes(index) && (
                <div className="promo-faq__answer">
                  {item.answer.split('\n').map((line, i) => (
                    <p key={i} className="promo-faq__answer-text">{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Actions Section */}
      <section className="promo-actions">
        <div className="promo-action">
          <div className="promo-action__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6.5V6.51M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="promo-action__content">
            <span className="promo-action__title">О партнёре</span>
            <span className="promo-action__description">
              Кредит выдаёт наш партнёр Т-Банк, а сервис и заботливая поддержка — на стороне Точка Банка
            </span>
          </div>
        </div>
        <div className="promo-action">
          <div className="promo-action__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 15L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5H15V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="promo-action__content">
            <span className="promo-action__title">Полные условия кредита</span>
          </div>
        </div>
        <div className="promo-action">
          <div className="promo-action__icon promo-action__icon--danger">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 14L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="promo-action__content">
            <span className="promo-action__title promo-action__title--danger">Отказаться от предложения</span>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Panel */}
      <div className={`promo-sticky-panel${!isCalcVisible ? ' promo-sticky-panel--visible' : ''}`}>
        <button className="promo-button promo-button--secondary" onClick={scrollToCalculator}>
          К выбору условий
        </button>
      </div>

      {/* Commission Bottom Sheet */}
      <BottomSheet
        isOpen={isCommissionSheetOpen}
        onClose={() => setIsCommissionSheetOpen(false)}
        title="Комиссия"
      >
        <div className="commission-sheet-content">
          <p className="commission-sheet-text">
            Рассчитывается от первоначально выданной суммы и не меняется в течение срока кредита.
          </p>
          <p className="commission-sheet-text">
            Первая комиссия списывается сразу при выдаче. Если на счёте не хватит собственных денег, спишутся кредитные. Дальше комиссия будет начисляться в дату платежа.
          </p>
        </div>
      </BottomSheet>
    </div>
    </TapIndicator>
  );
}
