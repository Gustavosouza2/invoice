'use client'

import React, { ReactNode } from 'react'

import { useIsMobile } from '@/hooks/ui/use-mobile'

import { HeaderDashboard } from './Header'
import { NavItems } from './NavItem'

export const DashBoardLayout = React.memo(
  ({ children }: { children: ReactNode }) => {
    const isMobile = useIsMobile()

    return (
      <div className="w-full h-full flex flex-col justify-center items-center pt-20 pb-7 overflow-scroll md:overflow-visible">
        <HeaderDashboard />
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
