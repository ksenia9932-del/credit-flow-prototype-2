import './Button.css';

function Button({ children, onClick, className = '' }) {
  return (
    <button className={`btn btn-primary ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
