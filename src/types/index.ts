export type Creator = {
  address: string
  share: number
  verified: number
}

export type ParsedNftType = {
  mint: string
  name: string
  creators: Creator[] | null
  uri: string
  time: Date[]
}
