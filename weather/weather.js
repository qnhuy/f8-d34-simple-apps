const weatherData = {
    "hanoi": { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
    "hcm": { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
    "danang": { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 }
};

const locations = ['hanoi', 'hcm', 'danang']

function Weather() {
    const [location, setLocation] = React.useState(weatherData.danang)

    function getWeatherIcon() {
        if (location.weather === 'Nắng') {
            return '☀️'
        } else if (location.weather === 'Có mây') {
            return '🌤️'
        } else if (location.weather === 'Mưa nhẹ') {
            return '🌧️'
        }
    }

    function getBackgroundImage() {
        if (location.weather === 'Nắng') {
            return 'https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg?semt=ais_hybrid&w=740&q=80'
        } else if (location.weather === 'Có mây') {
            return 'https://png.pngtree.com/thumb_back/fh260/background/20221013/pngtree-dark-rainy-clouds-lurid-sky-cloudy-skyscape-photo-image_627953.jpg'
        } else if (location.weather === 'Mưa nhẹ') {
            return 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474080Bkh/anh-mua-roi-tren-mat-dat_113308229.jpg'
        }
    }

    function handleSetLocation(e) {
        const settingLocation = locations.find(location => weatherData[location].city === e.target.value)
        setLocation(weatherData[settingLocation])
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="wrapper">
            <div className="weather-app" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
                <div className="overlay"></div>
                <div className="location">
                    <i className="location-icon fa-solid fa-location-dot"></i>
                    <select name="" id="location-select"
                        value={location.city}
                        onChange={handleSetLocation}
                    >
                        {locations.map((location, index) => (
                            <option key={index} value={weatherData[location].city}>{weatherData[location].city}</option>
                        ))}
                    </select>
                </div>

                <div className="weather-detail">
                    <h2 className="temperature">
                        <p className="temperature-index">{location.temp + getRandomNumber(-1, 1)}°C</p>
                        <span className="temperature-icon">{getWeatherIcon()}</span>
                        <div className="description">{location.weather}</div>
                    </h2>
                    <div className="statistics">
                        <div className="statistic">
                            <i className="statistic-icon fa-solid fa-droplet"></i>
                            <p className="statistic-percent">{location.humidity + getRandomNumber(-5, 5)}%</p>
                            <p className="statistic-title">Humidity</p>
                        </div>
                    </div>
                </div>

                <div className="refresh" onClick={() => setLocation({...location})}>
                    <i className="fa-solid fa-rotate"></i>
                    Refresh
                </div>
            </div>
        </div>
    )
}

const app = <>
    <Weather />
</>
ReactDOM.createRoot(document.getElementById('root')).render(app)