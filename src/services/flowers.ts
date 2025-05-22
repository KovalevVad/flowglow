import axios from 'axios';

interface Flower {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

type FlowerData = Omit<Flower, 'id'>;

const API_URL = 'http://localhost:3001/flowers';

const getFlowers = async (): Promise<Flower[]> => {
  const response = await axios.get<Flower[]>(API_URL);
  return response.data;
};

const getFlowerById = async (id: number): Promise<Flower> => {
  const response = await axios.get<Flower>(`${API_URL}/${id}`);
  return response.data;
};

const createFlower = async (flowerData: FlowerData, token: string): Promise<Flower> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post<Flower>(API_URL, flowerData, config);
  return response.data;
};

const updateFlower = async (id: number, flowerData: Partial<FlowerData>, token: string): Promise<Flower> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put<Flower>(`${API_URL}/${id}`, flowerData, config);
  return response.data;
};

const deleteFlower = async (id: number, token: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${API_URL}/${id}`, config);
};

export default {
  getFlowers,
  getFlowerById,
  createFlower,
  updateFlower,
  deleteFlower,
};