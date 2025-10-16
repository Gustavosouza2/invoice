'use client'

import React, { ReactNode } from 'react'

import { useMobile } from '@/hooks/custom/useCustomMobile'
import { HeaderDashboard } from './Header'
import { NavItems } from './NavItem'

export const DashBoardLayout = React.memo(
  ({ children }: { children: ReactNode }) => {
    const isMobile = useMobile()

    return (
      <div className="w-full h-full flex flex-col justify-center items-center py-7 overflow-scroll md:overflow-visible">
        {isMobile && (
          <div className="w-full sticky top-0 z-10 mb-4">
            <HeaderDashboard />
          </div>
        )}
        {children}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-10">
            <NavItems />
          </div>
        )}
      </div>
    )
  },
)

DashBoardLayout.displayName = 'DashBoardLayout'
