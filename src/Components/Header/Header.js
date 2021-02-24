import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "./../../Assets/Image/Svg/menu/home.svg";
import { ReactComponent as Berry } from "./../../Assets/Image/Svg/menu/berry.svg";
import { ReactComponent as Items } from "./../../Assets/Image/Svg/menu/items.svg";
import { ReactComponent as Move } from "./../../Assets/Image/Svg/menu/move.svg";
import { ReactComponent as About } from "./../../Assets/Image/Svg/menu/about.svg";
import useMedia from "../../Hooks/useMedia";
import styles from "./Header.module.css";

const Header = () => {
  const [menu, setMenu] = React.useState(false);
  const { pathname } = useLocation();
  const mobile = useMedia("(max-width: 576px)");

  React.useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {mobile && (
          <button
            className={`${styles.btn} ${menu ? styles.btnActive : ""}`}
            onClick={() => setMenu(!menu)}
          ></button>
        )}
        <h2>
          <Link to="/" className={styles.title}>
            PokeWiki
          </Link>
        </h2>
        <ul
          className={`${mobile ? styles.menuMobile : styles.menu}
            ${menu ? styles.menuMobileActive : ""}
          `}
        >
          <li>
            <NavLink to="/" end activeClassName={styles.active}>
              {mobile && (
                <i className={styles.iconMenu}>
                  <Home />
                </i>
              )}
              Página Inicial
            </NavLink>
          </li>
          <li>
            <NavLink to="/berry" activeClassName={styles.active}>
              {mobile && (
                <i className={styles.iconMenu}>
                  <Berry />
                </i>
              )}
              Berry
            </NavLink>
          </li>
          <li>
            <NavLink to="/items" activeClassName={styles.active}>
              {mobile && (
                <i className={styles.iconMenu}>
                  <Items />
                </i>
              )}
              Itens
            </NavLink>
          </li>
          <li>
            <NavLink to="/moves" activeClassName={styles.active}>
              {mobile && (
                <i className={styles.iconMenu}>
                  <Move />
                </i>
              )}
              Movimentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" activeClassName={styles.active}>
              {mobile && (
                <i className={`${styles.iconMenu} ${styles.iconInfo}`}>
                  <About />
                </i>
              )}
              Sobre
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
