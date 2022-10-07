/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const ENV_VARS = {
  APP_NAME: process.env.APP_NAME,
  EXAMPLE_DEVNET_KEY_1: process.env.EXAMPLE_DEVNET_KEY_1,
  EXAMPLE_DEVNET_KEY_2: process.env.EXAMPLE_DEVNET_KEY_2,
}

module.exports = {
  env: ENV_VARS,
  publicRuntimeConfig: ENV_VARS,
  poweredByHeader: false,
}

const intercept = require('intercept-stdout')

/** Safely ignore recoil warning messages in dev (triggered by HMR or next)
 - https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-729255961
 - src: https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-923492445
*/
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout)
}
