'use client';

import React from 'react';
import CommandRoot from './fragments/CommandRoot';
import CommandDialog from './fragments/CommandDialog';
import CommandInput from './fragments/CommandInput';
import CommandList from './fragments/CommandList';
import CommandItem from './fragments/CommandItem';
import CommandGroup from './fragments/CommandGroup';
import CommandEmpty from './fragments/CommandEmpty';
import CommandLoading from './fragments/CommandLoading';
import CommandSeparator from './fragments/CommandSeparator';
import CommandShortcut from './fragments/CommandShortcut';

type CommandComponent = typeof CommandRoot & {
    Root: typeof CommandRoot;
    Dialog: typeof CommandDialog;
    Input: typeof CommandInput;
    List: typeof CommandList;
    Item: typeof CommandItem;
    Group: typeof CommandGroup;
    Empty: typeof CommandEmpty;
    Loading: typeof CommandLoading;
    Separator: typeof CommandSeparator;
    Shortcut: typeof CommandShortcut;
};

const Command = CommandRoot as CommandComponent;

Command.Root = CommandRoot;
Command.Dialog = CommandDialog;
Command.Input = CommandInput;
Command.List = CommandList;
Command.Item = CommandItem;
Command.Group = CommandGroup;
Command.Empty = CommandEmpty;
Command.Loading = CommandLoading;
Command.Separator = CommandSeparator;
Command.Shortcut = CommandShortcut;

export type { CommandFilter } from './context/CommandContext';
export type { CommandRootProps } from './fragments/CommandRoot';
export type { CommandDialogProps } from './fragments/CommandDialog';
export type { CommandInputProps } from './fragments/CommandInput';
export type { CommandListProps } from './fragments/CommandList';
export type { CommandItemProps } from './fragments/CommandItem';
export type { CommandGroupProps } from './fragments/CommandGroup';
export type { CommandEmptyProps } from './fragments/CommandEmpty';
export type { CommandLoadingProps } from './fragments/CommandLoading';
export type { CommandSeparatorProps } from './fragments/CommandSeparator';
export type { CommandShortcutProps } from './fragments/CommandShortcut';

export default Command;
