export const handlerErrors = (error, res, code, msg) => {
  error && console.log(error);
  return res.status(code).json({ error: msg });
};
