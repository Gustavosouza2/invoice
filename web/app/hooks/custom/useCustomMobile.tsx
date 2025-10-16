'use client'

import { useState, useEffect, useCallback } from 'react'

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const checkMobile = useCallback(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches)
  }, [])

  useEffect(() => {
    checkMobile()

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    mediaQuery.addEventListener('change', checkMobile)

    return () => mediaQuery.removeEventListener('change', checkMobile)
  }, [checkMobile])

  return isMobile
}
