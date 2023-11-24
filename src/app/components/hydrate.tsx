'use client'

import { ReactNode, useEffect, useState } from 'react'

interface IHydrate {
  children: ReactNode
}

export const Hydrate = ({ children }: IHydrate) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted ? <>{children}</> : <span>carregando...</span>
}
