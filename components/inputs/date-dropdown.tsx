'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/shadcn/utils'
import { Button } from '@/shadcn/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/shadcn/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { useChartInputState } from '@/context/chart-params.context'
import {
  IDateDropdownItem,
  QUICK_SELECT_DATES,
  RANGE_SELECT_DATES
} from '@/data/dates'

// * Constants
const MAX_ITEMS = 2

// TODO: Get initial value form url params.

export function DateDropdown() {
  const [open, setOpen] = useState(false)
  const [maxItemsReached, setMaxItemsReached] = useState(false)
  const [selected, setSelected] = useState<any[]>([])

  const { setDateParams, dateParams } = useChartInputState()

  useEffect(() => {
    setSelected(dateParams)
    console.log('dateParams changed: ', dateParams)
  }, [dateParams])

  function handleDropdownItemClick(item: IDateDropdownItem) {
    setSelected((previousSelection: any) => {
      const shouldClearSelection =
        previousSelection.some((prev: IDateDropdownItem) =>
          QUICK_SELECT_DATES.some((qsd) => qsd.value === prev.value)
        ) || QUICK_SELECT_DATES.some((qsd) => qsd.value === item.value)

      let newSelection: IDateDropdownItem[] = previousSelection
      let maxItemsReached = previousSelection.length >= MAX_ITEMS
      const alreadySelected = previousSelection.includes(item)

      if (alreadySelected) {
        // remove item from selection
        newSelection = previousSelection.filter(
          (i: any) => i.value !== item.value
        )
        maxItemsReached = false
      }
      if (!maxItemsReached && !alreadySelected) {
        // add to selection
        newSelection = [...previousSelection, item]
        maxItemsReached = newSelection.length >= MAX_ITEMS
      }
      if (shouldClearSelection) {
        newSelection = [item]
        maxItemsReached = false
      }

      setMaxItemsReached(maxItemsReached)

      const sortedSelection = newSelection.sort(
        (a, b) => Number(a.value) - Number(b.value)
      )
      setDateParams(sortedSelection)

      return sortedSelection
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between font-normal text-muted-foreground'
        >
          {selected.length > 0 ? (
            <div className='SELECTED flex-cl gap-[1px] text-primary !font-bold w-full'>
              <span className='px-2'>
                {selected[0].display}
              </span>
              {selected[1] && (
                <>
                  <span>-</span>
                  <span className='px-2'>
                    {selected[1].display}
                  </span>
                </>
              )}
            </div>
          ) : (
            'Select dates...'
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='POPOVER_CONTENT w-[200px] max-h-[200px] overflow-y-scroll p-0'>
        <Command>
          <CommandEmpty>Select dates...</CommandEmpty>
          <CommandList>
            <CommandGroup heading='Quick Search' className=''>
              {QUICK_SELECT_DATES.map((date: any) => {
                const isSelected = selected?.find(
                  (item: string) => item === date
                )

                return (
                  <CommandItem
                    value={date.value}
                    key={date.value}
                    onSelect={() => handleDropdownItemClick(date)}
                    className={cn(
                      'CMD_ITEM cursor-pointer py-1 hover:bg-neutral-800'
                    )}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {date.display}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Range Search'>
              {RANGE_SELECT_DATES.map((date: any) => {
                const isSelected = selected?.find(
                  (item: string) => item === date
                )
                const disabled = !isSelected && maxItemsReached

                return (
                  <CommandItem
                    key={date.value}
                    value={date}
                    onSelect={() => handleDropdownItemClick(date)}
                    className={cn(
                      'CMD_ITEM cursor-pointer py-1 hover:bg-neutral-800',
                      disabled && 'opacity-50 pointer-events-none'
                    )}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {date.display}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
