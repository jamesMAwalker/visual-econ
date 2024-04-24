'use client'

import { useRouter } from 'next/navigation'

import { GEOFIPS } from '@/data'
import { STAT_TABLES } from '@/data'

import { Button } from '@/shadcn/ui/button'
import { useChartInputState } from '@/context/chart-params.context'
import { StateDropdown } from '@/components/inputs/state-dropdown'

// TODO: Add dropdowns for table selection.

export default function Home() {
  const { push } = useRouter()

  const { stateParams } = useChartInputState()

  function handleSetUrlParams() {
    const urlTableParams = STAT_TABLES.map(table => `${table.TableName}_${table.LineCode}`).join('&tables=')
    const urlStateParams =  stateParams.map(item => `${item.key}`).join('&states=')
    const url = `/dashboard?states=${urlStateParams}&tables=${urlTableParams}`

    push(url)
  }

  return (
    <main className='START_PAGE full flex-col-c gap-md'>
      <div className='BLURB_CONTAINER flex-col-c gap-md w-4/5 lg:w-2/3'>
        <h1 className='text-2xl lg:text-4xl font-bold text-center'>
          Visual Economy
        </h1>
        <p className='BLURB font-bold flex-col-c gap-md text-lg lg:text-xl text-center'>
          <span>
            Compare the economic performance and viability of up to 3 different
            states at a time and see how they stack up against each other.
          </span>
        </p>
      </div>
      <div className='DROPDOWN_CONTAINER flex-c gap-md'>
        <StateDropdown list={GEOFIPS} />
        <Button onClick={handleSetUrlParams}>Compare →</Button>
      </div>
    </main>
  )
}
