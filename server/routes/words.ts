import express from 'express';
import wordController from '../controllers/wordController';

const router = express.Router();

router.get('/:number', wordController.getWords, (req, res) => {
  res.status(200).json(res.locals.words);
});

export default router;
