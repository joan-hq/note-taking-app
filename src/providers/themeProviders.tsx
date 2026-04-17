'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: 'var(--color-cream)'
    },

    // text: {
    //   primary: 'var(--color-dark)',
    // },
  }
})

export default function ThemeProviders({children}: {children: React.ReactNode}) {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
      {children}
  </ThemeProvider>;
}