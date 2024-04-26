'use client'

import useSWR from 'swr'
import { PageProps } from '@/.next/types/app/dashboard/page'

import { useChartInputState } from '@/context/chart-params.context'

import { fetchChartData } from './_actions/fetch-chart-data'

import { ChartsList } from './_components/chart-list'
import { ChartsSummary } from './_components/chart-summary'


const Dashboard = ({ searchParams }: PageProps) => {
  const { stateParams } = useChartInputState()

  const {
    error,
    data,
    isLoading,
  } = useSWR(
    stateParams ? searchParams : null,
    () => fetchChartData(searchParams)
  )

  if (error) throw new Error('No chart data loaded!')

  if (isLoading || !data || data?.length === 0) {
    return (
      <>
        <ChartsList.Skeleton />
        <ChartsSummary.Skeleton />
      </>
    )
  }

  const assertedData = data as IBeaApiResponse[][];

  return (
    <>
      <ChartsList data={assertedData} />
      <ChartsSummary data={assertedData} />
    </>
  )
}

export default Dashboard
