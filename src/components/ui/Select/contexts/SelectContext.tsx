interface SelectContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedValue: string
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
    handleSelect: (value: string) => void
}