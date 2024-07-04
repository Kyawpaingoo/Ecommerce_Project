import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme: Theme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper:{
                    backgroundColor: '#2c387e',
                    color: '#ffffff'
                }
            }
        }
    }
})

export default theme;