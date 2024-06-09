"use client";

import React from 'react';


export default function Modal (
  { children, show, onClose, title, className, ...rest} : 
  {
    children: React.ReactNode, 
    show: boolean, 
    onClose: () => void,
    title?: string,
    className:string
  }){
    
  if (!show) {
    return null;
  }

  
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal ${className}`}  onClick={stopPropagation}>
        <div className='modal-header'> 
          {title?? 'Modal'} 
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
      <style jsx>{`
        .modal-backdrop {
          z-index: 1;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
        }
        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .modal-header {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
        }

        .modal-header button { 
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }
      `}</style>
    </div>
  );
};
