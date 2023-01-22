import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { countryInfo } from './fetchCountries';
import { countryList } from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(e => {
    if (e.target.value !== '') {
      const name = e.target.value.trim();
      fetchCountries(name).then(countries => mapCountries(countries));
    } else {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);

function mapCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  } else if (countries.length === 1) {
    const countryDetails = countries.map(country => {
      return `
    <div class="country-info_header"><img class="country-info_img" src="https://flagcdn.com/${country.altSpellings[0].toLowerCase()}.svg" alt="Flag of ${
        country.name.common
      }" width="35" height="35"><h1 class="country-info_name">${
        country.name.common
      }</h1></div>
        <p class="country-info_p"><span>Capital:</span> ${country.capital}</p>
        <p class="country-info_p"><span>Population:</span> ${
          country.population
        }</p>
        <p class="country-info_p"><span>Languages:</span> ${Object.values(
          country.languages
        ).join(', ')}</p>`;
    });
    //   .join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = countryDetails;
  } else if (countries.length === 0) {
    Notiflix.Notify.failure("Please put country's name in English");
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  } else {
    const markup = countries
      .map(country => {
        return `<li>
<img src="https://flagcdn.com/${country.altSpellings[0].toLowerCase()}.svg" alt="Flag of ${
          country.name.common
        }" width="35" height="35"><p>${country.name.common}</p>
</li>`;
      })
      .join('');
    countryInfo.innerHTML = '';
    countryList.innerHTML = markup;
  }
}
