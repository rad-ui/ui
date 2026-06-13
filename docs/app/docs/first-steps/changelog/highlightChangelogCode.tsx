import React, { type ReactNode } from "react";
import { refractor } from "refractor";
import bash from "refractor/lang/bash";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";

let registered = false;

function ensureLanguagesRegistered() {
    if (registered) return;
    refractor.register(js);
    refractor.register(jsx);
    refractor.register(ts);
    refractor.register(tsx);
    refractor.register(bash);
    registered = true;
}

type HastElement = {
    type: "element";
    tagName: string;
    properties: { className?: string[] };
    children: HastChild[];
};

type HastText = { type: "text"; value: string };

type HastChild = HastElement | HastText;

function renderHastNode(element: HastChild, index: number): ReactNode {
    if (element.type === "element") {
        const { tagName, properties, children } = element;
        const className = (properties.className ?? []).join(" ");
        return React.createElement(
            tagName,
            { className, key: index },
            children.map((child, childIndex) => renderHastNode(child, childIndex)),
        );
    }
    if (element.type === "text") {
        return element.value;
    }
    return null;
}

/**
 * Syntax-highlight markdown fenced code using the same Refractor + token CSS as docs CodeBlock.
 */
export function highlightChangelogCode(
    source: string,
    language: string,
): ReactNode {
    ensureLanguagesRegistered();
    const trimmed = source.replace(/\n$/, "");
    try {
        const tree = refractor.highlight(trimmed, language);
        return tree.children.map((child, i) =>
            renderHastNode(child as HastChild, i),
        );
    } catch {
        return trimmed;
    }
}
