import express from 'express';
import generateQuestion from '../aiService/generateQuestion';

const router =express.Router();
router.get('/question', async (req, res) => {
    const question = await generateQuestion();
    res.send({ question });
  });

export default router;