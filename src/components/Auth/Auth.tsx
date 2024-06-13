import { FC, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setProfile } from '../../app/profileSlice';
import Api from '../../api/api';
import './index.css';

type TProps = {
  closeModal: () => void;
};

const Auth: FC<TProps> = ({ closeModal }) => {
  const formLoginRef = useRef<HTMLFormElement>(null);
  const formRegistrationRef = useRef<HTMLFormElement>(null);
  const divSuccessRef = useRef<HTMLDivElement>(null);
  const emailWrapperRef = useRef<HTMLDivElement>(null);
  const emailWrapperLoginRef = useRef<HTMLDivElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);
  const surnameWrapperRef = useRef<HTMLDivElement>(null);
  const passwordWrapperLoginRef = useRef<HTMLDivElement>(null);
  const passwordWrapperRef = useRef<HTMLDivElement>(null);
  const passwordСheckWrapperRef = useRef<HTMLDivElement>(null);
  const errorTextRef = useRef<HTMLSpanElement>(null);

  const dispatch = useAppDispatch();

  const [emailValue, setEmailValue] = useState<string>('');
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
    emailWrapperRef.current!.classList.remove('login__wrapper--warning');
    emailWrapperLoginRef.current!.classList.remove('login__wrapper--warning');
    errorTextRef.current!.textContent = '';
  };

  const [nameValue, setNameValue] = useState<string>('');
  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNameValue(event.currentTarget.value);
    nameWrapperRef.current!.classList.remove('login__wrapper--warning');
    errorTextRef.current!.textContent = '';
  };

  const [surnameValue, setSurnameValue] = useState<string>('');
  const handleSurnameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSurnameValue(event.currentTarget.value);
    surnameWrapperRef.current!.classList.remove('login__wrapper--warning');
    errorTextRef.current!.textContent = '';
  };

  const [passwordValue, setPasswordValue] = useState<string>('');
  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
    passwordWrapperRef.current!.classList.remove('login__wrapper--warning');
    passwordWrapperLoginRef.current!.classList.remove('login__wrapper--warning');
    errorTextRef.current!.textContent = '';
  };

  const [passwordCheckValue, setPasswordValueСheck] = useState<string>('');
  const handlePasswordСheckChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPasswordValueСheck(event.currentTarget.value);
    passwordСheckWrapperRef.current!.classList.remove('login__wrapper--warning');
    errorTextRef.current!.textContent = '';
  };

  const loginAction = async (): Promise<void> => {
    const data = await Api.login(emailValue, passwordValue);
    if (data.result === true) {
      sessionStorage.setItem('auth', JSON.stringify({ emailValue, passwordValue }));
      profileAction();
      closeModal();
    } else {
      emailWrapperLoginRef.current!.classList.add('login__wrapper--warning');
      passwordWrapperLoginRef.current!.classList.add('login__wrapper--warning');
    }
  };

  const profileAction = async (): Promise<void> => {
    const data = await Api.getProfile();
    if (data.surname) dispatch(setProfile(data));
  };

  const registrationAction = async (): Promise<void> => {
    const data = await Api.registration(emailValue, passwordValue, nameValue, surnameValue);
    if (data.success === true) handleGoToSuccess();
    else if (data.error) errorTextRef.current!.textContent = data.error;
  };

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (/.+@.+\..+/i.test(emailValue) && passwordValue) {
      loginAction();
    } else {
      if (!/.+@.+\..+/i.test(emailValue)) emailWrapperLoginRef.current!.classList.add('login__wrapper--warning');
      if (!passwordValue) passwordWrapperLoginRef.current!.classList.add('login__wrapper--warning');
    }
  };

  const handleRegistration = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      /.+@.+\..+/i.test(emailValue) &&
      nameValue &&
      surnameValue &&
      passwordValue &&
      passwordValue === passwordCheckValue
    ) {
      registrationAction();
    } else {
      if (!/.+@.+\..+/i.test(emailValue)) emailWrapperRef.current!.classList.add('login__wrapper--warning');
      if (!nameValue) nameWrapperRef.current!.classList.add('login__wrapper--warning');
      if (!surnameValue) surnameWrapperRef.current!.classList.add('login__wrapper--warning');
      if (!passwordValue) passwordWrapperRef.current!.classList.add('login__wrapper--warning');
      if (!passwordCheckValue || passwordValue !== passwordCheckValue)
        passwordСheckWrapperRef.current!.classList.add('login__wrapper--warning');
    }
  };

  const handleGoToRegistration = () => {
    setEmailValue('');
    setNameValue('');
    setSurnameValue('');
    setPasswordValue('');
    setPasswordValueСheck('');

    emailWrapperRef.current!.classList.remove('login__wrapper--warning');
    nameWrapperRef.current!.classList.remove('login__wrapper--warning');
    surnameWrapperRef.current!.classList.remove('login__wrapper--warning');
    passwordWrapperRef.current!.classList.remove('login__wrapper--warning');
    passwordСheckWrapperRef.current!.classList.remove('login__wrapper--warning');

    formRegistrationRef.current!.classList.add('login__form--visible');
    formLoginRef.current!.classList.remove('login__form--visible');
  };

  const handleGoToLogin = () => {
    setEmailValue('');
    setPasswordValue('');

    emailWrapperLoginRef.current!.classList.remove('login__wrapper--warning');
    passwordWrapperLoginRef.current!.classList.remove('login__wrapper--warning');

    formLoginRef.current!.classList.add('login__form--visible');
    formRegistrationRef.current!.classList.remove('login__form--visible');
    divSuccessRef.current!.classList.remove('login__form--visible');
  };

  const handleGoToSuccess = () => {
    formRegistrationRef.current!.classList.remove('login__form--visible');
    divSuccessRef.current!.classList.add('login__form--visible');
  };

  return (
    <>
      <form ref={formLoginRef} className="login__form login__form--visible">
        <div ref={emailWrapperLoginRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handleEmailChange}
            value={emailValue}
            className="login__input"
            type="email"
            placeholder="Электронная почта"
            id="loginEmail"
          />
        </div>
        <div ref={passwordWrapperLoginRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handlePasswordChange}
            value={passwordValue}
            className="login__input"
            type="password"
            placeholder="Пароль"
            id="loginPassword"
          />
        </div>
        <button onClick={handleLogin} type="submit" className="btn-reset btn-primary login__btn">
          Войти
        </button>
        <button onClick={handleGoToRegistration} className="btn-reset login__link" type="button">
          Регистрация
        </button>
      </form>

      <form ref={formRegistrationRef} className="login__form">
        <h3 className="login__title">Регистрация</h3>
        <div ref={emailWrapperRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handleEmailChange}
            value={emailValue}
            className="login__input"
            type="email"
            placeholder="Электронная почта"
            id="email"
          />
        </div>

        <div ref={nameWrapperRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handleNameChange}
            value={nameValue}
            className="login__input"
            type="text"
            placeholder="Имя"
            id="name"
          />
        </div>

        <div ref={surnameWrapperRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handleSurnameChange}
            value={surnameValue}
            className="login__input"
            type="text"
            placeholder="Фамилия"
            id="surname"
          />
        </div>

        <div ref={passwordWrapperRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handlePasswordChange}
            value={passwordValue}
            className="login__input"
            type="password"
            placeholder="Пароль"
            id="password"
          />
        </div>

        <div ref={passwordСheckWrapperRef} className="login__wrapper">
          <svg
            className="login__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
              fillOpacity="0.4"
            />
          </svg>
          <input
            onChange={handlePasswordСheckChange}
            value={passwordCheckValue}
            className="login__input"
            type="password"
            placeholder="Подтвердите пароль"
            id="passwordCheck"
          />
        </div>

        <button onClick={handleRegistration} type="submit" className="btn-reset btn-primary login__btn">
          Создать аккаунт
        </button>
        <button onClick={handleGoToLogin} className="btn-reset login__link" type="button">
          У меня есть пароль
        </button>
        <span ref={errorTextRef} className="login__error"></span>
      </form>

      <div ref={divSuccessRef} className="login__form">
        <h3 className="login__title">Регистрация завершена</h3>
        <span className="login__text">Используйте вашу электронную почту для входа</span>
        <button onClick={handleGoToLogin} type="button" className="btn-reset btn-primary login__btn">
          Войти
        </button>
      </div>
    </>
  );
};

export default Auth;
