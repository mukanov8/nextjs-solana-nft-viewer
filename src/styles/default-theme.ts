import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export default extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  styles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global: (props: any) => ({
      body: {
        color: mode('gray.700', 'whiteAlpha.900')(props),
        bg: mode('gray.50', '#08080b')(props), // MUI black #121212 // alt #0d1117
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        'box-sizing': 'border-box',
      },
    }),
  },
  fonts: {
    body: 'Rambla, Inter, system-ui, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu',
  },
  colors: {
    primary: '#2F80ED',
    background: '#F4F8FA',
    lightgray: '#CFCFCF',
    darkgray: '#828282',
  },
})
