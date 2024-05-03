const errorDecorator = (callback) => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default errorDecorator;
