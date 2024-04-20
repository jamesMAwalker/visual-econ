'use client'

import { Button } from '@/shadcn/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Toolbar = () => {
  const path = usePathname()
  
  return (
    <div className='TOOLBAR md:justify-between md:flex-row border-neutral-800 z-50 flex flex-col items-start justify-start w-full gap-8 p-8 border-b'>
      <Link href='/'>
        <h1 className='LOGO text-2xl font-bold'>Visual Economy</h1>
      </Link>
      {path === '/dashboard' && (
        <div className='TOOLS sm:flex-row md:w-auto flex flex-col items-center justify-center w-full gap-4'>
          <Button variant='outline'>Submit</Button>
        </div>
      )}
    </div>
  )
}
