"use client"

import { useState } from "react"
import Autocomplete from "@radui/ui/Autocomplete"

const CITIES = ["Amsterdam", "Athens", "Bangalore", "Barcelona", "Berlin", "Hyderabad", "Lisbon", "London", "Mumbai", "Paris"]

export default function AutocompleteExample() {
    const [city, setCity] = useState("")

    return (
        <Autocomplete.Root value={city} onValueChange={setCity}>
            <Autocomplete.Input aria-label="City" placeholder="Search cities" />
            <Autocomplete.Portal>
                <Autocomplete.Content>
                    {CITIES.map((name) => (
                        <Autocomplete.Item key={name} value={name}>{name}</Autocomplete.Item>
                    ))}
                </Autocomplete.Content>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    )
}
