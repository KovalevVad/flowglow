import { useEffect, useState } from 'react';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer';
import flowerService from '@services/flowers';
import styles from './catalog.module.css';

interface Flower {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const AddFlowerForm = ({ onAdd }: { onAdd: (flower: Omit<Flower, 'id'>) => Promise<void> }) => {
  const [formData, setFormData] = useState<Omit<Flower, 'id'>>({
    name: '',
    price: 0,
    image_url: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(formData);
      setFormData({ name: '', price: 0, image_url: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Ошибка при добавлении цветка:', error);
    }
  };

  return (
    <div className={styles.addFormContainer}>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.addButton}
      >
        Добавить букет
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Добавить новый букет</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Название:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Цена:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className={styles.formGroup}>
                <label>URL изображения:</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => setIsOpen(false)}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const FlowerCard = ({ flower, onDelete }: { flower: Flower; onDelete: (id: number) => void }) => {
  return (
    <div className={styles.card}>
      <img src={flower.image_url} alt={flower.name} className={styles.cardImage} />
      <div className={styles.card__title}>
        <h3>{flower.name}</h3>
        <p>{flower.price} руб</p>
        <div className={styles.cardActions}>
          <button className={styles.orderButton}>Заказать</button>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(flower.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export const CatalogPage = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    loadFlowers();
  }, []);

  const loadFlowers = async () => {
    try {
      const data = await flowerService.getFlowers();
      setFlowers(data);
    } catch (err) {
      setError('Не удалось загрузить цветы. Попробуйте позже.');
      console.error('Ошибка при загрузке цветов:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlower = async (flowerData: Omit<Flower, 'id'>) => {
    const token = getAuthToken();
    if (!token) {
      setError('Требуется авторизация');
      return;
    }

    try {
      const newFlower = await flowerService.createFlower(flowerData, token);
      setFlowers(prev => [...prev, newFlower]);
    } catch (error) {
      console.error('Ошибка при добавлении цветка:', error);
      throw error;
    }
  };

  const handleDeleteFlower = async (id: number) => {
    const token = getAuthToken();
    if (!token) {
      setError('Требуется авторизация');
      return;
    }

    try {
      await flowerService.deleteFlower(id, token);
      setFlowers(prev => prev.filter(flower => flower.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении цветка:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.main}>
          <h2>Доставка цветов в Москве</h2>
          <div className={styles.loading}>Загрузка...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.main}>
          <h2>Доставка цветов в Москве</h2>
          <div className={styles.error}>{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <h2>Доставка цветов в Москве</h2>

        <AddFlowerForm onAdd={handleAddFlower} />

        <div className={styles.containerCard}>
          {flowers.map(flower => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              onDelete={handleDeleteFlower}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};