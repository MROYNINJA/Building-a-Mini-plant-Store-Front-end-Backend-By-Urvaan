import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Plant from '../models/Plant.js';

const router = express.Router();

// GET /api/plants?q=&category=&inStock=&page=&limit=
router.get('/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('inStock').optional().isBoolean().toBoolean()
  ],
  async (req, res, next) => {
    try {
      const { q, category, inStock } = req.query;
      const page = req.query.page || 1;
      const limit = req.query.limit || 12;

      const filter = {};
      if (typeof inStock === 'boolean') {
        filter.available = inStock;
      }
      if (category && category.trim().length) {
        filter.categories = { $in: [new RegExp(category.trim(), 'i')] };
      }
      if (q && q.trim().length) {
        // Search name OR categories
        const regex = new RegExp(q.trim(), 'i');
        filter.$or = [{ name: regex }, { categories: { $in: [regex] } }];
      }

      const total = await Plant.countDocuments(filter);
      const plants = await Plant.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      res.json({ data: plants, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/plants
router.post('/',
  [
    body('name').isString().trim().isLength({ min: 2 }).withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number').toFloat(),
    body('available').optional().isBoolean().toBoolean(),
    body('categories').customSanitizer(value => {
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') {
        return value.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [];
    })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, price, categories, available = true } = req.body;
      const plant = await Plant.create({ name, price, categories, available });
      res.status(201).json(plant);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
