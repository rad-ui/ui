import React from 'react';
import Command from '../Command';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import {
    Bell,
    Calculator,
    Calendar,
    CreditCard,
    FileCode2,
    FilePlus2,
    FolderOpen,
    HelpCircle,
    Home,
    Image,
    Inbox,
    Laptop2,
    Plus,
    Search,
    Settings,
    Shield,
    Sparkles,
    TerminalSquare,
    UserRound,
    Wallet
} from 'lucide-react';

export default {
    title: 'Components/Command',
    component: Command
} as any;

const Row = ({ icon, label, description }: { icon: React.ReactNode; label: string; description?: string }) => (
    <span className="rad-ui-command-item-main">
        {icon}
        <span className="rad-ui-command-item-copy">
            <span className="rad-ui-command-item-label">{label}</span>
            {description ? <span className="rad-ui-command-item-description">{description}</span> : null}
        </span>
    </span>
);

export const Default = () => {
    return (
        <SandboxEditor>
            <Command style={{ width: 416 }}>
                <Command.Input placeholder="Type a command or search..." />
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Group heading="Navigation">
                        <Command.Item value="home" keywords={['dashboard', 'overview']}>
                            <Row icon={<Home />} label="Home" description="Overview, activity, and recents" />
                            <Command.Shortcut>⌘H</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="inbox" keywords={['messages', 'updates']}>
                            <Row icon={<Inbox />} label="Inbox" description="Messages, mentions, and approvals" />
                            <Command.Shortcut>⌘I</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="billing" keywords={['invoice', 'payments']}>
                            <Row icon={<Wallet />} label="Billing" description="Invoices, usage, and payment methods" />
                            <Command.Shortcut>⌘B</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="settings" keywords={['preferences', 'config']}>
                            <Row icon={<Settings />} label="Settings" description="Workspace, account, and app preferences" />
                            <Command.Shortcut>⌘,</Command.Shortcut>
                        </Command.Item>
                    </Command.Group>
                    <Command.Separator />
                    <Command.Group heading="Create">
                        <Command.Item value="new-file">
                            <Row icon={<FilePlus2 />} label="New File" description="Create a new document or workspace file" />
                            <Command.Shortcut>⌘N</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="new-folder" keywords={['directory']}>
                            <Row icon={<Plus />} label="New Folder" description="Create a top-level folder" />
                            <Command.Shortcut>⇧⌘N</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="open-project" keywords={['workspace', 'repo']}>
                            <Row icon={<FolderOpen />} label="Open Project" description="Jump into a local folder or repo" />
                            <Command.Shortcut>⌘O</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="search-project" keywords={['find', 'grep', 'lookup']}>
                            <Row icon={<Search />} label="Search Project" description="Search files, symbols, and content" />
                            <Command.Shortcut>⌘P</Command.Shortcut>
                        </Command.Item>
                    </Command.Group>
                    <Command.Separator />
                    <Command.Group heading="Tools">
                        <Command.Item value="calculator">
                            <Row icon={<Calculator />} label="Calculator" description="Evaluate numbers and quick formulas" />
                        </Command.Item>
                        <Command.Item value="calendar">
                            <Row icon={<Calendar />} label="Calendar" description="Upcoming events and due dates" />
                        </Command.Item>
                        <Command.Item value="image-editor">
                            <Row icon={<Image />} label="Image Editor" description="Crop, annotate, and export images" />
                        </Command.Item>
                        <Command.Item value="code-editor">
                            <Row icon={<FileCode2 />} label="Code Editor" description="Open the embedded code surface" />
                        </Command.Item>
                    </Command.Group>
                    <Command.Separator />
                    <Command.Group heading="Workspace">
                        <Command.Item value="notifications">
                            <Row icon={<Bell />} label="Notifications" description="Alerts, release notes, and mentions" />
                            <Command.Shortcut>⌘J</Command.Shortcut>
                        </Command.Item>
                        <Command.Item value="team-members">
                            <Row icon={<UserRound />} label="Team Members" description="Seats, roles, and invitations" />
                        </Command.Item>
                        <Command.Item value="security">
                            <Row icon={<Shield />} label="Security" description="Sessions, tokens, and audit logs" />
                        </Command.Item>
                        <Command.Item value="help">
                            <Row icon={<HelpCircle />} label="Help & Support" description="Docs, shortcuts, and contact options" />
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        </SandboxEditor>
    );
};

export const InDialog = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <SandboxEditor>
            <>
                <Button onClick={() => setOpen(true)}>Open Command</Button>
                <Command.Dialog open={open} onOpenChange={setOpen} style={{ width: 476 }}>
                    <Command.Input placeholder="Type a command or search..." />
                    <Command.List>
                        <Command.Empty>No results found.</Command.Empty>
                        <Command.Group heading="Navigation">
                            <Command.Item value="home" onSelect={() => setOpen(false)}>
                                <Row icon={<Home />} label="Home" />
                                <Command.Shortcut>⌘H</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="inbox" onSelect={() => setOpen(false)}>
                                <Row icon={<Inbox />} label="Inbox" />
                                <Command.Shortcut>⌘I</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="documents" onSelect={() => setOpen(false)}>
                                <Row icon={<FileCode2 />} label="Documents" />
                                <Command.Shortcut>⌘D</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="folders" onSelect={() => setOpen(false)}>
                                <Row icon={<FolderOpen />} label="Folders" />
                                <Command.Shortcut>⌘F</Command.Shortcut>
                            </Command.Item>
                        </Command.Group>
                        <Command.Separator />
                        <Command.Group heading="Actions">
                            <Command.Item value="new-file" onSelect={() => setOpen(false)}>
                                <Row icon={<Plus />} label="New File" />
                                <Command.Shortcut>⌘N</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="new-folder" onSelect={() => setOpen(false)}>
                                <Row icon={<FilePlus2 />} label="New Folder" />
                                <Command.Shortcut>⇧⌘N</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="search-everywhere" onSelect={() => setOpen(false)}>
                                <Row icon={<Search />} label="Search Everywhere" />
                                <Command.Shortcut>⌘P</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="run-task" onSelect={() => setOpen(false)}>
                                <Row icon={<TerminalSquare />} label="Run Task" />
                                <Command.Shortcut>⌘R</Command.Shortcut>
                            </Command.Item>
                        </Command.Group>
                        <Command.Separator />
                        <Command.Group heading="Workspace">
                            <Command.Item value="billing" onSelect={() => setOpen(false)}>
                                <Row icon={<CreditCard />} label="Billing" />
                                <Command.Shortcut>⌘B</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="settings" onSelect={() => setOpen(false)}>
                                <Row icon={<Settings />} label="Settings" />
                                <Command.Shortcut>⌘S</Command.Shortcut>
                            </Command.Item>
                            <Command.Item value="notifications" onSelect={() => setOpen(false)}>
                                <Row icon={<Bell />} label="Notifications" />
                            </Command.Item>
                            <Command.Item value="support" onSelect={() => setOpen(false)}>
                                <Row icon={<HelpCircle />} label="Help & Support" />
                            </Command.Item>
                        </Command.Group>
                        <Command.Separator />
                        <Command.Group heading="Tools">
                            <Command.Item value="calculator" onSelect={() => setOpen(false)}>
                                <Row icon={<Calculator />} label="Calculator" />
                            </Command.Item>
                            <Command.Item value="calendar" onSelect={() => setOpen(false)}>
                                <Row icon={<Calendar />} label="Calendar" />
                            </Command.Item>
                            <Command.Item value="image-editor" onSelect={() => setOpen(false)}>
                                <Row icon={<Image />} label="Image Editor" />
                            </Command.Item>
                            <Command.Item value="developer-mode" onSelect={() => setOpen(false)}>
                                <Row icon={<Laptop2 />} label="Developer Mode" />
                            </Command.Item>
                        </Command.Group>
                        <Command.Separator />
                        <Command.Group heading="Recently Used">
                            <Command.Item value="ai-actions" onSelect={() => setOpen(false)}>
                                <Row icon={<Sparkles />} label="AI Actions" />
                            </Command.Item>
                            <Command.Item value="workspace-security" onSelect={() => setOpen(false)}>
                                <Row icon={<Shield />} label="Security Center" />
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command.Dialog>
            </>
        </SandboxEditor>
    );
};
