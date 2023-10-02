import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Button: {
            variants: {
                gradient: {
                    bgGradient: 'linear(to-r, pink.500, orange.500)',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderRadius: '27px',
                    height: '51px',
                    width: '100%'
                },
                withoutbg: {
                    bg: 'white',
                    border: '2px solid',
                    borderColor: 'orange.500',
                    color: 'orange.500',
                    fontSize: '18px',
                    borderRadius: '27px',
                    height: '51px',
                    width: '100%'
                }
            }
        }
    },
    colors: {
        orange: {
            500: "#FE7E02"
        },
        gray: {
            100: "#6d7880",
            300: "#E0E0E0",
            500: "#EDEDED",
            700: "#6F6F6F",
            900: '#373737'
        },
        blue: {
            500: "#4088CB",
            100: "d0d0d0"
        },
        pink: {
            500: "#FF6489"
        },
        yellow: {
            500: "#FFFEB8"
        }
    }
})