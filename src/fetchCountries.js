export default function fetchCountries (name) {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
    .then(response => {
    return response.json();
    })
    .then(countries => {
    console.log(countries);
    }).catch(error => { console.log(error); })
}