'use client'

import { useRouter } from 'next/navigation'

import { GEOFIPS } from '@/data'

import { useChartInputState } from '@/context/chart-params.context'
import { useGetInitialStateFromParams } from './dashboard/_hooks/useGetInitialStateFromParams'
import { useSetUrlParams } from './dashboard/_hooks/useSetUrlParams'

import { StateDropdown } from '@/components/inputs/state-dropdown'
import { Button } from '@/shadcn/ui/button'


export default function Home() {
  const { push } = useRouter()

  const { stateParams } = useChartInputState()
  const { handleSetUrlParams } = useSetUrlParams()

  useGetInitialStateFromParams()

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
        <Button onClick={handleSetUrlParams} disabled={stateParams.length <= 0}>
          View Data →
        </Button>
      </div>
    </main>
  )
}
