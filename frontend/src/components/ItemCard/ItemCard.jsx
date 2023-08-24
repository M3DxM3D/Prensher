import React, { useState } from "react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./ItemCard.scss";
import SubmenuItemButton from "../../components/SubmenuItemButton/SubmenuItemButton";

export default function ItemCard({ item }) {
  const [favoriteCount, setFavoriteCount] = useState(item.favorite_count);
  const [favoriteActive, setFavoriteActive] = useState(item.is_favorite_by_user);
  const [showSubmenu, setShowSubmenu] = useState(false); 
 


  return (
    <div className="item-card">
      <div className="header-card">
        <div>
          <i className="fi fi-rr-marker"></i>
          {item.location}
        </div>
        <h2 className="title-item">{item.title}</h2>
        <FavoriteButton
          itemId={item.id}
          favoriteActive={favoriteActive}
          favoriteCount={favoriteCount}
          setFavoriteCount={setFavoriteCount}
          setFavoriteActive={setFavoriteActive}
        />
        <SubmenuItemButton
          showSubmenu={showSubmenu}
          setShowSubmenu={setShowSubmenu}
        />
      </div>

      <div className="content-item">
        <div className="item-picture">
          {item.picture ? (
            <img src={item.picture} alt="photo_item" />
          ) : (
            <img src="/assets/logo/nophoto.png" alt="photo_item" />
          )}
        </div>
      </div>
      <div className="footer-item">
        <p className="item-description">{item.description}</p>
      </div>
    </div>
  );
}
