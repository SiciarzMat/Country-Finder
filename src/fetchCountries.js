import Notiflix from 'notiflix';
export const countryList = document.querySelector('.country-list');
export const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
  return (
    fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    )
      .then(r => {
        if (!r.ok) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
        }
        return r.json();
      })
      .then(r =>
        r.filter(country => {
          if (country.name.common.toLowerCase().includes(name.toLowerCase())) {
            return country;
          }
        })
      )
      // .then(r => console.log(country))
      .catch(e => console.log('Error', e))
  );
}
