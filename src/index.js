import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const handleSearch = debounce(() => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm !== '') {
    fetchCountries(searchTerm)
      .then(countries => {
        // Clear previous search results
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';

        if (countries.length === 1) {
          displayCountryInfo(countries[0]);
        } else if (countries.length > 1 && countries.length <= 10) {
          countries.forEach(country => {
            const countryItem = createCountryItem(country);
            countryList.appendChild(countryItem);
          });
        } else if (countries.length > 10) {
          showTooManyMatchesInfo();
        } else {
          showNoMatchingCountriesInfo();
        }
      })
      .catch(error => {
        if (error instanceof Error && error.response && error.response.status === 404) {
          showNoCountryFoundError();
        } else {
          console.log('Error:', error);
        }
      });
  } else {
    clearSearchResults();
  }
}, 300);

searchBox.addEventListener('input', handleSearch);

function createCountryItem(country) {
  const countryItem = document.createElement('li');
  const flagImage = document.createElement('img');
  flagImage.src = country.flags.svg;
  flagImage.alt = `${country.name} Flag`;
  const countryName = document.createElement('span');
  countryName.textContent = country.name;

  countryItem.appendChild(flagImage);
  countryItem.appendChild(countryName);

  countryItem.addEventListener('click', () => {
    displayCountryInfo(country);
  });

  return countryItem;
}

function showTooManyMatchesInfo() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function showNoMatchingCountriesInfo() {
  const message = document.createElement('li');
  message.textContent = 'No matching countries found';
  countryList.appendChild(message);
}

function showNoCountryFoundError() {
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}

function clearSearchResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function displayCountryInfo(country) {
    countryInfo.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name} Flag" />
    <h2><${country.name}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages:</p>
    <ul>
      ${country.languages.map(language => `<li>${language.name}</li>`).join('')}
    </ul>
  `;
}
