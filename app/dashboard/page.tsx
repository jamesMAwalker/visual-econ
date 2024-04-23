'use client'

import React from 'react'
import useSWR from 'swr'

import { useChartInputState } from '@/context/chart-params.context'
import { fetchChartData } from './_actions/fetch-chart-data'
import { convertParamsToRequest } from '@/lib/convert-params-to-request'

// TODO: Get data using params.
// TODO: Render data in layout.

const Dashboard = ({ searchParams }: any) => {
  const { stateParams } = useChartInputState()

  const {
    error,
    data,
    isLoading,
    mutate: refetch
  } = useSWR(
    stateParams ? '/chart-data' : null,
    () => fetchChartData({ ...convertParamsToRequest(searchParams) }),
    {
      shouldRetryOnError: false
    }
  )

  return (
    <main className='full flex-col-c gap-md'>
      {/* {searchParams.states.map((state: any) => {
        return <span key={state}>{state}</span>
      })} */}
    </main>
  )
}

export default Dashboard
