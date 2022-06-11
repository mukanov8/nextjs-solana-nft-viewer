# NFT Viewer

A simple Next application for viewing NFTs of an arbitrary public key (address) from Solana

## Screenshots

## Features

- [x] User can input a public key and the viewer app will displays all of the NFTs held by the public key
- [x] NFT data is retrieved from Solana directly using `solana-web3.js` and `metaplex/js"`
- [x] Mobile friendly/Respoonsive
- [x] Dark mode support
- [x] NFT listing can be customized
  - [x] NFT listing can be sorted by last transaction time
  - [x] NFT listing can be sorted by creation time
  - [x] Initially the list is ordered by the last transaction times of the NFTs of a wallet
  - [ ] A user can change the order of ordered NFTs with drag-and-drop.
- [x] User can bookmark NFTs
  - [x] Bookmarked NFTs always come before NFTs that are not bookmarked.
  - [x] Each bookmark can be removed individually.
  - [x] There is a button that can be used to get rid of all existing bookmarks
- [x] Persistence: The result of the order customization or bookmarks are persisted even after reopening the window
- [x] When a user click a NFT card, it links them to `solscan.io/token/${nft_mint_public_key}`
- [ ] Undo button with which a user can undo the last change in order he caused. Undos can be done 4 times consecutively at most.

## Description

<https://konstellation.notion.site/Frontend-NFT-viewer-039b7c97ce1a4313b9d9c4f1ac06d266>

## TODOs

- [x] Next project setup
- [x] UI
- [x] Retrieve nft metadata from public address
- [x] Parse nft metadata and get image, creator and other data
- [x] Link to public token on click
- [x] Get transaction & creation time data from nft metadata
- [x] NFT listing/ordering customization
- [x] NFT bookmarking
- [x] Persistent state of order and bookmarking using localStorage
- [ ] NFT ordering using drag and drop
- [ ] Undo button

## Setup Instructions

1. Clone or download the project.
2. `cd` in the project directory.
3. If you cloned the project, make sure you remove the remote reference to this project by running `git remote rm origin`.
4. Copy `.env.example` to `.env` as that file is used to load up all your environment variables.
5. Run `yarn install` or `npm install` to install all dependencies.
6. Use following devnet public Keys for searching:

   ```bash
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

## Notes

1. This project was bootstrapped with `chakraui-react-next.js-typescript-eslint-jest-starter` template
2. This project removes the `x-powered-by` response header via `next.config.js` by marking the `poweredByHeader` property as `false`.
3. Tech.stack: **NextJS, Typescript, Recoil, ChakraUI, recoil-persist, solana/web3.js, metaplex/js, Jest**
4. Due to the constraints of time I couldn't write (unit) tests with **Jest** as I initially intended
5. For the same reason, I did not implement the NFT ordering with **Drag&Drop** and **undo** functionality
6. For drag and drop functionality, I had an idea to wrap my NftItem components using [React-Dnd library](https://react-dnd.github.io/react-dnd/docs/overview) or using my own draggable implementation in [mukanov8/draggable-task](https://github.com/mukanov8/draggable-task) repo and useRefs
