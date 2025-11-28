import React from 'react';
import '../../styles/PriceNotification.css';

const PriceNotification = ({ changes, onDismiss }) => {
  if (!changes || changes.length === 0) return null;

  return (
    <div className="price-notification-container">
      <div className="price-notification">
        <div className="notification-header">
          <span className="notification-icon">💰</span>
          <h3>¡Cambios de precio detectados!</h3>
          <button className="close-btn" onClick={onDismiss}>×</button>
        </div>
        <div className="notification-body">
          {changes.map((change, index) => (
            <div key={index} className="price-change-item">
              <span className="package-title">{change.title}</span>
              <div className="price-comparison">
                <span className="old-price">${change.oldPrice.toLocaleString()}</span>
                <span className="arrow">→</span>
                <span className={`new-price ${change.newPrice < change.oldPrice ? 'decreased' : 'increased'}`}>
                  ${change.newPrice.toLocaleString()}
                </span>
                {change.newPrice < change.oldPrice ? (
                  <span className="badge discount">¡Descuento!</span>
                ) : (
                  <span className="badge increase">Aumento</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceNotification;