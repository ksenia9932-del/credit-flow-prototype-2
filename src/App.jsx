import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import PromoPage from './pages/PromoPage'
import ConfirmationPage from './pages/ConfirmationPage'
import PaymentSchedulePage from './pages/PaymentSchedulePage'
import CodePage from './pages/CodePage'
import SuccessPage from './pages/SuccessPage'
import TapIndicator from './components/TapIndicator'
import { LoanProvider } from './context/LoanContext'
import './styles/App.css'

function App() {
  return (
    <LoanProvider>
    <TapIndicator>
    <div className="app">
      <Routes>
        <Route path="/" element={<PromoPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/payment-schedule" element={<PaymentSchedulePage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
    </TapIndicator>
    </LoanProvider>
  )
}

export default App
