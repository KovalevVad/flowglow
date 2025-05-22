import { Logo, vk, telegramm } from '@assets/images';
import styles from './footer.module.css';

export const Footer = () => {
  
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <img src={Logo} alt="logo" />
        <div>
          <img src={vk} alt="vk" />
          <img src={telegramm} alt="telegramm" />
        </div>
      </div>
      <nav className={styles.footerNav}>
        <h3>Полезные ссылки</h3>
        <ul>
          <li>О нас</li>
          <li>Каталог</li>
          <li>Оплата</li>
          <li>Доставка</li>
        </ul>
      </nav>
      <nav className={styles.footerNav}>
        <h3>Популярные города</h3>
        <ul>
          <li>Москва</li>
          <li>Санкт-Петербург</li>
          <li>Екатеринбург</li>
          <li>Казань</li>
        </ul>
      </nav>
    </div>
  );
};
