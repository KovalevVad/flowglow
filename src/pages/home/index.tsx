import {
  arrowIcon,
  flowerMain,
  flowerOne,
  flowerTwo,
  flowerThree,
  flowerFour,
  flowerFive,
  flowerSix,
} from '@assets/images';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer';

import styles from './home.module.css';

const Card = ({ title, img, backgroundColor }) => {
  return (
    <div className={styles.card} style={{ backgroundColor }}>
      <div>
        <h3>{title}</h3>
        <img src={arrowIcon} alt="arrowIcon" />
      </div>
      <img src={img} alt="flower" />
    </div>
  );
};

export const HomePage = () => {
  const flowers = [
    { title: 'Популярные букеты', img: flowerOne, bgColor: '#efffed' },
    { title: 'Монобукеты', img: flowerTwo, bgColor: '#ffedf9' },
    { title: 'Цветы в коробке', img: flowerThree, bgColor: '#feffed' },
    { title: 'Авторские букеты', img: flowerFour, bgColor: '#edfbff' },
    { title: 'Полевые цветы', img: flowerFive, bgColor: '#f1edff' },
    { title: 'Подарки', img: flowerSix, bgColor: '#ffedee' },
  ];

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div>
          <h1>Порадуйте родных и любимых!</h1>
          <span>Доставим букет за 40 минут</span>
          <button>Выбрать букет</button>
        </div>
        <img src={flowerMain} alt="" />
      </div>
      <div className={styles.catalog}>
        {flowers.map((flower, index) => (
          <Card
            key={index}
            title={flower.title}
            img={flower.img}
            backgroundColor={flower.bgColor}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};
