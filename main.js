/* Cuando hacemos click en el boton podemos ejecutar las funciones */
/* En caso de que tire error la pagina las peticiones y el codigo este bien 
fijate en la pagina de accuweahter elimina tu proyecto en la sección de my appp
y  crea otro es la unica forma de que funcione bien */
document.getElementById('search').addEventListener('click', (e)=>{
e.preventDefault();

let city = document.getElementById('city').value;

if (city.length == '') {
    alert('You have to enter a city!');
}
/* Traemos los datos de la ciudad */
async function dataApi (city) {
    const apiKey = 'FeCeYvpfwWAdxule4Ag8JeegTyU5xqMP';
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
    const data = await fetch(url)
    const response = await data.json()
    return response[0];
    }
/* Obtenos la clave de la ciudad */
    async function getKeyLocation(){
        const keyLocation = await dataApi(city)
        return keyLocation.Key;
        }
/* Obtenemos los datos actuales de la temperatura actual */
    async function currentCondition(keyLocation) { 
            const apiKey = 'FeCeYvpfwWAdxule4Ag8JeegTyU5xqMP';
            const url = `http://dataservice.accuweather.com/currentconditions/v1/${keyLocation}?apikey=${apiKey}`
            const data = await fetch(url)
            const response = await data.json()
            return response;
     }
/* Vemos toda la condición impresa en la pantalla */
     async function viewConditions(){
        const keyLocation = await getKeyLocation();
        const condition =  await currentCondition(keyLocation);
        const locations = await dataApi(city);
        /* Variables */
        let icon = document.getElementById('icon');
        let site = document.getElementById('site');
        let info = document.getElementById('info');

        /* Mostrar lugar */
        site.innerHTML = locations.LocalizedName;
    
    
        /* Mostramos los datos del clima segun el lugar */
        condition.forEach(item => {
            info.innerHTML = `
            <p class="text-center h3">Current temperature: ${item.Temperature.Metric.Value}C°</p>
            <p class="text-center h3 mt-2">Status: ${item.WeatherText}</p>
            `;
            if (item.WeatherIcon>0 || item.WeatherIcon<09) {
                icon.innerHTML = `
                <img src="img/icon/weather_icon/0${item.WeatherIcon}.png" style="width:100px; class="mx-auto d-block"">
                `;
            }
            if (item.WeatherIcon>09) {
                icon.innerHTML = `
                <img src="img/icon/weather_icon/${item.WeatherIcon}.png" style="width:100px;"class="mx-auto d-block">
                `;
            }
    
        });
    
    }
    
viewConditions();

});



