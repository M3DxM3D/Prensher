import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import AuthContext from "../../contexts/AuthContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import ItemCard from "../../components/ItemCard/ItemCard";
import NavBar from "../../components/NavBar/NavBar";
import Connection from "../../components/Connection/Connection";
import DataSearchBar from "../../components/DataSearchBar/DataSearchBar";
import NewItemModal from "../../components/NewItemModal/NewItemModal";


export default function Home() {
  const { userToken, userInfos } = useContext(AuthContext);
  const [dataItem, setDataItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagePart, setPagePart] = useState("items");
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [searchTermItem, setSearchTermItem] = useState("");

  useEffect(() => {
    if (userInfos.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/items/`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
         setDataItem(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    }
  }, [userInfos.id, userToken]);

  let title = "";
  let subtitle = "";
  let buttonAdd = "Ajoute un objet que tu souhaites prêter?";

  if (pagePart === "items") {
    if (userInfos.firstname) {
      subtitle =
        "Prêt-à-preter ? Découvrez les dernières pépites à prêter de la plateforme";
      title = `Bienvenue, ${userInfos.firstname}`;
    } else {
      title = "Bienvenue";
    }
  }

  return (
    <div>
      {userToken && Object.keys(userInfos).length ? (
        <main>
          <NavBar activeLink="home" />
          <PageHeader title={title} subtitle={subtitle}>
           </PageHeader>

          {pagePart === "items" && (
            <>
              <div className="page-actions">
                <DataSearchBar
                  searchTerm={searchTermItem}
                  setSearchTerm={setSearchTermItem}
                  placeholderText="Ex: un poney, une tronçonneuse, et bien d'autre..."
                />
              </div>

              <div className="item-cards-list">
                {pagePart === "items" && (
                  <button
                    className="create-item button-primary-solid"
                    type="button"
                    onClick={() => {
                      setIsNewItemModalOpen(true);
                    }}
                  >
                    <i className="fi fi-rr-map-marker-plus" />
                    {buttonAdd}
                  </button>
                )}
                {isNewItemModalOpen && (
                  <div>
                    <NewItemModal
                      isNewItemModalOpen={isNewItemModalOpen}
                      setIsNewItemModalOpen={setIsNewItemModalOpen}
                    />
                  </div>
                )}
                {!isLoading &&
                  dataItem
                    .filter((value) => {
                      if (searchTermItem === "") {
                        return true;
                      }
                      if (
                        value.title
                          .toLowerCase()
                          .includes(searchTermItem.toLowerCase()) ||
                        value.description
                          .toLowerCase()
                          .includes(searchTermItem.toLowerCase()) ||
                        value.creator_firstname
                          .toLowerCase()
                          .includes(searchTermItem.toLowerCase()) ||
                        value.creator_lastname
                          .toLowerCase()
                          .includes(searchTermItem.toLowerCase())
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((item) => <ItemCard className="card" key={item.id} item={item} />)}
              </div>
            </>
          )}
        </main>
      ) : (
        <Connection />
      )}
    </div>
  );
}
