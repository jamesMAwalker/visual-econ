'use client'

import { MouseEventHandler, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Settings2 } from 'lucide-react'
import Link from 'next/link'

import { GEOFIPS } from '@/data'

import { useSetUrlParams } from '@/app/dashboard/_hooks/useSetUrlParams'

import { Button } from '@/shadcn/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/shadcn/ui/sheet'

import { StateDropdown } from '@/components/inputs/state-dropdown'
import { DateDropdown } from '@/components/inputs/date-dropdown'


export const Toolbar = () => {
  const path = usePathname()

  const { handleSetUrlParams } = useSetUrlParams()

  return (
    <div className='TOOLBAR justify-between border-neutral-800 z-50 flex items-start w-full gap-lg p-layout border-b h-min'>
      <Link
        className='LOGO py-xs px-sm border-l border-zinc-500 lg:border-transparent lg:p-0 h-[unset] text-2xl font-bold'
        href='/'
      >
        Visual Economy
      </Link>
      {path === '/dashboard' && (
        <>
          <div className='DESKTOP_TOOLS hidden lg:flex lg:items-center lg:justify-end w-min gap-4'>
            <Toolbar.Tools handler={handleSetUrlParams} />
          </div>
          <Toolbar.Mobile>
            <Toolbar.Tools handler={handleSetUrlParams} />
          </Toolbar.Mobile>
        </>
      )}
    </div>
  )
}

Toolbar.Desk = function DesktopToolbar({ children }: { children: ReactNode }) {
  return (
    <div className='DESKTOP_TOOLS hidden lg:flex lg:items-center lg:justify-end w-min gap-4'>
      {children}
    </div>
  )
}

Toolbar.Mobile = function MobileToolbar({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild className='MOBILE_TOOLS_TRIGGER block lg:hidden'>
        <Button variant='outline'>
          <Settings2 />
        </Button>
      </SheetTrigger>
      <SheetContent side='top' className='MOBILE_TOOLS flex-col-tl p-lg gap-md'>
        <SheetTitle>Chart Parameters</SheetTitle>
        <SheetDescription>
          Change the chart parameters using the dropdowns below.
        </SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  )
}

Toolbar.Tools = function Tools({
  handler
}: {
  handler: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <>
      <DateDropdown />
      <StateDropdown list={GEOFIPS} />
      <Button onClick={handler} variant='secondary'>
        Submit
      </Button>
    </>
  )
}
