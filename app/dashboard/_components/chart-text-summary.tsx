import { IDataDescription } from "@/data/descriptions"

export function ChartTextSummary({ description }: { description: IDataDescription }) {
  return (
    <div className='CURRENT_DATA flex-col-tl gap-md p-layout h-full w-full'>
      <div className='HEADING text-2xl font-bold'>{description?.title}</div>
      <p className='DESCRIPTION'>{description?.description}</p>
      <ul className='LIST list-style-disc hidden lg:block'>
        <li className='text-lg italic font-bold'>Key Features</li>
        {description?.key_features.map((feature: string) => {
          return <li key={feature}>{feature}</li>
        })}
      </ul>
    </div>
  )
}
