import { FC } from 'react';
import Modal from 'react-modal';
import Auth from '../Auth/Auth';
import './index.css';

type TProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

export const ModalAuth: FC<TProps> = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
      appElement={document.getElementById('root') || undefined}
      className="modal-auth"
      overlayClassName="overlay-auth"
    >
      <button onClick={() => closeModal()} className="modal-auth__btn-close btn-reset">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white" />
          <path
            d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z"
            fill="black"
          />
        </svg>
      </button>

      <img className="modal-auth__logo" src="/images/logo.svg" alt="logo" />

      <div className="modal-auth__content">
        <Auth closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default ModalAuth;
