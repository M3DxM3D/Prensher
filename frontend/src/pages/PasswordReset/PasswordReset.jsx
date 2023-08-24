/* eslint-disable camelcase */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./PasswordReset.scss";

import axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import Alert from "../../components/Alert/Alert";


export default function PasswordReset() {
  const { userToken } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const style = getComputedStyle(document.body);
    const primary600 = style.getPropertyValue("--primary-600");
    const grey50 = style.getPropertyValue("--grey-50");

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    dataFromForm.primary600 = primary600;
    dataFromForm.grey50 = grey50;

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/password-reset`, dataFromForm, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        setAlertMessage({
          type: "success",
          message: "L'email a bien été envoyé",
          icon: "envelope-open-text",
        });
        setEmail("");
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      })
      .catch((error) => {
        setAlertMessage({
          type: "error",
          message: "Impossible d'envoyer l'email à cette adresse",
          icon: "envelope-ban",
        });
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        console.error(error.message);
      });
  };

  return (
    <div id="password-reset">
      <div className="page">
        <div className="content">
          <header>
            <h1>Mot de passe oublié ?</h1>
            <p>Un email vous sera envoyé pour réinitialiser votre mot de passe.</p>
          </header>
          <form className="sign-in" onSubmit={handleFormSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="email">Adresse email</label>
                <div className="input">
                  <i className="fi fi-rr-envelope" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre adresse email"
                    id="email"
                    value={email}
                    autoComplete="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setAlertMessage("");
                    }}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="button-lg-primary-solid">
              Envoyer
            </button>
            <Link to={`/home`} className="button-md-primary-link forgotten-password">
              Déjà un compte ? Me connecter
            </Link>
          </form>
          {alertMessage && (
            <Alert
              type={alertMessage.type}
              text={alertMessage.message}
              icon={alertMessage.icon}
            />
          )}
        </div>
     
      </div>
      <div className="image" />
      
    </div>
  );
}
