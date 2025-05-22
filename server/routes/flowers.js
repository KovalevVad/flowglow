const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// GET /flowers - получить все цветы
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flowers ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /flowers - создать новый цветок
router.post('/', authMiddleware, async (req, res) => {
  const { name, price, image_url } = req.body;

  if (!name || !price || !image_url) {
    return res.status(400).json({ error: 'Необходимо указать название, цену и URL изображения' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO flowers (name, price, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, price, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /flowers/:id - получить конкретный цветок
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flowers WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Цветок не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /flowers/:id - обновить цветок
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, price, image_url } = req.body;

  if (!name || !price || !image_url) {
    return res.status(400).json({ error: 'Необходимо указать название, цену и URL изображения' });
  }

  try {
    const result = await pool.query(
      'UPDATE flowers SET name = $1, price = $2, image_url = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, price, image_url, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Цветок не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /flowers/:id - удалить цветок
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM flowers WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Цветок не найден' });
    }
    res.json({ message: 'Цветок успешно удален' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;