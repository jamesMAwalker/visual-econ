'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/shadcn/utils'
import { Button } from '@/shadcn/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shadcn/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { useRouter } from 'next/navigation'
import { IGeoFipsItem } from '@/data'
import { IStatTableItem } from '@/data/tables'
import { useChartInputState } from '@/context/chart-params.context'

/*
  TODO: Next - Add real data
*/

const MAX_ITEMS = 3

export function Dropdown({ list }: { list: any }) {
  const { push } = useRouter()

  const [open, setOpen] = useState(false)
  const [maxItemsReached, setMaxItemsReached] = useState(false)
  const [selected, setSelected] = useState<any>([])

  const { setStateParams } = useChartInputState()
  
  function handleDropdownItemClick(item: any) {
    setSelected((previousSelection: any) => {
      let newSelection = previousSelection
      let maxItemsReached = previousSelection.length >= MAX_ITEMS
      const alreadySelected = previousSelection.includes(item)
      
      if (alreadySelected) {
        // remove item from selection
        newSelection = previousSelection.filter((i: any) => i.key !== item.key)
        maxItemsReached = false
      }
      if (!maxItemsReached && !alreadySelected) {
        // add to selection
        newSelection = [...previousSelection, item]
        maxItemsReached = newSelection.length >= MAX_ITEMS
      }

      setMaxItemsReached(maxItemsReached)
      setStateParams(newSelection)
      return newSelection
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {selected.length > 0 ? (
            <div className='SELECTED flex-tl divide-dashed divide-x-[.5px] divide-color-white w-full'>
              {selected.map((item: any) => {
                return (
                  <span key={item.code} className='px-2'>
                    {item.code}
                  </span>
                )
              })}
            </div>
          ) : (
            'Select a state...'
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='POPOVER_CONTENT w-[200px] max-h-[200px] overflow-y-scroll p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {list.map((item: any) => {
                const isSelected = selected?.find(
                  (i: any) => i.key === item.key
                )
                const disabled = !isSelected && maxItemsReached

                return (
                  <CommandItem
                    key={item.key}
                    value={item.name}
                    onSelect={() => handleDropdownItemClick(item)}
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
                    {item.name}
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
