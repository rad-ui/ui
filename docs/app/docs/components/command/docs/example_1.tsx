import React from 'react';
import Command from '@radui/ui/Command';
import {
    Bell,
    Calendar,
    CreditCard,
    FolderOpen,
    HelpCircle,
    Home,
    Inbox,
    Plus,
    Search,
    Settings,
    Sparkles
} from 'lucide-react';

const Row = ({ icon, label, description }: { icon: React.ReactNode; label: string; description?: string }) => (
    <span className="rad-ui-command-item-main">
        {icon}
        <span className="rad-ui-command-item-copy">
            <span className="rad-ui-command-item-label">{label}</span>
            {description ? <span className="rad-ui-command-item-description">{description}</span> : null}
        </span>
    </span>
);

const CommandExample = () => {
    return (
        <Command style={{ width: 416 }}>
            <Command.Input placeholder="Type a command or search..." />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group heading="Navigation">
                    <Command.Item value="home">
                        <Row icon={<Home />} label="Home" description="Overview and recent activity" />
                        <Command.Shortcut>⌘H</Command.Shortcut>
                    </Command.Item>
                    <Command.Item value="inbox">
                        <Row icon={<Inbox />} label="Inbox" description="Messages, approvals, and mentions" />
                        <Command.Shortcut>⌘I</Command.Shortcut>
                    </Command.Item>
                    <Command.Item value="billing">
                        <Row icon={<CreditCard />} label="Billing" description="Invoices, usage, and payment methods" />
                        <Command.Shortcut>⌘B</Command.Shortcut>
                    </Command.Item>
                    <Command.Item value="settings">
                        <Row icon={<Settings />} label="Settings" description="Workspace and account preferences" />
                        <Command.Shortcut>⌘,</Command.Shortcut>
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Create">
                    <Command.Item value="new-file">
                        <Row icon={<Plus />} label="New File" description="Create a file in the current workspace" />
                        <Command.Shortcut>⌘N</Command.Shortcut>
                    </Command.Item>
                    <Command.Item value="open-project">
                        <Row icon={<FolderOpen />} label="Open Project" description="Switch to another folder or repo" />
                        <Command.Shortcut>⌘O</Command.Shortcut>
                    </Command.Item>
                    <Command.Item value="search-everywhere">
                        <Row icon={<Search />} label="Search Everywhere" description="Find files, symbols, and commands" />
                        <Command.Shortcut>⌘P</Command.Shortcut>
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Workspace">
                    <Command.Item value="notifications">
                        <Row icon={<Bell />} label="Notifications" description="Alerts, updates, and release notes" />
                    </Command.Item>
                    <Command.Item value="calendar">
                        <Row icon={<Calendar />} label="Calendar" description="Upcoming events and scheduled work" />
                    </Command.Item>
                    <Command.Item value="ai-actions">
                        <Row icon={<Sparkles />} label="AI Actions" description="Generate, summarize, and transform content" />
                    </Command.Item>
                    <Command.Item value="support">
                        <Row icon={<HelpCircle />} label="Help & Support" description="Docs, onboarding, and contact options" />
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command>
    );
};

export default CommandExample;
