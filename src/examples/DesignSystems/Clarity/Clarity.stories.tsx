import React, { useEffect, useRef, useState } from 'react';

import Dialog from '~/components/ui/Dialog/Dialog';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import tokens from '~/design-systems/clarity/tokens';

const FONT_STACKS = tokens.fontFamily;
const COLOR_SHADE_ORDER = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000'] as const;
type ColorShade = typeof COLOR_SHADE_ORDER[number];
type StandaloneColor = { light: string; dark: string };

const PAGE_STYLE: React.CSSProperties = {
    padding: '8px 8px 24px',
    color: 'var(--rad-ui-text-primary)',
    fontFamily: 'var(--rad-ui-font-sans)'
};

const STACK_STYLE: React.CSSProperties = {
    display: 'grid',
    gap: '24px'
};

const PANEL_STYLE: React.CSSProperties = {
    border: '1px solid var(--rad-ui-border-soft)',
    borderRadius: 'var(--rad-ui-radius-xl)',
    background: 'color-mix(in oklab, var(--rad-ui-surface-panel) 88%, white)',
    boxShadow: 'var(--rad-ui-shadow-sm)',
    padding: '24px'
};

const SECTION_HEADER_STYLE: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '16px'
};

const TITLE_STYLE: React.CSSProperties = {
    margin: 0,
    fontSize: '1.75rem',
    lineHeight: 1.1,
    letterSpacing: '-0.02em'
};

const SUBTITLE_STYLE: React.CSSProperties = {
    margin: '8px 0 0',
    color: 'var(--rad-ui-text-muted)',
    maxWidth: '72ch'
};

const TOKEN_GRID_STYLE: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px'
};

const CARD_STYLE: React.CSSProperties = {
    border: '1px solid var(--rad-ui-border-soft)',
    borderRadius: 'var(--rad-ui-radius-lg)',
    background: 'var(--rad-ui-surface-canvas)',
    padding: '16px'
};

const LABEL_STYLE: React.CSSProperties = {
    margin: 0,
    color: 'var(--rad-ui-text-primary)',
    fontSize: '0.95rem',
    fontWeight: 600
};

const META_STYLE: React.CSSProperties = {
    margin: '6px 0 0',
    color: 'var(--rad-ui-text-muted)',
    fontSize: '0.85rem',
    lineHeight: 1.4
};

const codeStyle: React.CSSProperties = {
    fontFamily: 'var(--rad-ui-font-mono)',
    fontSize: '0.8rem'
};

const swatchButtonStyle: React.CSSProperties = {
    appearance: 'none',
    border: 0,
    padding: 0,
    margin: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    color: 'inherit'
};

const dialogSurfaceStyle: React.CSSProperties = {
    borderRadius: '20px',
    overflow: 'hidden',
    background: 'var(--rad-ui-surface-canvas)',
    boxShadow: 'var(--rad-ui-shadow-lg)',
    border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 55%, transparent)'
};

const detailGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 150px) 1fr',
    gap: '12px 20px'
};

const motionTrackStyle: React.CSSProperties = {
    position: 'relative',
    marginTop: '16px',
    height: '56px',
    borderRadius: '999px',
    overflow: 'hidden',
    border: '1px solid var(--rad-ui-border-soft)',
    background: 'linear-gradient(90deg, var(--rad-ui-surface-subtle), var(--rad-ui-surface-panel))'
};

const opacityPreviewBackground: React.CSSProperties = {
    height: '120px',
    borderRadius: 'var(--rad-ui-radius-lg)',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid var(--rad-ui-border-soft)',
    background: [
        'radial-gradient(circle at 22% 25%, color-mix(in oklab, var(--rad-ui-color-accent-400) 80%, white) 0, transparent 32%)',
        'radial-gradient(circle at 78% 30%, color-mix(in oklab, var(--rad-ui-color-accent-700) 75%, transparent) 0, transparent 28%)',
        'linear-gradient(135deg, var(--rad-ui-surface-canvas), var(--rad-ui-surface-muted))'
    ].join(', ')
};

const sectionTitleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '1.15rem',
    lineHeight: 1.2
};

const sectionDescriptionStyle: React.CSSProperties = {
    margin: '6px 0 16px',
    color: 'var(--rad-ui-text-muted)'
};

const toEntries = <T extends Record<string, string>>(value: T) => Object.entries(value);

const RUNTIME_SHADOWS = {
    none: 'var(--rad-ui-shadow-none)',
    xs: 'var(--rad-ui-shadow-xs)',
    sm: 'var(--rad-ui-shadow-sm)',
    md: 'var(--rad-ui-shadow-md)',
    lg: 'var(--rad-ui-shadow-lg)',
    xl: 'var(--rad-ui-shadow-xl)',
    full: 'var(--rad-ui-shadow-full)'
} as const;

const RUNTIME_ELEVATION = {
    xs: {
        shadow: 'var(--rad-ui-elevation-xs-shadow)',
        border: 'var(--rad-ui-elevation-xs-border)',
        background: 'var(--rad-ui-elevation-xs-background)'
    },
    sm: {
        shadow: 'var(--rad-ui-elevation-sm-shadow)',
        border: 'var(--rad-ui-elevation-sm-border)',
        background: 'var(--rad-ui-elevation-sm-background)'
    },
    md: {
        shadow: 'var(--rad-ui-elevation-md-shadow)',
        border: 'var(--rad-ui-elevation-md-border)',
        background: 'var(--rad-ui-elevation-md-background)'
    },
    lg: {
        shadow: 'var(--rad-ui-elevation-lg-shadow)',
        border: 'var(--rad-ui-elevation-lg-border)',
        background: 'var(--rad-ui-elevation-lg-background)'
    }
} as const;

const ClarityShowcase = () => {
    const colors = tokens.colors;
    const rampColors = Object.entries(colors).filter(([, colorValue]) => typeof colorValue.light === 'object');
    const standaloneColors = Object.entries(colors).filter(([, colorValue]) => typeof colorValue.light === 'string') as Array<[string, StandaloneColor]>;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [selectedSwatch, setSelectedSwatch] = useState<{ paletteName: string; shade: ColorShade } | null>(null);
    const [runtimeValue, setRuntimeValue] = useState('');

    useEffect(() => {
        if (!selectedSwatch || !rootRef.current) {
            return;
        }

        const colorToken = colors[selectedSwatch.paletteName as keyof typeof colors];
        const variableName = typeof colorToken.light === 'string'
            ? `--rad-ui-color-${selectedSwatch.paletteName}`
            : `--rad-ui-color-${selectedSwatch.paletteName}-${selectedSwatch.shade}`;
        const themedRoot = rootRef.current.closest('[data-rad-ui-theme]') ?? rootRef.current;
        const computedValue = window.getComputedStyle(themedRoot as Element).getPropertyValue(variableName).trim();
        setRuntimeValue(computedValue);
    }, [selectedSwatch]);

    const selectedValues = selectedSwatch ? colors[selectedSwatch.paletteName as keyof typeof colors] : null;
    const selectedVariableName = selectedSwatch
        ? (selectedValues && typeof selectedValues.light === 'string'
            ? `--rad-ui-color-${selectedSwatch.paletteName}`
            : `--rad-ui-color-${selectedSwatch.paletteName}-${selectedSwatch.shade}`)
        : '';

    return (
        <SandboxEditor className='bg-transparent'>
            <style>
                {`
                    @keyframes clarity-token-motion {
                        0% { left: 14px; }
                        50% { left: calc(100% - 42px); }
                        100% { left: 14px; }
                    }
                `}
            </style>
            <div ref={rootRef} style={PAGE_STYLE}>
                <div style={STACK_STYLE}>
                    <section style={PANEL_STYLE}>
                        <div style={SECTION_HEADER_STYLE}>
                            <div>
                                <h1 style={TITLE_STYLE}>Clarity</h1>
                                <p style={SUBTITLE_STYLE}>
                                    Primitive token source for the Clarity design system, shown as runtime-ready values and live visual samples.
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                            <div style={CARD_STYLE}>
                                <p style={LABEL_STYLE}>Current primitives</p>
                                <p style={META_STYLE}>`--rad-ui-font-sans`, `--rad-ui-radius-*`, `--rad-ui-shadow-*`, `--rad-ui-z-index-*`, `--rad-ui-focus-ring-*`, `--rad-ui-grid-*`</p>
                            </div>
                            <div style={CARD_STYLE}>
                                <p style={LABEL_STYLE}>Semantic layer still separate</p>
                                <p style={META_STYLE}>Surface, text, border, and ring tokens are still mapped in `src/design-systems/clarity/default.scss`.</p>
                            </div>
                            <div style={CARD_STYLE}>
                                <p style={LABEL_STYLE}>Accent demo</p>
                                <p style={META_STYLE}>This page uses the active `data-rad-ui-accent-color` selector for live accent preview.</p>
                            </div>
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Colors</h2>
                        <p style={sectionDescriptionStyle}>Each palette reacts to the active theme state from the header controls.</p>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '72px repeat(12, minmax(0, 1fr))',
                                gap: '0',
                                alignItems: 'center'
                            }}
                        >
                            <div />
                            {COLOR_SHADE_ORDER.map((shade: ColorShade) => (
                                <p key={`color-step-${shade}`} style={{ ...LABEL_STYLE, fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>
                                    {shade}
                                </p>
                            ))}

                            {rampColors.map(([paletteName]) => (
                                <React.Fragment key={paletteName}>
                                    <p
                                        style={{
                                            ...LABEL_STYLE,
                                            margin: 0,
                                            textTransform: 'capitalize',
                                            alignSelf: 'center',
                                            lineHeight: 1
                                        }}
                                    >
                                        {paletteName}
                                    </p>
                                    {COLOR_SHADE_ORDER.map((shade: ColorShade) => (
                                        <button
                                            key={`${paletteName}-${shade}`}
                                            type="button"
                                            style={swatchButtonStyle}
                                            onClick={() => setSelectedSwatch({ paletteName, shade })}
                                        >
                                            <div
                                                style={{
                                                    height: '60px',
                                                    borderRadius: 0,
                                                    border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 55%, transparent)',
                                                    background: `var(--rad-ui-color-${paletteName}-${shade})`
                                                }}
                                            />
                                        </button>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                        {standaloneColors.length > 0
                            ? (
                                <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
                                    <p style={{ ...LABEL_STYLE, margin: 0 }}>Standalone Colors</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: '8px', alignItems: 'center' }}>
                                        {standaloneColors.map(([colorName]) => (
                                            <React.Fragment key={colorName}>
                                                <p style={{ ...LABEL_STYLE, margin: 0, textTransform: 'capitalize' }}>{colorName}</p>
                                                <button
                                                    type="button"
                                                    style={swatchButtonStyle}
                                                    onClick={() => setSelectedSwatch({ paletteName: colorName, shade: '500' })}
                                                >
                                                    <div
                                                        style={{
                                                            height: '60px',
                                                            borderRadius: 0,
                                                            border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 55%, transparent)',
                                                            background: `var(--rad-ui-color-${colorName})`
                                                        }}
                                                    />
                                                </button>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )
                            : null}
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Spacing</h2>
                        <p style={sectionDescriptionStyle}>Spacing tokens are shown as measured bars so the ramp is easy to compare.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.spacing).map(([tokenName, tokenValue]) => (
                                <div key={tokenName} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>spacing.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div style={{ marginTop: '14px', height: '12px', borderRadius: '999px', background: 'var(--rad-ui-color-accent-700)', width: tokenValue }} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Radius</h2>
                        <p style={sectionDescriptionStyle}>Each sample uses its own token as the corner radius.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.radius).map(([tokenName, tokenValue]) => (
                                <div key={tokenName} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>radius.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '14px',
                                            height: '72px',
                                            borderRadius: tokenValue,
                                            background: 'linear-gradient(135deg, var(--rad-ui-color-accent-400), var(--rad-ui-color-accent-700))'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Typography</h2>
                        <p style={sectionDescriptionStyle}>Font families, sizes, weights, line heights, and letter spacing are rendered with the source values.</p>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div style={TOKEN_GRID_STYLE}>
                                {toEntries(FONT_STACKS).map(([tokenName, tokenValue]) => (
                                    <div key={tokenName} style={CARD_STYLE}>
                                        <p style={LABEL_STYLE}>fontFamily.{tokenName}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                        <p style={{ margin: '14px 0 0', fontFamily: tokenValue, fontSize: '1.125rem' }}>
                                            The quick brown fox jumps over the lazy dog.
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div style={TOKEN_GRID_STYLE}>
                                {toEntries(tokens.fontSize).map(([tokenName, tokenValue]) => (
                                    <div key={tokenName} style={CARD_STYLE}>
                                        <p style={LABEL_STYLE}>fontSize.{tokenName}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                        <p style={{ margin: '14px 0 0', fontSize: tokenValue, lineHeight: 1.2 }}>
                                            Clarity scale sample
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div style={TOKEN_GRID_STYLE}>
                                {toEntries(tokens.fontWeight).map(([tokenName, tokenValue]) => (
                                    <div key={tokenName} style={CARD_STYLE}>
                                        <p style={LABEL_STYLE}>fontWeight.{tokenName}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                        <p style={{ margin: '14px 0 0', fontWeight: Number(tokenValue) }}>
                                            Weighted text preview
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div style={TOKEN_GRID_STYLE}>
                                {toEntries(tokens.lineHeight).map(([tokenName, tokenValue]) => (
                                    <div key={tokenName} style={CARD_STYLE}>
                                        <p style={LABEL_STYLE}>lineHeight.{tokenName}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                        <p style={{ margin: '14px 0 0', lineHeight: Number(tokenValue), maxWidth: '28ch' }}>
                                            This sample shows how vertical rhythm shifts as line height changes across the primitive scale.
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div style={TOKEN_GRID_STYLE}>
                                {toEntries(tokens.letterSpacing).map(([tokenName, tokenValue]) => (
                                    <div key={tokenName} style={CARD_STYLE}>
                                        <p style={LABEL_STYLE}>letterSpacing.{tokenName}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                        <p style={{ margin: '14px 0 0', letterSpacing: tokenValue, textTransform: 'uppercase' }}>
                                            Clarity Display
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Shadows</h2>
                        <p style={sectionDescriptionStyle}>Shadow primitives are rendered on neutral cards to show elevation changes.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(RUNTIME_SHADOWS).map(([tokenName, tokenValue]) => (
                                <div key={tokenName} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>shadow.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            borderRadius: 'var(--rad-ui-radius-lg)',
                                            background: 'var(--rad-ui-surface-canvas)',
                                            boxShadow: tokenValue,
                                            padding: '20px'
                                        }}
                                    >
                                        Elevation sample
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Motion</h2>
                        <p style={sectionDescriptionStyle}>Duration and easing primitives are grouped separately so each demo isolates one variable.</p>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Duration</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.duration).map(([tokenName, tokenValue]) => (
                                        <div key={`duration-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>duration.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <div style={motionTrackStyle}>
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '14px',
                                                        width: '28px',
                                                        height: '28px',
                                                        borderRadius: '999px',
                                                        background: 'var(--rad-ui-color-accent-700)',
                                                        transform: 'translateY(-50%)',
                                                        animationName: 'clarity-token-motion',
                                                        animationDuration: tokenValue,
                                                        animationTimingFunction: 'var(--rad-ui-motion-easing-standard)',
                                                        animationIterationCount: 'infinite'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Easing</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.easing).map(([tokenName, tokenValue]) => (
                                        <div key={`easing-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>easing.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <div style={motionTrackStyle}>
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '14px',
                                                        width: '28px',
                                                        height: '28px',
                                                        borderRadius: '999px',
                                                        background: 'var(--rad-ui-color-accent-700)',
                                                        transform: 'translateY(-50%)',
                                                        animationName: 'clarity-token-motion',
                                                        animationDuration: '1.8s',
                                                        animationTimingFunction: tokenValue,
                                                        animationIterationCount: 'infinite'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Transition</h2>
                        <p style={sectionDescriptionStyle}>Transition presets bundle multiple animated properties into reusable interaction recipes.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.transition).map(([tokenName, tokenValue]) => (
                                <div key={`transition-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>transition.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            padding: '18px',
                                            borderRadius: 'var(--rad-ui-radius-lg)',
                                            border: '1px solid var(--rad-ui-border-soft)',
                                            background: 'var(--rad-ui-surface-panel)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minWidth: '132px',
                                                padding: '10px 14px',
                                                borderRadius: '999px',
                                                border: '1px solid color-mix(in oklab, var(--rad-ui-color-accent-700) 45%, var(--rad-ui-border-soft))',
                                                background: 'var(--rad-ui-color-accent-700)',
                                                color: 'white',
                                                boxShadow: 'var(--rad-ui-shadow-sm)',
                                                transform: 'translateY(-2px)',
                                                opacity: 0.96,
                                                transition: tokenValue
                                            }}
                                        >
                                            Hover preset
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Borders</h2>
                        <p style={sectionDescriptionStyle}>Border width tokens are demonstrated on the same card edge treatment.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.borderWidth).map(([tokenName, tokenValue]) => (
                                <div key={`border-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>borderWidth.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            borderRadius: 'var(--rad-ui-radius-lg)',
                                            background: 'var(--rad-ui-surface-canvas)',
                                            border: `${tokenValue} solid var(--rad-ui-color-accent-700)`,
                                            padding: '20px'
                                        }}
                                    >
                                        Border sample
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Opacity</h2>
                        <p style={sectionDescriptionStyle}>Each token overlays the same image-like surface so transparency differences are easy to compare.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.opacity).map(([tokenName, tokenValue]) => (
                                <div key={`opacity-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>opacity.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div style={{ ...opacityPreviewBackground, marginTop: '16px' }}>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'var(--rad-ui-color-accent-800)',
                                                opacity: Number(tokenValue)
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                insetInlineStart: '14px',
                                                insetBlockEnd: '12px',
                                                padding: '6px 10px',
                                                borderRadius: '999px',
                                                background: 'color-mix(in oklab, var(--rad-ui-surface-canvas) 82%, transparent)',
                                                border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 55%, transparent)',
                                                fontSize: '0.8rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            Overlay
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Z-Index</h2>
                        <p style={sectionDescriptionStyle}>Tokens are visualized as layered cards sharing the same footprint but different stacking order.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.zIndex).map(([tokenName, tokenValue]) => (
                                <div key={`z-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>zIndex.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            height: '120px',
                                            position: 'relative',
                                            borderRadius: 'var(--rad-ui-radius-lg)',
                                            border: '1px solid var(--rad-ui-border-soft)',
                                            background: 'linear-gradient(180deg, var(--rad-ui-surface-subtle), var(--rad-ui-surface-panel))',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                insetInlineStart: '16px',
                                                insetBlockStart: '18px',
                                                width: '72px',
                                                height: '72px',
                                                borderRadius: 'var(--rad-ui-radius-md)',
                                                background: 'color-mix(in oklab, var(--rad-ui-color-accent-300) 70%, var(--rad-ui-surface-canvas))',
                                                border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 60%, transparent)',
                                                zIndex: 1
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                insetInlineStart: '40px',
                                                insetBlockStart: '30px',
                                                width: '72px',
                                                height: '72px',
                                                borderRadius: 'var(--rad-ui-radius-md)',
                                                background: 'color-mix(in oklab, var(--rad-ui-color-accent-500) 72%, var(--rad-ui-surface-canvas))',
                                                border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 60%, transparent)',
                                                zIndex: Number(tokenValue)
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                insetInlineStart: '64px',
                                                insetBlockStart: '42px',
                                                width: '72px',
                                                height: '72px',
                                                borderRadius: 'var(--rad-ui-radius-md)',
                                                background: 'color-mix(in oklab, var(--rad-ui-color-accent-700) 76%, var(--rad-ui-surface-canvas))',
                                                border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 60%, transparent)',
                                                zIndex: 2
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Size</h2>
                        <p style={sectionDescriptionStyle}>Size tokens are useful for control heights, icons, avatars, and repeated component dimensions.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.size).map(([tokenName, tokenValue]) => (
                                <div key={`size-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>size.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            width: tokenValue,
                                            height: tokenValue,
                                            minWidth: '1rem',
                                            minHeight: '1rem',
                                            borderRadius: '999px',
                                            background: 'linear-gradient(135deg, var(--rad-ui-color-accent-400), var(--rad-ui-color-accent-700))'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Breakpoints</h2>
                        <p style={sectionDescriptionStyle}>Breakpoint tokens define responsive thresholds without hardcoding media widths inline.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.breakpoints).map(([tokenName, tokenValue]) => (
                                <div key={`breakpoint-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>breakpoint.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            height: '10px',
                                            width: '100%',
                                            borderRadius: '999px',
                                            background: 'var(--rad-ui-surface-muted)',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `min(100%, ${tokenValue})`,
                                                borderRadius: '999px',
                                                background: 'var(--rad-ui-color-accent-700)'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Grid</h2>
                        <p style={sectionDescriptionStyle}>Grid primitives capture column counts, gutters, and container widths as layout-level building blocks.</p>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Columns</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.grid.columns).map(([tokenName, tokenValue]) => (
                                        <div key={`grid-columns-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>grid.columns.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <div
                                                style={{
                                                    marginTop: '16px',
                                                    display: 'grid',
                                                    gridTemplateColumns: `repeat(${tokenValue}, minmax(0, 1fr))`,
                                                    gap: '6px'
                                                }}
                                            >
                                                {Array.from({ length: Number(tokenValue) }, (_, index) => (
                                                    <div
                                                        key={`grid-column-preview-${tokenName}-${index + 1}`}
                                                        style={{
                                                            height: '44px',
                                                            borderRadius: 'var(--rad-ui-radius-sm)',
                                                            background: 'color-mix(in oklab, var(--rad-ui-color-accent-500) 72%, var(--rad-ui-surface-canvas))'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Gutter</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.grid.gutter).map(([tokenName, tokenValue]) => (
                                        <div key={`grid-gutter-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>grid.gutter.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <div
                                                style={{
                                                    marginTop: '16px',
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                                                    gap: tokenValue
                                                }}
                                            >
                                                {Array.from({ length: 3 }, (_, index) => (
                                                    <div
                                                        key={`grid-gutter-preview-${tokenName}-${index + 1}`}
                                                        style={{
                                                            height: '52px',
                                                            borderRadius: 'var(--rad-ui-radius-sm)',
                                                            background: 'color-mix(in oklab, var(--rad-ui-color-accent-300) 72%, var(--rad-ui-surface-canvas))'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Container</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.grid.container).map(([tokenName, tokenValue]) => (
                                        <div key={`grid-container-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>grid.container.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <div
                                                style={{
                                                    marginTop: '16px',
                                                    borderRadius: 'var(--rad-ui-radius-lg)',
                                                    background: 'var(--rad-ui-surface-muted)',
                                                    padding: '10px'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `clamp(36%, calc((${tokenValue} / 80rem) * 100%), 100%)`,
                                                        marginInline: 'auto',
                                                        height: '44px',
                                                        borderRadius: 'var(--rad-ui-radius-md)',
                                                        background: 'linear-gradient(135deg, var(--rad-ui-color-accent-300), var(--rad-ui-color-accent-700))'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Blur</h2>
                        <p style={sectionDescriptionStyle}>Blur tokens are useful for frosted surfaces, backdrops, and depth effects.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.blur).map(([tokenName, tokenValue]) => (
                                <div key={`blur-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>blur.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div style={{ ...opacityPreviewBackground, marginTop: '16px' }}>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: '14px',
                                                borderRadius: 'var(--rad-ui-radius-md)',
                                                background: 'color-mix(in oklab, var(--rad-ui-surface-canvas) 62%, transparent)',
                                                backdropFilter: `blur(${tokenValue})`,
                                                border: '1px solid color-mix(in oklab, var(--rad-ui-border-soft) 55%, transparent)'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Outline Offset</h2>
                        <p style={sectionDescriptionStyle}>Outline offsets define how far a focus ring or outline should sit from the element edge.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.outlineOffset).map(([tokenName, tokenValue]) => (
                                <div key={`outline-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>outlineOffset.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <button
                                        type="button"
                                        style={{
                                            marginTop: '16px',
                                            padding: '12px 16px',
                                            borderRadius: 'var(--rad-ui-radius-md)',
                                            border: '1px solid var(--rad-ui-border-soft)',
                                            background: 'var(--rad-ui-surface-canvas)',
                                            color: 'var(--rad-ui-text-primary)',
                                            outline: '2px solid var(--rad-ui-color-accent-700)',
                                            outlineOffset: tokenValue,
                                            cursor: 'default'
                                        }}
                                    >
                                        Focus Sample
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Focus</h2>
                        <p style={sectionDescriptionStyle}>Focus primitives split ring width, ring offset, and ring style so states stay consistent across controls.</p>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Ring Width</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.focus.ringWidth).map(([tokenName, tokenValue]) => (
                                        <div key={`focus-width-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>focus.ringWidth.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <button
                                                type="button"
                                                style={{
                                                    marginTop: '16px',
                                                    padding: '12px 16px',
                                                    borderRadius: 'var(--rad-ui-radius-md)',
                                                    border: '1px solid var(--rad-ui-border-soft)',
                                                    background: 'var(--rad-ui-surface-canvas)',
                                                    color: 'var(--rad-ui-text-primary)',
                                                    outline: `${tokenValue} solid var(--rad-ui-color-accent-700)`,
                                                    outlineOffset: '2px',
                                                    cursor: 'default'
                                                }}
                                            >
                                                Ring width sample
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Ring Offset</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.focus.ringOffset).map(([tokenName, tokenValue]) => (
                                        <div key={`focus-offset-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>focus.ringOffset.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <button
                                                type="button"
                                                style={{
                                                    marginTop: '16px',
                                                    padding: '12px 16px',
                                                    borderRadius: 'var(--rad-ui-radius-md)',
                                                    border: '1px solid var(--rad-ui-border-soft)',
                                                    background: 'var(--rad-ui-surface-canvas)',
                                                    color: 'var(--rad-ui-text-primary)',
                                                    outline: '2px solid var(--rad-ui-color-accent-700)',
                                                    outlineOffset: tokenValue,
                                                    cursor: 'default'
                                                }}
                                            >
                                                Ring offset sample
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ ...LABEL_STYLE, marginBottom: '12px' }}>Ring Style</p>
                                <div style={TOKEN_GRID_STYLE}>
                                    {toEntries(tokens.focus.ringStyle).map(([tokenName, tokenValue]) => (
                                        <div key={`focus-style-${tokenName}`} style={CARD_STYLE}>
                                            <p style={LABEL_STYLE}>focus.ringStyle.{tokenName}</p>
                                            <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                            <button
                                                type="button"
                                                style={{
                                                    marginTop: '16px',
                                                    padding: '12px 16px',
                                                    borderRadius: 'var(--rad-ui-radius-md)',
                                                    border: '1px solid var(--rad-ui-border-soft)',
                                                    background: 'var(--rad-ui-surface-canvas)',
                                                    color: 'var(--rad-ui-text-primary)',
                                                    outline: `2px ${tokenValue} var(--rad-ui-color-accent-700)`,
                                                    outlineOffset: '2px',
                                                    cursor: 'default'
                                                }}
                                            >
                                                Ring style sample
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Stroke Width</h2>
                        <p style={sectionDescriptionStyle}>Stroke width tokens help maintain consistency in icons and line illustrations.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.strokeWidth).map(([tokenName, tokenValue]) => (
                                <div key={`stroke-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>strokeWidth.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <svg viewBox="0 0 80 48" width="100%" height="64" style={{ marginTop: '12px' }}>
                                        <path
                                            d="M10 34 L28 16 L42 28 L68 10"
                                            fill="none"
                                            stroke="var(--rad-ui-color-accent-700)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={tokenValue}
                                        />
                                        <circle
                                            cx="28"
                                            cy="16"
                                            r="5"
                                            fill="var(--rad-ui-surface-canvas)"
                                            stroke="var(--rad-ui-color-accent-700)"
                                            strokeWidth={tokenValue}
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Aspect Ratio</h2>
                        <p style={sectionDescriptionStyle}>Aspect ratio tokens are useful for media frames, cards, and repeatable layout primitives.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(tokens.aspectRatio).map(([tokenName, tokenValue]) => (
                                <div key={`ratio-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>aspectRatio.{tokenName}</p>
                                    <p style={{ ...META_STYLE, ...codeStyle }}>{tokenValue}</p>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            width: '100%',
                                            aspectRatio: tokenValue,
                                            borderRadius: 'var(--rad-ui-radius-lg)',
                                            border: '1px solid var(--rad-ui-border-soft)',
                                            background: 'linear-gradient(135deg, var(--rad-ui-color-accent-200), var(--rad-ui-color-accent-600))'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={PANEL_STYLE}>
                        <h2 style={sectionTitleStyle}>Elevation</h2>
                        <p style={sectionDescriptionStyle}>Elevation tokens expand on raw shadow primitives and are ready for fuller depth treatments.</p>
                        <div style={TOKEN_GRID_STYLE}>
                            {toEntries(RUNTIME_ELEVATION).map(([tokenName, tokenValue]) => (
                                <div key={`elevation-${tokenName}`} style={CARD_STYLE}>
                                    <p style={LABEL_STYLE}>elevation.{tokenName}</p>
                                    <div style={{ display: 'grid', gap: '4px', marginTop: '8px' }}>
                                        <p style={{ ...META_STYLE, ...codeStyle, margin: 0 }}>{tokenValue.shadow}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle, margin: 0 }}>{tokenValue.border}</p>
                                        <p style={{ ...META_STYLE, ...codeStyle, margin: 0 }}>{tokenValue.background}</p>
                                    </div>
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            borderRadius: 'var(--rad-ui-radius-lg)',
                                            background: tokenValue.background,
                                            border: `1px solid ${tokenValue.border}`,
                                            boxShadow: tokenValue.shadow,
                                            padding: '20px'
                                        }}
                                    >
                                        Elevation layer
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <Dialog.Root open={Boolean(selectedSwatch)} onOpenChange={(open) => !open && setSelectedSwatch(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content className='w-[min(92vw,860px)] max-w-none border-0 bg-transparent p-0 shadow-none'>
                        {selectedSwatch && selectedValues
                            ? (
                                <div style={dialogSurfaceStyle}>
                                    <div
                                        style={{
                                            height: '280px',
                                            background: selectedVariableName
                                                ? `var(${selectedVariableName})`
                                                : undefined
                                        }}
                                    />
                                    <div style={{ padding: '20px 20px 24px', display: 'grid', gap: '18px' }}>
                                        <div style={{ display: 'grid', gap: '6px' }}>
                                            <Dialog.Title asChild>
                                                <h3 style={{ margin: 0, fontSize: '2rem', lineHeight: 1, fontWeight: 700, textTransform: 'capitalize' }}>
                                                    {typeof selectedValues.light === 'string'
                                                        ? selectedSwatch.paletteName
                                                        : `${selectedSwatch.paletteName} ${selectedSwatch.shade}`}
                                                </h3>
                                            </Dialog.Title>
                                            <Dialog.Description asChild>
                                                <p style={{ ...META_STYLE, margin: 0 }}>
                                                Primitive color token in the current runtime theme.
                                                </p>
                                            </Dialog.Description>
                                        </div>

                                        <div style={detailGridStyle}>
                                            <p style={{ ...META_STYLE, margin: 0 }}>Token</p>
                                            <p style={{ ...LABEL_STYLE, ...codeStyle, margin: 0 }}>
                                                {typeof selectedValues.light === 'string'
                                                    ? `colors.${selectedSwatch.paletteName}`
                                                    : `colors.${selectedSwatch.paletteName}.${selectedSwatch.shade}`}
                                            </p>

                                            <p style={{ ...META_STYLE, margin: 0 }}>CSS variable</p>
                                            <p style={{ ...LABEL_STYLE, ...codeStyle, margin: 0 }}>{selectedVariableName}</p>

                                            <p style={{ ...META_STYLE, margin: 0 }}>Runtime value</p>
                                            <p style={{ ...LABEL_STYLE, ...codeStyle, margin: 0 }}>{runtimeValue}</p>

                                            <p style={{ ...META_STYLE, margin: 0 }}>Light source</p>
                                            <p style={{ ...LABEL_STYLE, ...codeStyle, margin: 0 }}>
                                                {typeof selectedValues.light === 'string'
                                                    ? selectedValues.light
                                                    : selectedValues.light[selectedSwatch.shade]}
                                            </p>

                                            <p style={{ ...META_STYLE, margin: 0 }}>Dark source</p>
                                            <p style={{ ...LABEL_STYLE, ...codeStyle, margin: 0 }}>
                                                {typeof selectedValues.dark === 'string'
                                                    ? selectedValues.dark
                                                    : selectedValues.dark[selectedSwatch.shade]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                            : null}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'Design Systems/Clarity',
    component: ClarityShowcase,
    render: () => <ClarityShowcase />
};

export const Overview = {
    args: {}
};
