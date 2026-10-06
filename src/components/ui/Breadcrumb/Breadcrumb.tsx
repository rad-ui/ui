'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Breadcrumb';

type RootElement = HTMLElement;
type ListElement = HTMLOListElement;
type ItemElement = HTMLLIElement;
type LinkElement = HTMLAnchorElement;
type PageElement = HTMLSpanElement;
type SeparatorElement = HTMLSpanElement;

export type BreadcrumbRootProps = React.ComponentPropsWithoutRef<'nav'> & {
    customRootClass?: string;
};

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<'ol'> & {
    customRootClass?: string;
};

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'> & {
    customRootClass?: string;
};

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<'a'> & {
    customRootClass?: string;
    asChild?: boolean;
};

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<'span'> & {
    customRootClass?: string;
};

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<'span'> & {
    customRootClass?: string;
};

const BreadcrumbRoot = React.forwardRef<RootElement, BreadcrumbRootProps>(
    ({ children, customRootClass = '', className = '', 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');

        return (
            <nav ref={ref} aria-label={ariaLabel} className={clsx(rootClass, className)} {...props}>
                {children}
            </nav>
        );
    }
);

const BreadcrumbList = React.forwardRef<ListElement, BreadcrumbListProps>(
    ({ children, customRootClass = '', className = '', ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'list');

        return (
            <ol ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </ol>
        );
    }
);

const BreadcrumbItem = React.forwardRef<ItemElement, BreadcrumbItemProps>(
    ({ children, customRootClass = '', className = '', ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'item');

        return (
            <li ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </li>
        );
    }
);

const BreadcrumbLink = React.forwardRef<LinkElement, BreadcrumbLinkProps>(
    ({ children, customRootClass = '', className = '', asChild = false, ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'link');
        const Anchor = Primitive.a as any;

        return (
            <Anchor ref={ref} asChild={asChild} className={clsx(rootClass, className)} {...props}>
                {children}
            </Anchor>
        );
    }
);

const BreadcrumbPage = React.forwardRef<PageElement, BreadcrumbPageProps>(
    ({ children, customRootClass = '', className = '', 'aria-current': ariaCurrent = 'page', ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'page');

        return (
            <span ref={ref} aria-current={ariaCurrent} className={clsx(rootClass, className)} {...props}>
                {children}
            </span>
        );
    }
);

const BreadcrumbSeparator = React.forwardRef<SeparatorElement, BreadcrumbSeparatorProps>(
    ({ children = '/', customRootClass = '', className = '', ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'separator');

        return (
            <span ref={ref} aria-hidden="true" className={clsx(rootClass, className)} {...props}>
                {children}
            </span>
        );
    }
);

BreadcrumbRoot.displayName = 'Breadcrumb.Root';
BreadcrumbList.displayName = 'Breadcrumb.List';
BreadcrumbItem.displayName = 'Breadcrumb.Item';
BreadcrumbLink.displayName = 'Breadcrumb.Link';
BreadcrumbPage.displayName = 'Breadcrumb.Page';
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator';

const Breadcrumb = {
    Root: BreadcrumbRoot,
    List: BreadcrumbList,
    Item: BreadcrumbItem,
    Link: BreadcrumbLink,
    Page: BreadcrumbPage,
    Separator: BreadcrumbSeparator
};

export {
    BreadcrumbRoot as Root,
    BreadcrumbList as List,
    BreadcrumbItem as Item,
    BreadcrumbLink as Link,
    BreadcrumbPage as Page,
    BreadcrumbSeparator as Separator
};

export default Breadcrumb;
export type {
    RootElement as BreadcrumbRootElement,
    ListElement as BreadcrumbListElement,
    ItemElement as BreadcrumbItemElement,
    LinkElement as BreadcrumbLinkElement,
    PageElement as BreadcrumbPageElement,
    SeparatorElement as BreadcrumbSeparatorElement
};
