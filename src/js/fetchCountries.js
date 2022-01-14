import Notiflix from 'notiflix';
const baseUrl = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(inputName) {
  return fetch(`${baseUrl}${inputName}?&fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      return Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
