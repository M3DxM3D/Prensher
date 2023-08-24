import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import "./NewItemModal.scss";



export default function NewItemModal({ setIsNewItemModalOpen }) {
  const { userToken, userInfos } = useContext(AuthContext);
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [itemPictureFile, setItemPictureFile] = useState(undefined);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPictureUrl, setItemPictureUrl] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifier les champs obligatoires
    const formData = new FormData(event.target);
    const dataFromForm = Object.fromEntries(formData.entries());
    dataFromForm.userId = userInfos.id;

    // Envoyer la requête POST pour créer l'item
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/items/${userInfos.id}`, dataFromForm, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log("Objet créé :", response.data);
        setIsNewItemModalOpen(false);
      })
      .catch((error) => {
        console.error("Échec de la création de l'objet :", error.message);
        setHasConnectionFailed(true);
      });
  };


  return (
    <div className="modal new-item-modal">
      <div
        className="filter"
        onClick={() => setIsNewItemModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-books-medical" />
          </div>
          <div className="content">
            <h3>Nouvel Objet</h3>
            <p className="details">
              Rassemblez vos objets et prêtez-les à ceux qui en ont besoin.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsNewItemModalOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>

        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="picture_url">Photo de l'objet :</label>
                <p className="input-help">
                  Elle sera visible dans la navigation.
                </p>
                <div className="input">
                  <i className="fi fi-rr-link-alt" />
                  <input
                    type="url"
                    name="picture_url"
                    placeholder="Le lien vers la photo de l'objet"
                    id="picture_url"
                    value= {itemPictureUrl}
                    nChange={(event) => {
                      setItemPictureFile(event.target.files[0]); // Utiliser files[0] pour obtenir le fichier sélectionné
                    }}
                    autoComplete="off"
                  />
                    
                </div>
                                <div className="input">
                  <i className="fi fi-rr-folder-upload" />
                  <input
                    type="file"
                    name="picture_url"
                    placeholder="Le lien vers la photo de l'objet"
                    id="picture_url"
                    value= {itemPictureFile}
                    onChange={(event) => {
                      setItemPictureFile(event.target.value);
                    }}
                    autoComplete="off"
                    />
                    
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="title">Nom de l'objet :</label>
                <div className="input">
                  <input
                    type="text"
                    name="title"
                    value={itemTitle} // Utiliser l'état "itemType" pour le champ "Type d'objet"
                    onChange={(event) => setItemTitle(event.target.value)} // Utiliser setItemType pour mettre à jour l'état
                    placeholder="Donnez le nom de votre objet"
                    id="title"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="description">Description de l'objet :</label>
                <div className="input">
                  <input
                    type="text"
                    name="description"
                    value={itemDescription}
                    onChange={(event) => setItemDescription(event.target.value)}
                    placeholder="Donnez le type de votre objet"
                    id="description"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="type">Type d'objet :</label>
                <div className="input">
                  <input
                    type="text"
                    name="type"
                    value={itemType} // Utiliser l'état "itemType" pour le champ "Type d'objet"
                    onChange={(event) => setItemType(event.target.value)} // Utiliser setItemType pour mettre à jour l'état
                    placeholder="Donnez le type de votre objet"
                    id="type"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="location">Lieu où vous vous trouvez :</label>
                <div className="input">
                  <input
                    type="text"
                    name="location"
                    value={itemLocation}
                    onChange={(event) => setItemLocation(event.target.value)}
                    placeholder="Lieu"
                    id="location"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-switch input-switch--sm">
                <label htmlFor="is_available">
                  <input
                    type="checkbox"
                    name="is_available"
                    id="is_available"
                    checked={isAvailable}
                    onChange={(event) => {
                      setIsAvailable(event.target.checked);
                    }}
                  />
                  <div className="toggle-switch" />
                  {isAvailable ? (
                    <p>
                      <span>Emprunté</span> <br />
                      Si vous choisissez cette option, c'est que votre objet est actuellement emprunté et n'apparaîtra pas dans les résultats de recherche.
                    </p>
                  ) : (
                    <p>
                      <span>Disponible</span> <br />
                      Si vous laissez cette option, c'est que votre objet est actuellement disponible.
                    </p>
                  )}
                </label>
              </div>
            </div>

            {hasConnectionFailed && (
              <div className="error-message">
                Erreur lors de l'ajout de l'objet. Veuillez réessayer.
              </div>
            )}

            <div className="actions">
              <button
                className="cancel"
                onClick={() => setIsNewItemModalOpen(false)}
                type="button"
              >
                Annuler
              </button>
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
