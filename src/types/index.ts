export type Creator = {
  address: string
  share: number
  verified: number
}

export type Nft = {
  mint: string
  name: string
  creators: Creator[] | null
  uri: string
  isBookmarked: boolean
  bookmarkedTime: Date
  creationTime: Date
  lastTransactionTime: Date
}

export type Bookmark = {
  mint: string
  timestamp: Date
}
