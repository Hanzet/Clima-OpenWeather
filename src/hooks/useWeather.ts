import axios from 'axios'
import { z } from 'zod'
// import { object, string, number, parse, Output } from 'valibot'
import type { SearchType } from '../types'
import { useMemo, useState } from 'react'
//         Boolean(weather) &&
//         typeof weather === 'object' && // Comprueba que el tipo de dato sea un objeto
//         typeof (weather as WeatherGuardsType).name === 'string' && // Comprueba que el objeto tenga la propiedad name
//         typeof (weather as WeatherGuardsType).main.temp === 'number' && // Comprueba que el objeto tenga la propiedad temp
//         typeof (weather as WeatherGuardsType).main.temp_max === 'number' && // Comprueba que el objeto tenga la propiedad temp_max
//         typeof (weather as WeatherGuardsType).main.temp_min === 'number' // Comprueba que el objeto tenga la propiedad temp_min
//     )
// }

// Zod Schema
const weatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number()
    })
})

export type Weather = z.infer<typeof weatherSchema> // Infer es inferir sobre el schema

// Valibot Schema
// const weatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_min: number(),
//         temp_max: number()
//     })
// })

// type WeatherResponse = Output<typeof weatherSchema>

export default function useWeather() {

    const initialState = {
        name: '',
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0
        }
    }

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const apiId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiId}`
            const { data } = await axios.get(geoUrl)

            // Comprar si existe

            if (!data[0]) {
                setNotFound(true)
                return
            }

            const { lat, lon } = data[0]
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`

            // (Opción 1 Castear type, forzar por el tipo de dato que se va a recibir)
            // const { data: weatherResult } = await axios.get<WeatherType>(weatherUrl)
            // console.log(weatherResult.main.temp)
            // console.log(weatherResult.name)

            // (Opción 2 Type Guards o Assertions)
            // const { data: weatherResult } = await axios.get(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if (result) {
            //     console.log(weatherResult.main.temp)
            //     console.log(weatherResult.name)
            // } else {
            //     console.log('Respuesta mal formada')
            // }

            // (Opción 3 Zod)
            const { data: weatherResult } = await axios.get<Weather>(weatherUrl)
            const result = weatherSchema.safeParse(weatherResult)
            if (result.success) { // Si el resultado es exitoso retorna true
                setWeather(result.data) // Setea el estado con el resultado, cuando ingreso Ciudad y Pais, se setea el estado con el resultado obtenido
            }

            // (Opción 4 Valibot)
            // const { data: weatherResult } = await axios.get(weatherUrl)
            // const result = parse(weatherSchema, weatherResult)
            // if (result) { // Si el resultado es exitoso retorna true
            //     console.log(result.main.temp)
            //     console.log(result.name)
            // } else {
            //     console.log('Respuesta mal formada')
            // }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name , [weather])

    return {
        weather,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound
    }
}