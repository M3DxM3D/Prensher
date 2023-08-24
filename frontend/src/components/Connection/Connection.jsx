import { sanitize } from "isomorphic-dompurify";
import { useState, useContext } from "react";
import "./Connection.scss";

import axios from "axios";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

import Alert from "../Alert/Alert";

export default function Connection() {
  const { setUser, setUserInfos } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [failedConnectionInfos, setFailedConnectionInfos] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const dataFromForm = {
      email: sanitize(email),
      password: sanitize(password),
    };

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        dataFromForm
      )
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfos(
            response.data.user,
            response.data.role,
            response.data.companies
          );
        } else {
          setHasConnectionFailed(true);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setFailedConnectionInfos({
            message:
              "Les identifiants saisis semblent incorrects. Veuillez réessayer.",
            icon: "diamond-exclamation",
          });
        } else if (error.response && error.response.status === 403) {
          setFailedConnectionInfos({
            message:
              "Vous ne disposez pas des droits nécessaires pour vous connecter.",
            icon: "lock",
          });
        } else if (error.response && error.response.status === 500) {
          setFailedConnectionInfos({
            message: "Une erreur est survenue. Veuillez réessayer.",
            icon: "cross-circle",
          });
        } else {
          console.error(error);
        }
        setHasConnectionFailed(true);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

  return (
    <div id="sign-in">
      <div className="page">
        <div className="content">
          <header>
            <h1>Bienvenue sur Prensher</h1>
            <h2>
             Le site où tu <span>prends...</span>tu <span>shares...</span> et si tu rends pas... tu <span>prends cher</span> !
            </h2>
          </header>
            <p>
              Connectez-vous et emprunter maintenant tous les objets de votre choix .
            </p>
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
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password">Mot de passe</label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>
            <Link
              to={`/password-reset`}
              className="button-md-primary-link forgotten-password"
            >
              Mot de passe oublié ?
            </Link>
            <button type="submit" className="button-lg-primary-solid">
              Se connecter
            </button>
          </form>
          {hasConnectionFailed && (
            <Alert
              type="error"
              text={failedConnectionInfos.message}
              icon={failedConnectionInfos.icon}
            />
          )}
        </div>
        
          
      </div>
      <div className="image" />
          </div>
  );
}
