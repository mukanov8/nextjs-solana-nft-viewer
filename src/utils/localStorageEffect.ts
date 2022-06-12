type Effect = {
  setSelf: (arg: any) => void
  onSet: (arg: any) => void
}

/** 
  UNUSED. recoil-persist library is used instead
  https://recoiljs.org/docs/guides/atom-effects/#local-storage-persistence
*/
export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: Effect) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }
    onSet((newValue: any) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    })
  }
