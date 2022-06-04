// import { Connection } from '@metaplex/js'
import { useRecoilState, useRecoilValue } from 'recoil'
import { nftReadOnlyState, publicKeyState } from '../stores/nft.store'

const NftViewerPage = () => {
  const [publicKey, setPublicKey] = useRecoilState(publicKeyState)
  const nft = useRecoilValue(nftReadOnlyState)

  return <div>NFT Viewer</div>
}

export default NftViewerPage
