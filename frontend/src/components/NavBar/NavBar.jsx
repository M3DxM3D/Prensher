import "./NavBar.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


import SubNavBarLink from "../SubNavBarLink/SubNavBarLink";


import AuthContext from "../../contexts/AuthContext";
import Avatar from "../Avatar/Avatar";

export default function NavBar({ activeLink }) {
  const navigate = useNavigate();
  const { setUser, userInfos } = useContext(AuthContext);
  let initials = "";
  if (userInfos.firstname && userInfos.lastname) {
    initials = userInfos.firstname[0] + userInfos.lastname[0];
    
  }


  const [isSubNavBarMyItemsOpen, setIsSubNavBarMyItemsOpen] =
    useState(false);
  const [isSubNavBarLendOpen, setIsSubNavBarLendOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenuLend, setShowSubMenuLend] = useState(false);
  const [showSubMenuMyItems, setShowSubMenuMyItems] = useState(false);

  /* au click, ouvre ou ferme la subnavbar Tableau et ferme la subnavbar Idea si elle est ouverte */

  function openNavBarMyItems() {
    setIsSubNavBarMyItemsOpen(!isSubNavBarMyItemsOpen);
    if (isSubNavBarLendOpen === true) {
      setIsSubNavBarLendOpen(!isSubNavBarLendOpen);
    }
  }

  /* au click, ouvre ou ferme la subnavbar Idea et ferme la subnavbar tableau si elle est ouverte */
  function openNavBarLend() {
    setIsSubNavBarLendOpen(!isSubNavBarLendOpen);
    if (isSubNavBarMyItemsOpen === true) {
      setIsSubNavBarMyItemsOpen(!isSubNavBarMyItemsOpen);
    }
  }

  /* au click, ferme les navbar pouvant être ouvertes ailleurs */
  function closeSubNavBar() {
    if (isSubNavBarMyItemsOpen === true) {
      setIsSubNavBarMyItemsOpen(false);
    } else if (isSubNavBarLendOpen === true) {
      setIsSubNavBarLendOpen(false);
    }
  }

  return (
    <div className="global-nav-bar">
      <nav>
        <div
        //logo a mettre
          onClick={() => {
            navigate(`/`);
          }}
          aria-hidden="true"
        > 
    
        </div>

        <div className="burger-nav-bar">
          <i
            className="fi fi-rr-bars-staggered"
            onClick={() => setShowMenu(true)}
            aria-hidden="true"
          />
        </div>
        <div className="main-nav-bar">
          <div className="first-part-buttons-nav-bar">
            <div
                           onClick={() => {
                navigate(`/`);
              }}
              aria-hidden="true"
            >
             
            </div>
            <div className="icon-nav-bar">
              {/* au click, ferme les navbar pouvant être ouvertes ailleurs */}
              <button
                type="button"
                className={activeLink === "home" ? "active" : ""}
                onClick={() => {
                  closeSubNavBar();
                  navigate(`/`);
                }}
              >
                <i className="fi fi-rr-home" />
                <div className="tooltip">
                  <span>Accueil</span>
                </div>
              </button>
              <button type="button" onClick={() => openNavBarLend()}>
                <i className="fi fi-rr-balance-scale-left" />
                <div className="tooltip">
                  <span>Mes Emprunts</span>
                </div>
              </button>
              <button
                type="button"
                className={activeLink === "MyItems" ? "active" : ""}
                // au click, on fait apparaitre le sous-menu
                onClick={() => openNavBarMyItems()}
              >
                <i className="fi fi-rr-balance-scale-right"/>
                <div className="tooltip">
                  <span>Mes Prêts</span>
                </div>
              </button>
              
              {userInfos ? (
                <button
                  type="button"
                  className={activeLink === "favorites" ? "active" : ""}
                  onClick={() => {
                    closeSubNavBar();
                    navigate(`/favorites`);
                  }}
                >
                  <i className="fi fi-rr-square-heart" />
                  <div className="tooltip">
                    <span>Mes coups de coeur</span>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
          <div className="second-part-buttons-nav-bar">
            <div className="icon-nav-bar">
              <button type="button">
                <i className="fi fi-rr-interrogation" />
                <div className="tooltip">
                  <span>Mentions légales</span>
                </div>
              </button>
            </div>
            <div className="icon-nav-bar">
              <button
                type="button"
                onClick={() => {
                  setUser("");
                }}
              >
                <i className="fi fi-rr-sign-out-alt" />
                <div className="tooltip">
                  <span>Se déconnecter</span>
                </div>
              </button>
            </div>
            <div className="avatar">
              {userInfos.picture_url ? (
                <Avatar type="navbar" pictureUrl={userInfos.picture_url} />
              ) : (
                <Avatar type="navbar" initials={initials} />
              )}
              <div className="tooltip">
                <span>Mon profil</span>
              </div>
            </div>

           
          </div>
          {/* ternaire pour faire apparaitre le sous menu des tableaux en fonction du state */}
        </div>
      </nav>
      {isSubNavBarMyItemsOpen && (
        <div className="first-sub-nav-bar">
          <p className="title-sub-nav-bar">Mes prêts</p>
          <button className="nav-bar-button" type="button">
            <i className="fi fi-rr-plus" />
            Nouveu prêt
          </button>
          <div className="links-sub-nav-bar">
            <SubNavBarLink
              title="le petit prince"
              subtitle="Livre"
              navigateLink={`/MyItems/1`}
            />
            <SubNavBarLink title="Aspirateur" subtitle="Outil ménager" />
          </div>
        </div>
      )}
      {/* ternaire pour faire apparaitre le sous menu des équipes en fonction du state */}
      {isSubNavBarLendOpen && (
        <div className="first-sub-nav-bar">
          <p className="title-sub-nav-bar">Mes Emprunts</p>
          <button className="nav-bar-button" type="button">
            <i className="fi fi-rr-plus" />
            Nouvel emprunt
          </button>
          <div className="links-sub-nav-bar">
            <SubNavBarLink title="Audi RS7" subtitle="automobile" />
            <SubNavBarLink
              title="Trançonneuse"
              subtitle="jardinnage"
            />
          </div>
        </div>
      )}
      {showMenu && (
        <div id="nav-links">
          <div className="main-part-nav-bar-menu-burger">
            <div className="top">
               <div className="content">
                <div className="link">
                  <div className="text">
                    <i className="fi fi-rr-home" />
                    <p>Accueil</p>
                  </div>
                </div>
                <div
                  className={`link-with-sub-links ${
                    showSubMenuLend ? "active" : ""
                  }`}
                >
                  <div
                    className="link"
                    onClick={() => setShowSubMenuLend(!showSubMenuLend)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="text">
                      <i className="fi fi-rr-balance-scale-left" />
                      <p>Mes Emprunts</p>
                    </div>
                    <div className="arrow">
                      <i
                        className={`fi fi-rr-angle-small-${
                          showSubMenuLend ? "up" : "down"
                        }`}
                      />
                    </div>
                  </div>
                  {showSubMenuLend && (
                    <div className="sub-links">
                      <div className="sub-part-menu-burger">
                        <SubNavBarLink
                          title="Trottinette"
                          subtitle="rapide comme fantomette"
                        />
                        <SubNavBarLink
                          title="Chicha"
                          subtitle="pistache/caramel y'a rien de tel"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`link-with-sub-links ${
                    showSubMenuMyItems ? "active" : ""
                  }`}
                >
                  <div
                    className="link"
                    onClick={() =>
                      setShowSubMenuMyItems(!showSubMenuMyItems)
                    }
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="text">
                      <i className="fi fi-rr-balance-scale-right" />
                      <p>Mes Prêts</p>
                    </div>
                    <div className="arrow">
                      <i
                        className={`fi fi-rr-angle-small-${
                          showSubMenuMyItems ? "up" : "down"
                        }`}
                      />
                    </div>
                  </div>
                  {showSubMenuMyItems && (
                    <div className="sub-links">
                      <div className="sub-part-menu-burger">
                        <SubNavBarLink
                          title="Brosse à dent usagé"
                          subtitle="Bah ca sert quand meme !"
                        />
                                            </div>
                    </div>
                  )}
                </div>
                             {userInfos ? (
                  <div
                    className="link"
                    onClick={() => {
                      closeSubNavBar();
                      navigate(`/favorites`);
                    }}
                    aria-hidden="true"
                  >
                    <div className="text">
                      <i className="fi fi-rr-square-heart" />
                      <p>Mes Coups de coeur</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="bottom">
              <div className="link">
                <div className="text">
                  <i className="fi fi-rr-interrogation" />
                  <p>Mentions légales</p>
                </div>
              </div>
              <div className="profile">
                <div className="avatar">
                  {userInfos.picture_url ? (
                    <Avatar type="navbar" pictureUrl={userInfos.picture_url} />
                  ) : (
                    <Avatar type="navbar" initials={initials} />
                  )}
                </div>
                <div className="content">
                  <p className="name">
                    {userInfos.firstname} {userInfos.lastname.toUpperCase()}
                  </p>
                  <p className="email">{userInfos.email}</p>
                  <button
                    className="log-out"
                    onClick={() => {
                      setUser("");
                    }}
                    type="button"
                  >
                    <i className="fi fi-rr-sign-out-alt" />
                    Se déconnecter
                  </button>
                </div>
              </div>

                                        </div>
          </div>

          <div className="close-menu-burger">
            <div
              className="icon-nav-bar"
              onClick={() => setShowMenu(false)}
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
            >
              <button type="button">
                <i className="fi fi-rr-cross" />
              </button>
            </div>
          </div>
        </div>
      )}
      {isSubNavBarMyItemsOpen || isSubNavBarLendOpen || showMenu ? (
        <div className="filter" onClick={closeSubNavBar} aria-hidden="true" />
      ) : null}
    </div>
  );
}

