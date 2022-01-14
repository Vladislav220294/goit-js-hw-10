import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onGetCountry, DEBOUNCE_DELAY));

function onGetCountry() {
  const inputName = inputEl.value.trim();

  if (inputName === '') {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }

  fetchCountries(inputName)
    .then(data => {
      let amount = data.length;

      if (amount > 10) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (amount >= 2 && amount <= 10) {
        countryInfoEl.innerHTML = '';
        return createMarkupCountryList(data);
      } else {
        if (amount === 1) {
          countryListEl.innerHTML = '';
          return createMarkupCountryInfo(data);
        }
      }
    })
    .catch(error => {
      return Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkupCountryList(array) {
  const markUpCountryList = array
    .map(
      country =>
        `<li><img src="${country.flags.svg}" width="30px"><p>${country.name.official}</p></li>`,
    )
    .join('');
  return (countryListEl.innerHTML = markUpCountryList);
}
function createMarkupCountryInfo(array) {
  const markUpCountryInfo = array
    .map(
      country =>
        `<img src="${country.flags.svg}" width="30px"><h2>${
          country.name.official
        }</h2><ul><li>Capital:${country.capital}</li><li>Population:${
          country.population
        }</li><li>Languages:${Object.values(country.languages)}</li></ul>`,
    )
    .join('');

  return (countryInfoEl.innerHTML = markUpCountryInfo);
}
