import { ReactNode } from 'react'


const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='DASHBOARD full grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[.6fr_.4fr] lg:grid-rows-1 divide-x-[.5px] divide-neutral-800 divide-dashed'>
      {children}
    </div>
  )
}

export default DashboardLayout
