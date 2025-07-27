export type SearchType = {
    city: string;
    country: string;
}

export type Country = {
    code: string;
    name: string;
}

export type WeatherResponse = { // (Opción 3 Zod Schema)
    name: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    }
}

export type WeatherCasterType = { // (Opción 1 Castear type, forzar por el tipo de dato que se va a recibir)
    name: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    }
}

export type WeatherGuardsType = { // (Opción 2 Type Guards o Assertions)
    name: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number
    }
}