/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Center, ChakraProvider } from '@chakra-ui/react'
import defaultTheme from '@src/styles/default-theme'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

const App = ({ Component, pageProps }: any) => {
  const { APP_NAME } = process.env

  return (
    <RecoilRoot>
      <ChakraProvider theme={defaultTheme}>
        <Head>
          <meta charSet="utf-8" />
          <title>{APP_NAME}</title>
        </Head>
        <Center w="100vw" h="100vh" flexDir="column" p={['16px', '48px']} overflow="auto">
          <Component {...pageProps} />
        </Center>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
