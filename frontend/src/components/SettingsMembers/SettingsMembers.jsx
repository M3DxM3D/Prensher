import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./SettingsMembers.scss";

import NewUserModal from "../NewUserModal/NewUserModal";
import Avatar from "../Avatar/Avatar";
import DataSearchBar from "../DataSearchBar/DataSearchBar";

import AuthContext from "../../contexts/AuthContext";

export default function SettingsMembers() {
  const { userToken, userInfos, setUserInfos } = useContext(AuthContext);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUserInfos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sorting = (column) => {
    const sortedData = [...userInfos].sort((a, b) => {
      const aData = a[column] ? a[column].toLowerCase() : "";
      const bData = b[column] ? b[column].toLowerCase() : "";
      return order === "asc" ? aData.localeCompare(bData) : bData.localeCompare(aData);
    });

    setUserInfos(sortedData);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleUserDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        setUserInfos((prevUserInfos) => {
          return prevUserInfos.filter((user) => user.id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section id="members">
      <div className="table">
        <div className="table-header">
          <div className="content">
            <h2>Membres de la plateforme</h2>
            <p>Contrôlez l'accès et les permissions des membres.</p>
          </div>
          <div className="actions">
            <DataSearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              placeholderText="Rechercher un membre"
            />
            <button
              type="button"
              className="button-md-primary-solid"
              onClick={() => {
                setIsNewUserModalOpen(true);
              }}
            >
              <i className="fi fi-rr-user-add" />
              Ajouter un membre
            </button>
          </div>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th onClick={() => sorting("lastname")}>Prénom NOM</th>
                <th onClick={() => sorting("function")}>Fonction</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userInfos
                .filter((value) => {
                  if (searchTerm === "") {
                    return true;
                  }
                  const lowerSearchTerm = searchTerm.toLowerCase();
                  return (
                    value.firstname.toLowerCase().includes(lowerSearchTerm) ||
                    value.lastname.toLowerCase().includes(lowerSearchTerm) ||
                    value.email.toLowerCase().includes(lowerSearchTerm) ||
                    value.function.toLowerCase().includes(lowerSearchTerm)
                  );
                })
                .map((user) => (
                  <tr key={user.id}>
                    <td className="user">
                      <Avatar
                        type="table"
                        pictureUrl={user.picture_url ? user.picture_url : null}
                        initials={
                          !user.picture_url
                            ? user.firstname[0] + user.lastname[0]
                            : null
                        }
                      />
                      <div className="infos">
                        <div className="name">
                          {user.firstname} {user.lastname.toUpperCase()}
                        </div>
                        <div className="email">{user.email}</div>
                      </div>
                    </td>
                    <td>{user.function}</td>
                    <td className="actions">
                      <button type="button" className="table-action edit">
                        <i className="fi fi-rr-pen-clip" />
                      </button>
                      <button
                        type="button"
                        className="table-action delete"
                        onClick={() => handleUserDelete(user.id)}
                      >
                        <i className="fi fi-rr-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isNewUserModalOpen && (
        <NewUserModal setIsNewUserModalOpen={setIsNewUserModalOpen} />
      )}
    </section>
  );
}

SettingsMembers.propTypes = {
  setIsNewUserModalOpen: PropTypes.func.isRequired,
};
