'use client'

import { Home, Inbox, Settings } from "lucide-react"
import Command from "@radui/ui/Command"
import PlaygroundSection from "../helpers/PlaygroundSection"

const Row = ({ icon, label }) => (
    <span className="rad-ui-command-item-main">
        {icon}
        <span className="rad-ui-command-item-copy">
            <span className="rad-ui-command-item-label">{label}</span>
        </span>
    </span>
)

const CommandPlayground = () => (
    <div>
        <PlaygroundSection
            title="Command"
            docsLink="/docs/components/command"
            description="Inline command palette with search, grouped results, and an empty state."
        >
            <div className="max-w-md">
                <Command style={{ width: "100%" }}>
                    <Command.Input placeholder="Type a command..." />
                    <Command.List>
                        <Command.Empty>No results found.</Command.Empty>
                        <Command.Group heading="Navigation">
                            <Command.Item value="home"><Row icon={<Home />} label="Home" /></Command.Item>
                            <Command.Item value="inbox"><Row icon={<Inbox />} label="Inbox" /></Command.Item>
                            <Command.Item value="settings"><Row icon={<Settings />} label="Settings" /></Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </PlaygroundSection>
    </div>
)

export default CommandPlayground
