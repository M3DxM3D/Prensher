/* eslint-disable camelcase */
import { sanitize } from "isomorphic-dompurify";
import { useState, useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./NewPassword.scss";

import axios from "axios";

import AuthContext from "../../contexts/AuthContext";

import Alert from "../../components/Alert/Alert";

import SalesforceLogoSombre from "../../public/assets/logo/logo_SalesForce_Theme_Sombre.svg";
import SalesforceLogoClair from "../../public/assets/logo/logo_SalesForce_Theme_Clair.svg";

export default function NewPassword() {
  const { setUser, setUserInfos, userInfos, userToken } = useContext(AuthContext);

  const [hasConnectionFailed, setHasConnectionFailed] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = sanitize(searchParams.get("email"));
    const tempPassword = sanitize(searchParams.get("temporary_code"));

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        email,
        password: tempPassword,
      })
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfos(
            response.data.user,
            response.data.role,
            response.data.companies
          );
          setHasConnectionFailed(false);
        } else {
          setHasConnectionFailed(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setHasConnectionFailed(true);
      });
  }, [searchParams]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    delete dataFromForm["password-confirmation"];

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userInfos.id}`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setUserInfos(response.data);
        setAlertMessage({
          type: "success",
          message:
            "Le mot de passe a bien été mis à jour ! Vous pouvez vous connecter à votre compte.",
          icon: "check-circle",
          children: (
            <Link to={`/home`} className="button-md-success-link">
              Me connecter
            </Link>
          ),
        });
      })
      .catch(() => {
        setAlertMessage({
          type: "error",
          message:
            "Impossible de modifier votre mot de passe. Veuillez réessayer.",
          icon: "cross-circle",
        });
      });
  };

  return hasConnectionFailed ? (
    <div className="temporary-password-fail">
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-cross-circle" />
          </div>
          <div className="content">
            <h3>Oups !</h3>
            <div className="details">
              <p>Il semblerait que votre lien ne soit plus valide.</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <Link
            to={`/password-reset`}
            className="button-md-primary-link"
          >
            Renvoyer un lien
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div id="new-password">
      <div className="page">
        <div className="content">
          <header>
            <h1>Nouveau mot de passe</h1>
            <p>Renseignez votre nouveau mot de passe.</p>
          </header>
          <form className="new-password-form" onSubmit={handleFormSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password">Mot de passe (obligatoire)</label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    id="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(sanitize(event.target.value));
                    }}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password-confirmation">
                  Confirmation (obligatoire)
                </label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    name="password-confirmation"
                    placeholder="•••••••••••"
                    id="password-confirmation"
                    value={passwordConfirmation}
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="button-lg-primary-solid">
              Enregistrer
            </button>
          </form>
          {alertMessage && (
            <Alert
              type={alertMessage.type}
              text={alertMessage.message}
              icon={alertMessage.icon}
            >
              {alertMessage.children ? alertMessage.children : null}
            </Alert>
          )}
        </div>
        <a
          className="salesforce-logo-desktop"
          href="https://www.salesforce.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={SalesforceLogoSombre}
            alt="Logo Salesforce"
            className="salesforce-logo"
          />
        </a>
      </div>
      <div className="image" />
      <a
        className="salesforce-logo-mobile"
        href="https://www.salesforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={SalesforceLogoClair}
          alt="Logo Salesforce"
          className="salesforce-logo"
        />
      </a>
    </div>
  );
}
