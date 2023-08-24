import { useState, useContext } from "react";
import axios from "axios";
import "./FavoriteButton.scss";
import AuthContext from "../../contexts/AuthContext";

export default function FavoriteButton({
  itemId,
  favoriteActive,
  favoriteCount,
  setFavoriteCount,
  setFavoriteActive,
}) {
  const { userInfos, userToken } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = () => {
    if (favoriteActive) {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/items/${itemId}/favorites/users/${
            userInfos.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(() => {
          setFavoriteCount((prevCount) => prevCount - 1);
          setFavoriteActive(false);
        })
        .catch((error) => {
          console.error("Error removing favorite:", error);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/items/${itemId}/favorites/users/${
            userInfos.id
          }`,
          null,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(() => {
          setFavoriteCount((prevCount) => prevCount + 1);
          setFavoriteActive(true);
        })
        .catch((error) => {
          console.error("Error adding favorite:", error);
        });
    }
  };

  const handleHover = () => {
    setIsHovered((prevHovered) => !prevHovered);
  };

  let favoriteIcon = "fi fi-rr-heart";
  if (favoriteActive) {
    favoriteIcon = "fi fi-sr-heart";
    if (isHovered) {
      favoriteIcon = "fi fi-sr-heart-crack";
    }
  }

  return (
    <button
      className="item-favorite"
      type="button"
      onClick={handleFavorite}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {favoriteCount}
      <i className={favoriteIcon} />
    </button>
  );
}

