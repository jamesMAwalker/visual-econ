'use client'

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useChartInputState } from '@/context/chart-params.context';
import { cn } from '@/shadcn/utils'

import { Skeleton } from '@/shadcn/ui/skeleton'
import { LineChart } from '@/components/charts/line';


export function ChartsList({ data }: { data: IBeaApiResponse[][] }) {
  return (
    <section className='CHARTS_LIST md:px-xl lg:full flex-col-tl p-layout sm:gap-xl gap-layout overflow-y-scroll pb-[20vh] lg:pb-[30vh]'>
      {data?.map((dataSets: any[]) => {
        return <ChartItem key={dataSets[0].Statistic} dataSets={dataSets} />
      })}
    </section>
  )
}

ChartsList.Skeleton = function ListSkeleton() {
  return (
    <section className='CHARTS_LIST_SKELETON md:px-xl lg:full flex-col-tl p-layout sm:gap-xl gap-layout overflow-y-scroll pb-[20vh] lg:pb-[30vh]'>
      {[1, 2, 3, 4].map((item) => {
        return (
          <Skeleton className=' aspect-video flex-shrink-0 w-full' key={item} />
        )
      })}
    </section>
  )
}

const ChartItem = ({ dataSets }: { dataSets: any[] }) => {
  const { setCurrentChartId } = useChartInputState()
  const { inView, ref } = useInView({ threshold: 1 })
  const [chartData] = dataSets

  useEffect(() => {
    if (inView) {
      setCurrentChartId(chartData.TableName)
    }
  }, [inView, chartData.TableName]) // eslint-disable react-hooks/exhaustive-deps

  return (
    <span
      ref={ref}
      key={chartData.Statistic}
      className={cn(
        'CHART_ITEM transition-all flex-shrink-0 aspect-video xl:aspect-video w-full border border-neutral-800 rounded-md flex-c [&_canvas]:h-full [&_canvas]:w-full p-4 opacity-50',
        inView && '!border-blue-900 opacity-100'
      )}
    >
      <LineChart dataSets={dataSets} />
    </span>
  )
}
