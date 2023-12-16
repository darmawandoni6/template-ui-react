import { useEffect, useState } from 'react'

const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}

export default useIsClient
