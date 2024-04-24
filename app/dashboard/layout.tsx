import { ReactNode } from 'react'

// TODO: Add layout

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='DASHBOARD full grid grid-cols-[.6fr_.4fr] grid-rows-1 divide-x-[.5px] divide-neutral-800 divide-dashed'>
      {children}
    </div>
  )
}

export default DashboardLayout
