/* eslint-disable camelcase */
import axios from 'axios'
import { decodeToken, isExpired } from 'react-jwt'
import { getInLocalStorage, saveInLocalStorage } from 'utils/localStorageManager'

interface DecodedToken {
    exp: number
}

function getTimeRemaining(token: string) {
    const tokenDecode = decodeToken(token) as DecodedToken

    const now = new Date().getTime()

    const expiresAt = tokenDecode.exp * 1000

    const timeRemaining = expiresAt - now

    // Convertir el tiempo restante a horas, minutos y segundos
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60)
    const seconds = Math.floor((timeRemaining / 1000) % 60)

    return {
        hours,
        minutes,
        seconds,
    }
}

const fethcAuthenticationToken = async (storageKey: string) => {
    try {
        const url = import.meta.env.VITE_AUTH0_BENEFICIARIO_TOKEN_URL
        const clientId = import.meta.env.VITE_AUTH0_BENEFICIARIO_CLIENT_ID_API
        const clientSecret = import.meta.env.VITE_AUTH0_BENEFICIARIO_CLIENT_SECRET_API
        const audience = import.meta.env.VITE_AUTH0_BENEFICIARIO_AUDIENCE_AUTHORIZE
        const grantType = import.meta.env.VITE_AUTH0_BENEFICIARIO_GRANT_TYPE_API
        const data = {
            client_id: clientId,
            client_secret: clientSecret,
            audience: audience,
            grant_type: grantType,
        }

        const response = await axios.post(`${url}`, data)

        saveInLocalStorage(storageKey, JSON.stringify(response.data.access_token))

        return response.data.access_token
    } catch (error) {
        console.error('Error: ', error)
    }
}

export const authenticationToken = async () => {
    try {
        let token = getInLocalStorage('auth__token')

        if (token === null || token === '' || token === false) {
            token = await fethcAuthenticationToken('auth__token')
        } else {
            const tokenExpired = isExpired(token)

            const timeRemaining = getTimeRemaining(token)
            // console.log('auth__token: ', token)
            // console.log('timeRemaining auth__token: ', timeRemaining)
            if (tokenExpired && timeRemaining.minutes <= 5) {
                saveInLocalStorage('auth__token', '')
                token = await fethcAuthenticationToken('auth__token')
            }
        }

        return token
    } catch (error) {
        console.error('Error: ', error)
    }
}

export const authenticationTokenSekure = async () => {
    try {
        let token = getInLocalStorage('auth__token__sekure')

        if (token === null || token === '' || token === false) {
            token = await fethcAuthenticationToken('auth__token__sekure')
        } else {
            const tokenExpired = isExpired(token)

            const timeRemaining = getTimeRemaining(token)

            if (tokenExpired && timeRemaining.minutes <= 5) {
                saveInLocalStorage('auth__token__sekure', '')
                token = await fethcAuthenticationToken('auth__token__sekure')
            }
        }

        return token
    } catch (error) {
        console.error('Error: ', error)
    }
}

export const fethcAuthenticationTokenPay = async (storageKey: string) => {
    try {
        const url = import.meta.env.VITE_AUTH0_TOKEN_URL_PAY
        const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID_API_PAY
        const clientSecret = import.meta.env.VITE_AUTH0_CLIENT_SECRET_API_PAY
        const audience = import.meta.env.VITE_AUTH0_AUDIENCE_API_PAY
        const grantType = import.meta.env.VITE_AUTH0_GRANT_TYPE_API_PAY

        const data = {
            client_id: clientId,
            client_secret: clientSecret,
            audience: audience,
            grant_type: grantType,
        }

        const response = await axios.post(`${url}`, data)

        saveInLocalStorage(storageKey, JSON.stringify(response.data.access_token))

        return response.data.access_token
    } catch (error) {
        console.error('Error: ', error)
    }
}

export const authenticationTokenPay = async () => {
    try {
        let token = getInLocalStorage('auth__token__pay')

        if (token === null || token === '' || token === false) {
            token = await fethcAuthenticationTokenPay('auth__token__pay')
        } else {
            const tokenExpired = isExpired(token)

            const timeRemaining = getTimeRemaining(token)
            // console.log('auth__token__pay: ', token)
            // console.log('timeRemaining auth__token__pay: ', timeRemaining)
            if (tokenExpired && timeRemaining.minutes <= 5) {
                saveInLocalStorage('auth__token__pay', '')
                token = await fethcAuthenticationTokenPay('auth__token__pay')
            }
        }

        return token
    } catch (error) {
        console.error('Error: ', error)
    }
}
