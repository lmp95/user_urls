const fetchApi = async (
  url: string,
  method: string,
  params?: string | object,
  token?: string | null
) => {
  return await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      if (response.status === 200 || (method === 'DELETE' && response.status === 410)) 
        return response.json();
      throw new Error('Fail to fetch');
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error('Fail to fetch');
    });
};

export default fetchApi;
