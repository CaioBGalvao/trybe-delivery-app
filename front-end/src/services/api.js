// type = 'POST' ou 'GET'
// ENDPOINT = '/login' <---- exemplo
// body = {} <--- o que vai ser mandado para o back
import { getFromLocalStorage } from '../utils/localStorage';

export default async function handleFetch(type, ENDPOINT, body) {
  const formateENDPOINT = `http://localhost:3001${ENDPOINT}`;
  const content = 'application/json';
  const { token } = getFromLocalStorage('user');
  const hasBody = ['POST', 'PUT', 'PATCH'].some((typeBody) => typeBody === type);

  const requestOptions = {
    method: type,
    body: hasBody ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': content,
      Accept: content,
      authorization: token,
    },
  };

  try {
    const response = await fetch(formateENDPOINT, requestOptions);

    return response.json();
  } catch (e) {
    const error = e.message;

    return error;
  }
}
