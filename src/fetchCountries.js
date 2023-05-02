import Notiflix from 'notiflix';

export function fetchCountries(name) {
  const fields = 'name,capital,population,flags,languages';
  const url = `https://restcountries.com/v2/name/${name}?fields=${fields}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Country not found');
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name.');
      throw error;
    });
}