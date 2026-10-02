"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import Combobox from "@radui/ui/Combobox"

const OPTIONS = Array.from({ length: 1000 }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `Item ${index + 1}`
}))

const PAGE_SIZE = 40

const LargeListComboboxExample = () => {
    const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE)
    const [value, setValue] = React.useState("")
    const [query, setQuery] = React.useState("")

    const selectedLabel = OPTIONS.find((option) => option.value === value)?.label
    const filteredOptions = React.useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        if (!normalizedQuery) {
            return OPTIONS
        }

        return OPTIONS.filter((option) => (
            option.label.toLowerCase().includes(normalizedQuery)
        ))
    }, [query])
    const visibleOptions = filteredOptions.slice(0, visibleCount)
    const canShowMore = visibleCount < filteredOptions.length

    React.useEffect(() => {
        setVisibleCount(PAGE_SIZE)
    }, [query])

    const showMore = React.useCallback(() => {
        setVisibleCount((current) => Math.min(current + PAGE_SIZE, filteredOptions.length))
    }, [filteredOptions.length])

    const showMoreBeforeNavigation = React.useCallback(() => {
        flushSync(() => {
            setVisibleCount((current) => Math.min(current + PAGE_SIZE, filteredOptions.length))
        })
    }, [filteredOptions.length])

    return (
        <Combobox.Root value={value} onValueChange={setValue}>
            <Combobox.Trigger>
                {selectedLabel || "Search items..."}
            </Combobox.Trigger>
            <Combobox.Portal>
                <Combobox.Content
                    style={{ maxHeight: 256, overflowY: "auto" }}
                    onScroll={(event) => {
                        const target = event.currentTarget
                        const remaining = target.scrollHeight - target.scrollTop - target.clientHeight

                        if (remaining < 48 && canShowMore) {
                            showMore()
                        }
                    }}
                    onKeyDownCapture={(event) => {
                        if (!canShowMore || event.key !== "ArrowDown") {
                            return
                        }

                        const activeValue = document.activeElement?.getAttribute("data-value")
                        const lastVisibleValue = visibleOptions[visibleOptions.length - 1]?.value

                        if (activeValue === lastVisibleValue) {
                            showMoreBeforeNavigation()
                        }
                    }}
                >
                    <Combobox.Search
                        placeholder="Filter items"
                        onInput={(event) => {
                            setQuery(event.currentTarget.value)
                        }}
                    />
                    <Combobox.Group>
                        {visibleOptions.map((option) => (
                            <Combobox.Item
                                key={option.value}
                                value={option.value}
                                label={option.label}
                            >
                                {option.label}
                            </Combobox.Item>
                        ))}
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Portal>
        </Combobox.Root>
    )
}

export default LargeListComboboxExample
