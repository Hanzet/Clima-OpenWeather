export const formatTemperature = (temperature: number): number => {
    const kelvin = 273.15
    return parseFloat((temperature - kelvin).toFixed(1))
}