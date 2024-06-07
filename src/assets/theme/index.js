import {
    primary,
    secondary,
    success,
    link,
    error,
    xs,
    small,
    medium,
    large,
    extraLarge
} from '../_scss/export-variables.module.scss'

const $primary = primary
const $secondary = secondary
const $success = success
const $error = error
const $link = link

const [$small] = small.split('px')
const [$xs] = xs.split('px')
const [$medium] = medium.split('px')
const [$large] = large.split('px')
const [$extraLarge] = extraLarge.split('px')

export const palette = () => {
    return {
        typography: {
            fontFamily: ['app', 'header']
        },
        breakpoints: {
            values: {
                xs: +$xs,
                sm: +$small,
                md: +$medium,
                lg: +$large,
                xl: +$extraLarge
            }
        },
        palette: {
            type: 'light',
            action: {},
            primary: {
                light: '#fff',
                main: $primary,
                contrastText: '#ffffff'
            },
            secondary: {
                light: '#000',
                main: $secondary,
                contrastText: '#000000'
            },
            success: {
                light: '#81c784',
                main: $success,
                contrastText: '#ffffff'
            },
            link: {
                light: $link,
                main: $link,
                contrastText: '#ffffff'
            },
            error: {
                light: '#fff',
                main: $error,
                contrastText: '#ffffff'
            }
        }
    }
}
