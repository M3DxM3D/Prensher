import { sanitize } from "isomorphic-dompurify";
import { useState, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";

import AuthContext from "../../contexts/AuthContext";
import "./ModalNewItem.scss";

export default function ModalNewItem({ setIsModalNewItemOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");

  const { userToken } = useContext(AuthContext);

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
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/items`, // Change the endpoint to the correct one
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setIsModalNewItemOpen(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(sanitize(event.target.value));
  };
  const handleDescriptionChange = (event) => {
    setDescription(sanitize(event.target.value));
  };
  const handleCategoriesChange = (event) => {
    setCategories(sanitize(event.target.value));
  };

  return (
    <div className="modal new-item-modal"> {/* Change the class name to 'new-item-modal' */}
      <div
        className="filter"
        onClick={() => setIsModalNewItemOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-bulb" />
          </div>
          <div className="content">
            <h3>Nouvel objet</h3>
            <p className="details">
              Faites briller votre imagination avec ce nouvel emprunt.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsModalNewItemOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        <div className="body">
          <form onSubmit={handleFormSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="titleItem">Titre de l'objet</label>
                <div className="input">
                  <input
                    type="text"
                    name="title" // Change the 'name' attribute to "title"
                    placeholder="titre du nouvel objet"
                    id="titleItem"
                    onChange={handleTitleChange}
                    value={title}
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="descriptionItem">Description</label>
                <div className="textarea">
                  <textarea
                    name="description" // Change the 'name' attribute to "description"
                    rows="3"
                    placeholder="description de l'objet"
                    id="descriptionItem"
                    onChange={handleDescriptionChange}
                    value={description}
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="categoriesItem">Catégories</label>
                <div className="input-help">
                  Renseignez une ou plusieurs catégories d'objets
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="categories" // Change the 'name' attribute to "categories"
                    placeholder="catégories du nouvel objet"
                    id="categoriesItem"
                    onChange={handleCategoriesChange}
                    value={categories}
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="submit" type="submit">
                <i className="fi fi-rr-plus" />
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ModalNewItem.propTypes = {
  setIsModalNewItemOpen: propTypes.func.isRequired,
};
