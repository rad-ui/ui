'use client';

import React from 'react';

export type DrawerDynamicValue<TState, TValue> =
    | TValue
    | ((state: TState) => TValue | undefined);

export type DrawerRenderProp<TProps, TState> =
    | React.ReactElement
    | ((props: TProps, state: TState) => React.ReactElement);

export function resolveDrawerDynamicValue<TState, TValue>(
    value: DrawerDynamicValue<TState, TValue> | undefined,
    state: TState
) {
    if (typeof value === 'function') {
        return (value as (state: TState) => TValue | undefined)(state);
    }

    return value;
}

export function getDrawerRenderChild<TProps extends { children?: React.ReactNode }, TState>(
    render: DrawerRenderProp<TProps, TState> | undefined,
    props: TProps,
    state: TState
) {
    if (!render) {
        return {
            asChild: false,
            children: props.children
        };
    }

    return {
        asChild: true,
        children: typeof render === 'function'
            ? render(props, state)
            : render
    };
}
