'use client'

import { ChevronDown } from 'lucide-react'

import { useChartInputState } from '@/context/chart-params.context'
import {
  IChartSummaryInfo,
  useGetCurrentDataSummary
} from '../_hooks/useGetCurrentDataSummary'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shadcn/ui/sheet'
import { Skeleton } from '@/shadcn/ui/skeleton'
import { Button } from '@/shadcn/ui/button'

import { ChartTextSummary } from './chart-text-summary'
import { ChartDataSummary } from './chart-data-summary'


export function ChartsSummary({ data }: { data: IBeaApiResponse[][] }) {
  const { currentChartId } = useChartInputState()

  const summary: IChartSummaryInfo | null = useGetCurrentDataSummary(
    data,
    currentChartId
  )

  if (!summary) return null

  return (
    <>
      <div className='DESKTOP_SUMMARY hidden lg:flex order-first lg:order-last h-full flex-row lg:flex-col items-start justify-start bg-zinc-500/10 full divide-y-[.5px] divide-neutral-800 divide-dashed'>
        {summary?.currentDescription && (
          <ChartTextSummary description={summary.currentDescription} />
        )}
        <ChartDataSummary data={summary.currentData} />
      </div>
      <ChartsSummary.Mobile summary={summary} />
    </>
  )
}

ChartsSummary.Mobile = function MobileSummary({
  summary
}: {
  summary: IChartSummaryInfo
}) {
  const { currentDescription: description, currentData: data } = summary

  return (
    <div className='MOBILE_SUMMARY order-first lg:order-last flex lg:hidden items-center justify-between p-layout'>
      <Sheet>
        <SheetTrigger asChild className='MOBILE_SUMMARY_TRIGGER lg:hidden'>
          <SheetHeader className='full flex flex-row items-center justify-between'>
            <span>{description.title}</span>
            <Button variant='outline'>
              <ChevronDown />
            </Button>
          </SheetHeader>
        </SheetTrigger>
        <SheetContent
          side='bottom'
          className='MOBILE_TOOLS flex-col-tl p-lg gap-md'
        >
          <SheetTitle>{description.title}</SheetTitle>
          <SheetDescription>{description.description}</SheetDescription>
          <ul className='LIST list-style-disc hidden lg:block'>
            <li className='text-lg italic font-bold'>Key Features</li>
            {description?.key_features.map((feature: string) => {
              return <li key={feature}>{feature}</li>
            })}
          </ul>
          <ChartDataSummary data={data} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

ChartsSummary.Skeleton = function SkeletonSummary() {
  return (
    <div className='SKELETON_SUMMARY lg:hidden flex-col-tl full divide-y-[.5px] divide-neutral-800 divide-dashed'>
      <div className='SKELETON_TEXT flex-col-tl p-lg gap-md full'>
        <Skeleton className='h-[5ch] w-full' />
        <Skeleton className='w-full h-full' />
      </div>
      <div className='SUMMARY_SKELETON flex-c p-lg gap-md h-1/4 full'>
        <Skeleton className='aspect-square w-full' />
        <Skeleton className='aspect-square w-full' />
        <Skeleton className='aspect-square w-full' />
      </div>
    </div>
  )
}
