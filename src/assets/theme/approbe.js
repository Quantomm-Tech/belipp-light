import * as variables from '../_scss/export-variables-approbe.module.scss'

export const palette = () => {
    return {
        typography: {
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500
        },
        breakpoints: {},
        palette: {
            type: 'light',
            action: {},
            primary: {
                light: '#fff',
                main: variables.primary,
                contrastText: variables.secondary
            },
            secondary: {
                light: '#000',
                main: variables.secondary,
                contrastText: '#ffffff'
            },
            success: {
                light: '#81c784',
                main: variables.success,
                contrastText: '#ffffff'
            },
            link: {
                light: variables.link,
                main: variables.link,
                contrastText: '#ffffff'
            },
            error: {
                light: '#fff',
                main: variables.error,
                contrastText: '#ffffff'
            },
            radio: {
                light: '#000000',
                main: '#000000',
                contrastText: '#000000'
            }
        }
    }
}
