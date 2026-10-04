'use client'

import { ChevronRight, Menu } from "lucide-react"
import DropdownMenu from "@radui/ui/DropdownMenu"
import PlaygroundSection from "../helpers/PlaygroundSection"

const DropdownMenuPlayground = () => (
    <div>
        <PlaygroundSection
            title="DropdownMenu"
            docsLink="/docs/components/dropdown-menu"
            description="Button-triggered menu with separators and nested submenus."
        >
            <DropdownMenu.Root>
                <DropdownMenu.Trigger aria-label="Open menu"><Menu size={18} /></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                    <DropdownMenu.Item label="Settings">Settings</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>More <ChevronRight size={14} /></DropdownMenu.SubTrigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item label="Help">Help</DropdownMenu.Item>
                            <DropdownMenu.Item label="Feedback">Feedback</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </PlaygroundSection>
    </div>
)

export default DropdownMenuPlayground
