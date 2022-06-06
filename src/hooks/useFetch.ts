import { useState, useEffect } from 'react'

const useFetch = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          setData(res)
          setLoading(false)
          setLoaded(true)
        },
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (error) => {
          setLoading(false)
          setLoaded(true)
          setError(error)
        }
      )
  }, [url])

  return { data, loading, loaded, error }
}

export default useFetch
