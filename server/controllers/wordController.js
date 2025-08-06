import wordModel from '../model/wordModel.js';

const wordController = {};

wordController.getWords = async (req, res, next) => {
  console.log('in get words!');
  res.locals.words = 'test';
  next();
};

export default wordController;
