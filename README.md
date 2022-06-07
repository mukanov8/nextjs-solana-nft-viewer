# NFT Viewer

A simple Next application for viewing NFTs of an arbitrary public key (address)

## Description

- Once a user inputs a public key then the viewer app displays all of the NFTs held by the public key.
- The NFT data should be retrieved from Solana itself directly using libraries such as `solana-web3.js`. Do not extract data from other centralized services.
- The list of retrieved NFTs should be up to date.
- NFT listing can be customized.
  - There are two buttons, **order by last transaction time** and **order by creation tim**e. Both of them make the items listed in decreasing order in time.
  - If a user clicks **order by last transaction time** then the resulting NFTs become re-ordered according to their last transaction times.
  - If a user clicks **order by creation tim**e \*\*\*\*then the resulting NFTs become re-ordered according to their last creation times.
  - Initially the list is ordered by the last transaction times of the NFTs of a wallet.
  - A user can change the order of ordered NFTs with drag-and-drop. (order customization).
  - If a user clicks **order by last transaction time** after changing the existing order with drag-and-drops, the custom change is forgotten and the NFTs are only ordered by their last transaction times. The same happens for **order by creation tim**e.
- A user can bookmark NFTs.
  - Bookmarked NFTs always come before NFTs that are not bookmarked.
  - Each bookmark can be removed individually.
  - There is a button that can be used to get rid of the existing bookmarks.
- When a user click a NFT card, it should link to `solscan.io/token/${nft_mint_public_key}`
- There is an undo button with which a user can undo the last change in order he caused. Undos can be done 4 times consecutively at most.
- The result of the order customization or bookmarks are persisted even after reopening the window.

## To-do

- [x] Next project setup
- [x] UI
- [x] Retrieve nft metadata from public address
- [x] Parse nft metadata and get image, creator and other data
- [x] Link to public token on click
- [ ] Get transaction & creation time data from nft metadata
- [ ] NFT listing/ordering customization
- [ ] NFT bookmark
- [ ] Undo button(?)

## Setup Instructions

1. Clone or download the project.
2. `cd` in the project directory.
3. If you cloned the project, make sure you remove the remote reference to this project by running `git remote rm origin`.
4. Copy `.env.example` to `.env` as that file is used to load up all your environment variables.
5. Run `yarn install` or `npm install` to install all dependencies.
6. You can use following devnet public Keys:

   ```
       E2APdVioPqt8nXFn2Qqu5TKfU2Zp9vB3WP49J7PADWDH
       3sqgCvvQTqWpCydeQL9w1FwVFQpkkBM6eK1qa3WZD7Wg
   ```

## Commands

- `yarn dev`: To start a local development server.
- `yarn test`: To run the entire unit test suite using `jest`.
- `yarn test:ci`: To run tests on CI.
- `yarn lint`: To run the ESLint based linter to find out the issues in the project.
- `yarn format`: To autoformat all the issues.
- `yarn export`: Run this after running `yarn analyze` to export a build copy.
- `yarn production`: To export a production build. Use `yarn start` to serve that.

- `yarn upgrade --latest`: To upgrade all packages to their latest versions (could include breaking changes).

## Code Structure

All source code is located in the `src/` directory:

1. All Next.js entrypoints are housed in the `src/pages` directory as a default.

   - `_app.tsx` which bootstraps ChakraUI and Recoil within this project and sets the styling for the page.
   - `index.tsx` is the main search page
   - `_error.tsx` is the error page
   - `viewer` page is the page that displays the nft list with dynamic route for the publicKey

2. `src/components` are all stateless reusable components.

   - `MainHeading` component with a JEST test as a sample
   - `NftList`, `NftItem` components are used to display the nft list
   - `ModeButton` is the button that toggles the dark/light mode
   - etc

3. `src/styles` folder is there just to house any styling.

   - It currently contains a default ChakraUI theme

4. All env variables are available in `.env` files (`.env` file isn't committed). Whenever you update `.env`, please update `.env.example` and `.env.test` and `next.config.js` to proxy all environment variables properly.

   - You can access these variables in the app source code anywhere using `process.env.<VAR_NAME>`.

If you feel like changing the directory structure, please change the appropriate settings in the following files:

- `.swcrc`
- `jest.config.js`
- `tsconfig.json`
- The `lint` and the `format` scripts in `package.json`

## Note

1. This project was bootstrapped with `chakraui-react-next.js-typescript-eslint-jest-starter` template
2. This project removes the `x-powered-by` response header via `next.config.js` by marking the `poweredByHeader` property as `false`.
3. If you wish to use Babel instead of SWC (introduced with the Next.js v12 upgrade), please remove the `.swcrc` file and add a `.babelrc` file at the root with the following:

```
{
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "module-resolver",
            {
                "root": [
                    "./"
                ],
                "alias": {
                    "@src": "./src"
                },
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            }
        ]
    ]
}
```

Then, open `./jest.config.js` and find the `globals` config. Add `babelConfig` to it, like so:

```
{
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
            babelConfig: true,
            diagnostics: false,
        },
    },
}
```

Also, run `yarn add -D @babel/core babel-plugin-module-resolver eslint-import-resolver-babel-module` to install Babel's dependencies.
