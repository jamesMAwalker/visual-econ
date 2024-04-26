'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { GEOFIPS, STAT_TABLES } from '@/data'

import { useChartInputState } from '@/context/chart-params.context'

import { Button } from '@/shadcn/ui/button'
import { StateDropdown } from '@/components/inputs/state-dropdown'
import { DateDropdown } from '@/components/inputs/date-dropdown'
import { useGetInitialStateFromParams } from '@/app/dashboard/_hooks/useGetInitialStateFromParams'

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
    <div className='TOOLBAR md:justify-between md:flex-row border-neutral-800 z-50 flex flex-col items-start justify-start w-full gap-8 p-8 border-b h-min'>
      <Link href='/'>
        <h1 className='LOGO text-2xl font-bold'>Visual Economy</h1>
      </Link>
      {path === '/dashboard' && (
        <div className='TOOLS sm:flex-row md:w-auto flex flex-col items-center justify-center w-full gap-4'>
          <DateDropdown />
          <StateDropdown list={GEOFIPS} />
          <Button onClick={handleSetUrlParams} variant='secondary'>
            Submit
          </Button>
        </div>
      )}
    </div>
  )
}
