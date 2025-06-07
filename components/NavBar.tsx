import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => (
  <nav className={styles.nav}>
    <img src="/images/arrow.png" alt="Atrás" className={styles.icon} />
    <img
      src="/images/logo-cinebol.png"
      alt="Cinebol"
      className={styles.logo}
    />
    <img src="/images/menu.png" alt="Menú" className={styles.icon} />
  </nav>
);

export default NavBar;
