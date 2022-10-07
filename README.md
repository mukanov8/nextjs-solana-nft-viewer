# NFT Viewer

[![Netlify Status](https://api.netlify.com/api/v1/badges/3e4a6248-d5eb-4c3e-b9fb-741f8548d0e9/deploy-status)](https://app.netlify.com/sites/solana-nft-viewer/deploys)

A simple Next application for viewing NFTs of an arbitrary public key (address) from Solana

Tech. stack: NextJS, Typescript, Recoil, ChakraUI, recoil-persist, solana/web3.js, metaplex/js, Jest

## Screenshots

### Desktop

<img width="1395" alt="Screen Shot 2022-10-07 at 11 26 33 PM" src="https://user-images.githubusercontent.com/55445687/194578420-38b5be96-0545-490f-99d0-8ba2af6b5af8.png">
<img width="1395" alt="Screen Shot 2022-10-07 at 11 26 48 PM" src="https://user-images.githubusercontent.com/55445687/194578442-08b9546d-5aa1-4803-8ed3-0320beeb8246.png">

### Mobile

<p align="middle">
  <img width="280" alt="Screen Shot 2022-10-07 at 11 30 26 PM" src="https://user-images.githubusercontent.com/55445687/194578454-08fc4274-6f91-4914-9c50-6d6e084c1786.png">
   &nbsp;&nbsp;
  <img width="280" alt="Screen Shot 2022-10-07 at 11 30 53 PM" src="https://user-images.githubusercontent.com/55445687/194578470-b8530fae-6d70-42f8-8b5f-36fa7c104256.png">
</p>

## Features

- [x] App displays all NFTS held by inputted public key/wallet
- [x] NFT data is retrieved from Solana directly using `Solana API (solana-web3.js)` and `Metaplex SDK (metaplex/js)`
- [x] Mobile-friendly/Responsive
- [x] Dark mode support
- [x] NFT listing can be customized
  - [x] By last transaction time
  - [x] By creation time
  - [x] Initially ordered by the last transaction time
- [x] User can bookmark NFTs
  - [x] Bookmarked NFTs come first in the listing
  - [x] Each bookmark can be removed individually or in group
- [x] Persistence: The result of the order customization or bookmarks are persisted even after reopening the window (LocalStorage)
- [x] When a user click a NFT card, it links them to `solscan.io/token/${nft_mint_public_key}`

## TODOs

- [ ] NFT ordering using drag and drop
- [ ] Undo button for user actions
- [ ] Test coverage using Jest

## Setup Instructions

1. Clone or download the project.
2. `cd` in the project directory.
3. Copy `.env.example` to `.env` as that file is used to load up all your environment variables.
4. Run `yarn install` install all dependencies.
5. Run `yarn dev` to run the project

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
3. For drag and drop functionality, I had an idea to wrap my NftItem components using [React-Dnd library](https://react-dnd.github.io/react-dnd/docs/overview) or using my own draggable implementation in [mukanov8/draggable-task](https://github.com/mukanov8/draggable-task) repo and useRefs
