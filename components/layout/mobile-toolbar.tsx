import { ReactNode } from 'react'
import { Settings2 } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/shadcn/ui/sheet'
import { Button } from '@/shadcn/ui/button'


export function MobileToolbar({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild className='MOBILE_TOOLS_TRIGGER block lg:hidden'>
        <Button variant='outline'>
          <Settings2 />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='top'
        className='MOBILE_TOOLS flex-col-tl p-lg gap-md'
      >
        <SheetTitle>Chart Parameters</SheetTitle>
        <SheetDescription>
          Change the chart parameters using the dropdowns below.
        </SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  )
}
