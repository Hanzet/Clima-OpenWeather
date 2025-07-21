import styles from "./App.module.css" // Definir el nombre del archivo de estilos en este styles
import Form from "./components/Form/Form"
import useWeather from "./hooks/useWeather"

function App() {
  const { fetchWeather } = useWeather()
  
  console.log(import.meta.env.VITE_API_KEY)

  return (
    <>
      <h1 className={styles.title}>Hola Mundo</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        <p>2</p>
      </div>
    </>
  )
}

export default App
