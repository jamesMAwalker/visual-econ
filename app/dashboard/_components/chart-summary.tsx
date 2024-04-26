'use client'


import { useChartInputState } from '@/context/chart-params.context'
import { useGetCurrentDataSummary } from '../_hooks/useGetCurrentDataSummary'

import { cn } from '@/shadcn/utils'
import { getMeanFromBeaData } from '@/lib/get-mean-from-bea'

import { CHART_COLORS } from '@/data/colors'
import { IDataDescription } from '@/data/descriptions'

import { Skeleton } from '@/shadcn/ui/skeleton'


export function ChartsSummary({ data }: { data: IBeaApiResponse[][] }) {
  const { currentChartId } = useChartInputState()

  const summary = useGetCurrentDataSummary(data, currentChartId)

  return (
    <div className='SUMMARY flex-col-tl bg-zinc-500/10 full divide-y-[.5px] divide-neutral-800 divide-dashed'>
      {summary?.currentDescription && (
        <TextSummary description={summary.currentDescription} />
      )}
      {summary?.currentData && <DataSummary data={summary.currentData} />}
    </div>
  )
}

function TextSummary({ description }: { description: IDataDescription }) {
  return (
    <div className='CURRENT_DATA flex-col-tl gap-md p-lg h-2/3 w-full'>
      <div className='HEADING text-2xl font-bold'>{description?.title}</div>
      <p className='DESCRIPTION'>{description?.description}</p>
      <ul className='LIST list-style-disc'>
        <li className='text-lg italic font-bold'>Key Features</li>
        {description?.key_features.map((feature: string) => {
          return <li key={feature}>{feature}</li>
        })}
      </ul>
    </div>
  )
}

function DataSummary({ data }: { data: IBeaApiResponse[] }) {
  return (
    <div className='OVERALL_DATA flex-col-c gap-md p-lg h-1/3 w-full'>
      <p className='flex-col-c uppercase text-[12px] text-center'>
        <span>{data[0].Statistic}</span>
        <span>(Time Period Average)</span>
      </p>
      <div className='NUMBERS_CONTAINER flex-c gap-md'>
        {data.map((data: IBeaApiResponse, idx: number) => {
          const mean = getMeanFromBeaData({ data: data.Data })

          return (
            <div
              key={data.StateName}
              style={{ color: `${CHART_COLORS[idx].hex}` }}
              className='flex-col-c'
            >
              <span className='text-[14px] uppercase'>{data.StateName}</span>
              <span className={cn('text-2xl font-bold uppercase')}>
                {mean}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ChartsSummary.Skeleton = function SkeletonSummary() {
  return (
    <div className='SKELETON_SUMMARY flex-col-tl full divide-y-[.5px] divide-neutral-800 divide-dashed'>
      <div className='SKELETON_TEXT flex-col-tl p-lg gap-md h-2/3 w-full'>
        <Skeleton className='h-[5ch] w-full' />
        <Skeleton className='w-full h-full' />
      </div>
      <div className='SUMMARY_SKELETON flex-c p-lg gap-md h-1/3 w-full'>
        <Skeleton className='aspect-square w-full' />
        <Skeleton className='aspect-square w-full' />
        <Skeleton className='aspect-square w-full' />
      </div>
    </div>
  )
}
