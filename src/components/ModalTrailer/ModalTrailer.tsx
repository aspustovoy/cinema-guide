import { FC, useRef, useState } from 'react';
import { IMovie } from '../../models';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import './index.css';

type TProps = {
  data: IMovie;
  modalIsOpen: boolean;
  closeModal: () => void;
};

export const ModalTrailer: FC<TProps> = ({ data, modalIsOpen, closeModal }) => {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);

  const [IsPlay, setIsPlay] = useState(true);

  function play() {
    setIsPlay(true);
  }

  const handlePlay = () => {
    spinnerRef.current!.style.display = 'none';

    closeRef.current!.classList.add('modal-trailer__btn-close--unvisible');
    closeRef.current!.classList.remove('modal-trailer__btn-close');

    titleRef.current!.classList.remove('modal-trailer__title');

    playRef.current!.classList.remove('modal-trailer__play-icon');
  };

  const handlePause = () => {
    setIsPlay(false);
    closeRef.current!.classList.add('modal-trailer__btn-close');
    titleRef.current!.classList.add('modal-trailer__title');
    playRef.current!.classList.add('modal-trailer__play-icon');
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
      appElement={document.getElementById('root') || undefined}
      className="modal-trailer"
      overlayClassName="overlay-trailer"
    >
      <button ref={closeRef} onClick={() => closeModal()} className="modal-trailer__btn-close btn-reset">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white" />
          <path
            d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z"
            fill="black"
          />
        </svg>
      </button>

      <div className="modal-trailer__play-icon--unvisible" ref={playRef}>
        <button className="btn-reset" onClick={play}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="40" fill="white" />
            <path
              d="M30 53.6595V26.3404C30 25.0313 31.4399 24.2332 32.55 24.927L54.4053 38.5867C55.4498 39.2393 55.4498 40.7605 54.4053 41.4133L32.55 55.0728C31.4399 55.7667 30 54.9687 30 53.6595Z"
              fill="black"
            />
          </svg>
        </button>
      </div>

      <div className="modal-trailer__title--unvisible" ref={titleRef}>
        <span>{data.title}</span>
      </div>

      <div className="modal-trailer__container">
        <div className="spinner" ref={spinnerRef}>
          <svg
            className="spinner"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.6067 9.3934L28.2495 11.7504C26.1383 9.63917 23.2217 8.33333 20 8.33333C13.5567 8.33333 8.33333 13.5567 8.33333 20C8.33333 26.4433 13.5567 31.6667 20 31.6667C26.4433 31.6667 31.6667 26.4433 31.6667 20H35C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5C24.1422 5 27.8922 6.67893 30.6067 9.3934Z"
              fill="white"
            />
          </svg>
        </div>

        <ReactPlayer
          url={data.trailerUrl}
          className="react-player"
          width="100%"
          height="100%"
          playing={IsPlay}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
    </Modal>
  );
};

export default ModalTrailer;
