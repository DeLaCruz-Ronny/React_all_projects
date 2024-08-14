import styles from "./App.module.css"
import Form from './components/Form/Form'

import useWeather from "./hooks/useWeather"
import { WeatherDetails } from './components/WeatherDetails/WeatherDetails';
import Spinner from "./components/Spinner/Spinner";
import { Alert } from "./components/Alert/Alert";


function App() {

  const { weather, loading, fetchWeather, hasWeatherData, notfound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        
        {loading && <Spinner/>}
        {hasWeatherData &&
          <WeatherDetails
            weather={weather}
          />
        }
        {notfound && <Alert>Ciudad no encontrada</Alert>}
        
      </div>
    </>
  )
}

export default App
