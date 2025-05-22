import { NavLink, useNavigate } from 'react-router-dom';
import { Logo, basketIcon, userIcon, logoutIcon } from '@assets/images';
import styles from './header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <NavLink to={'/'}>
        <img src={Logo} alt="logo" />
      </NavLink>
      <nav className={styles.nav}>
        <ul>
          <NavLink to={'/catalog'}>Каталог</NavLink>
          <li>Адреса магазинов</li>
          <li>Контакты</li>
        </ul>
      </nav>
      <div className={styles.container}>
        <img src={basketIcon} alt="basket" />
        {token ? (
          <button onClick={handleLogout} className={styles.logoutButton}>
            <img src={logoutIcon} alt="logout" />
          </button>
        ) : (
          <NavLink to={'/auth'}>
            <img src={userIcon} alt="profile" />
          </NavLink>
        )}
      </div>
    </div>
  );
};