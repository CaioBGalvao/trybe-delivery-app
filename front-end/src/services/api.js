// type = 'POST' ou 'GET'
// ENDPOINT = '/login' <---- exemplo
// body = {} <--- o que vai ser mandado para o back

export default async function handleFetch(type, ENDPOINT, body) {
  const formateENDPOINT = `http://localhost:3001${ENDPOINT}`;

  if (type === 'GET') {
    try {
      const response = await fetch(formateENDPOINT);

      return response.json();
    } catch (e) {
      const error = e.message;

      return error;
    }
  }

  if (type === 'POST') {
    const requestOptions = {
      mode: 'no-cors',
      method: type,
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
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
}
