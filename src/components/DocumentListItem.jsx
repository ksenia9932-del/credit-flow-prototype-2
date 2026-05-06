import './DocumentListItem.css';

function DocumentListItem({ title, onClick }) {
  return (
    <div className="document-list-item" onClick={onClick} role="button" tabIndex={0}>
      <div className="document-list-item__icon-wrapper">
        <svg className="document-list-item__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6Z" fill="#E53935"/>
          <path d="M13 2V7C13 7.55 13.45 8 14 8H19L13 2Z" fill="#FFCDD2"/>
          <text x="12" y="17" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">PDF</text>
        </svg>
      </div>
      <span className="document-list-item__text">{title}</span>
    </div>
  );
}

export default DocumentListItem;
