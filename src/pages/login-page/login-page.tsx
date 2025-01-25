import { FormEvent, JSX, useEffect, useRef } from 'react';
import { Helmet} from 'react-helmet-async';
import Header from '../../components/header/header.tsx';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { redirectToRoute } from "../../store/action.ts";
import { cities } from "../../const.ts";
import {toast} from "react-toastify";

type LoginPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function LoginPage({ authorizationStatus }: LoginPageProps): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const getRandomCity = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    return randomCity.name;
  }

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (loginRef.current !== null && passwordRef.current !== null) {
        await dispatch(loginAction({
          email: loginRef.current.value,
          password: passwordRef.current.value
        })).unwrap();
      }
      dispatch((redirectToRoute(AppRoute.Main)));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`'Login failed: ${error.message}`);
      } else {
        toast.error('Login failed: An unknown error occurred');
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <Header isLoginPage />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete='current-password'
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{getRandomCity()}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
