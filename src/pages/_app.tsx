/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { Center, ChakraProvider } from '@chakra-ui/react'

import defaultTheme from '@src/styles/default-theme'
import { RecoilRoot, useRecoilState } from 'recoil'
import Head from 'next/head'
import ModeButton from '@src/components/mode-button'
import { bookmarksState, orderByState } from '@src/stores/nft.store'

const App = ({ Component, pageProps }: any) => {
  // just in case the .env file is not present during local testing
  const APP_NAME = process.env.APP_NAME || 'NFT Viewer'

  // const [bookmarks, setBookmarks] = useRecoilState(bookmarksState)
  // const [orderBy, setOrderBy] = useRecoilState(orderByState)

  // useEffect(() => {
  //   const bookmarkslocalData = localStorage.getItem('bookmarks')
  //   const orderBylocalData = localStorage.getItem('orderBy')

  //   if (bookmarks.length < 1) {
  //     if (bookmarkslocalData !== null || undefined) {
  //       setBookmarks(bookmarkslocalData)
  //     }
  //   } else {
  //     localStorage.setItem()
  //     setLogin({ localValue: null })
  //   }
  // }, [login])

  return (
    <RecoilRoot>
      <ChakraProvider theme={defaultTheme}>
        <Head>
          <meta charSet="utf-8" />
          <title>{APP_NAME}</title>
        </Head>
        <Center w="100vw" h="100vh" flexDir="column" p={['16px', '48px']} overflow="auto">
          <ModeButton position="fixed" right="0" top="0" mr={['16px', '48px']} mt={['16px', '48px']} />
          <Component {...pageProps} />
        </Center>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
