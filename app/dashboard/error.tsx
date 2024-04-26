'use client';

import { useEffect } from "react"

import { Button } from "@/shadcn/ui/button";


export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="full col-span-2 flex-col-c gap-md">
      <h2 className="text-xl font-bold">No chart data loaded!</h2>
      <p>Please reload the page to try again.</p>
      <Button
        onClick={
          () => reset()
        }
      >
        Reload ↻
      </Button>
    </div>
  )
}
