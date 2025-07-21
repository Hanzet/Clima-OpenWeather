import { useState } from 'react'
import { countries } from '../../data/countries'
import type { SearchType, Country } from '../../types'
import styles from './Form.module.css'
import { Alert } from '../Alert/Alert'


type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

function Form({fetchWeather}: FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son requeridos')
            return
        }

        fetchWeather(search)
    }

  return (
    <form
        className={styles.form}
        onSubmit={handleSubmit}
    >
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="name">Ciudad</label>
            <input
                id="city"
                type="text"
                name="city"
                placeholder="Tu ciudad"
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais</label>
            <select
                id="country"
                value={search.country}
                name="country"
                onChange={handleChange}
            >
                <option value="">-- Seleccione un País</option>
                {countries.map(country => (
                    <option
                        key={country.code}
                        value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>

        <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form>
  )
}

export default Form
