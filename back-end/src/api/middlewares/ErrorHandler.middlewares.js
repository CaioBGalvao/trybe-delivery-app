const errorHandler = (err, _req, res, _next) => {
  if (err.message.includes('&')) {
    const [message, statusCode] = err.message.split('&');
    return res.status(Number(statusCode)).json({ message });
  }
  console.error('Descrição do erro da API', err);
  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;