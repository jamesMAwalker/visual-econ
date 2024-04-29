'use client'

import { useEffect } from 'react'

import { Button } from '@/shadcn/ui/button'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='full row-span-2 col-span-2 flex-col-c gap-md'>
      <h2 className='text-xl font-bold'>Something went wrong!</h2>
      <p>Please reload the page to try again.</p>
      <Button onClick={() => reset()}>Reload ↻</Button>
    </div>
  )
}
