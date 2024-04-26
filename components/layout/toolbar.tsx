'use client'

import { MouseEventHandler, ReactNode } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { GEOFIPS, STAT_TABLES } from '@/data'

import { useChartInputState } from '@/context/chart-params.context'

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
import { useGetInitialStateFromParams } from '@/app/dashboard/_hooks/useGetInitialStateFromParams'
import { Settings2 } from 'lucide-react'

export const Toolbar = () => {
  const path = usePathname()
  const router = useRouter()

  const { stateParams, dateParams } = useChartInputState()

  useGetInitialStateFromParams()

  function handleSetUrlParams() {
    const urlDateParams = dateParams
      .map((date) => `${date.value}`)
      .join('&dates=')
    const urlTableParams = STAT_TABLES.map(
      (table) => `${table.TableName}_${table.LineCode}`
    ).join('&tables=')
    const urlStateParams = stateParams
      .map((item) => `${item.key}`)
      .join('&states=')
    const url = `/dashboard?states=${urlStateParams}&tables=${urlTableParams}&dates=${urlDateParams}`

    router.push(url)
    router.refresh()
  }

  return (
    <div className='TOOLBAR justify-between border-neutral-800 z-50 flex items-start w-full gap-lg p-layout border-b h-min'>
      <Link href='/'>
        <h1 className='LOGO text-2xl font-bold'>Visual Economy</h1>
      </Link>
      {path === '/dashboard' && (
        <>
          <div className='DESKTOP_TOOLS hidden lg:flex lg:items-center lg:justify-end w-min gap-4'>
            <Toolbar.Tools handler={handleSetUrlParams}/>
          </div>
          <Toolbar.Mobile>
            <Toolbar.Tools handler={handleSetUrlParams}/>
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

