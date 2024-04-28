import { cn } from "@/shadcn/utils"

import { CHART_COLORS } from "@/data/colors"

import { getMeanFromBeaData } from "@/lib/get-mean-from-bea"


export function ChartDataSummary({ data }: { data: IBeaApiResponse[] }) {
  return (
    <div className='OVERALL_DATA flex-col-c gap-md  h-full p-layout lg:h-1/4 w-full'>
      <div className='INNER_WRAP p-layout full flex-col-c gap-sm bg-zinc-900 lg:bg-transparent'>
        <p className='flex-col-c uppercase text-balance text-[12px] text-center'>
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
    </div>
  )
}

