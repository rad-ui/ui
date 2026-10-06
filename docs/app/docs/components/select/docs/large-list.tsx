"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import Select from "@radui/ui/Select"

const OPTIONS = Array.from({ length: 1000 }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `Item ${index + 1}`
}))

const PAGE_SIZE = 40

const LargeListSelectExample = () => {
    const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE)
    const [value, setValue] = React.useState("")

    const selectedLabel = OPTIONS.find((option) => option.value === value)?.label
    const visibleOptions = OPTIONS.slice(0, visibleCount)
    const canShowMore = visibleCount < OPTIONS.length

    const showMore = React.useCallback(() => {
        setVisibleCount((current) => Math.min(current + PAGE_SIZE, OPTIONS.length))
    }, [])

    const showMoreBeforeNavigation = React.useCallback(() => {
        flushSync(() => {
            setVisibleCount((current) => Math.min(current + PAGE_SIZE, OPTIONS.length))
        })
    }, [])

    return (
        <Select.Root value={value} onValueChange={setValue}>
            <Select.Trigger>
                <span>{selectedLabel || "Select an item..."}</span>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    style={{ "--rad-select-content-height": "256px" } as React.CSSProperties}
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
                    <Select.Group>
                        {visibleOptions.map((option) => (
                            <Select.Item
                                key={option.value}
                                value={option.value}
                                label={option.label}
                            >
                                <Select.Indicator />
                                {option.label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default LargeListSelectExample
