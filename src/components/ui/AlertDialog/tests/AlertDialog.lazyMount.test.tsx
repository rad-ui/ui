import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertDialog from '../AlertDialog';

describe('AlertDialog lazy mount', () => {
    test('does not mount dialog content until opened', () => {
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Content data-testid="alert-content">
                    <AlertDialog.Title>Title</AlertDialog.Title>
                    <AlertDialog.Description>Description</AlertDialog.Description>
                </AlertDialog.Content>
            </AlertDialog.Root>
        );

        expect(screen.queryByTestId('alert-content')).not.toBeInTheDocument();
    });

    test('mounts content when open', () => {
        render(
            <AlertDialog.Root open>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Title</AlertDialog.Title>
                    <AlertDialog.Description>Description</AlertDialog.Description>
                </AlertDialog.Content>
            </AlertDialog.Root>
        );

        expect(screen.getByText('Description')).toBeInTheDocument();
    });
});
