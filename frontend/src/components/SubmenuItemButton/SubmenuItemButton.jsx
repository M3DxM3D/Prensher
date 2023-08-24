import React from "react";
import PropTypes from "prop-types";
import "./SubmenuItemButton.scss";

export default function SubmenuItemButton({ showSubmenu, setShowSubmenu }) {
  // on fait apparaitre/ cache le sous-menu de l'idée quand on clic dessus
  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <>
      {/* ajout du sous menu en entete */}
      <button type="button" className="item-menu-icon" onClick={toggleSubmenu}>
        <i className="fi fi-rr-menu-dots-vertical" />
      </button>
      {showSubmenu && (
        <ul className="submenu-item">
          <li onClick={toggleSubmenu} aria-hidden="true">
            <i className="fi fi-rr-attribution-pencil" />
            <a href="/modifier">Modifier</a>
          </li>
          <li onClick={toggleSubmenu} aria-hidden="true">
            <i className="fi fi-rr-trash" />
            <a href="/supprimer">Supprimer</a>
          </li>
          <li onClick={toggleSubmenu} aria-hidden="true">
            <i className="fi fi-rr-copy" />
            <a href="/dupliquer">Dupliquer</a>
          </li>
        </ul>
      )}
    </>
  );
}

SubmenuItemButton.propTypes = {
  showSubmenu: PropTypes.bool.isRequired,
  setShowSubmenu: PropTypes.func.isRequired,
};
