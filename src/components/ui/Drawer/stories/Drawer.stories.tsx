import React, { useState } from 'react';

import Drawer from '../Drawer';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

const CloseIcon = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Drawer',
    component: Drawer,
    render: (args: any) => {
        return (
            <SandboxEditor>
                <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                    <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Background Content</h1>
                    <p style={{ marginBottom: '16px', color: '#666' }}>This content will scale down when the drawer opens, with improved smooth animations!</p>
                    <Drawer.Root
                        side="bottom"
                        transitionDuration={350}
                        transitionTimingFunction="cubic-bezier(0.32, 0.72, 0, 1)"
                        scaleBackground={true}
                        backgroundScaleAmount={0.94}
                        backgroundBorderRadius={10}
                    >
                        <Drawer.Trigger>
                            <Button>Open Drawer (with Background Scaling)</Button>
                        </Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                            <Drawer.Content>
                                <div style={{ padding: '20px', backgroundColor: 'white', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', minHeight: '200px', boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)' }}>
                                    <Drawer.Title>
                                        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Enhanced Drawer with Background Scaling</h2>
                                    </Drawer.Title>
                                    <Drawer.Description>
                                        <p style={{ margin: '0 0 16px 0', color: '#666' }}>Notice how the background content scales down and gets rounded corners when this drawer opens, creating a layered depth effect just like vaul's drawer!</p>
                                    </Drawer.Description>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <Drawer.Close>
                                            <Button variant="secondary">Cancel</Button>
                                        </Drawer.Close>
                                        <Button>Action</Button>
                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>
            </SandboxEditor>
        );
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {}
};

export const FromTop = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root side="top">
                <Drawer.Trigger>
                    <Button>Open from Top</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <div style={{ padding: '20px', backgroundColor: 'white', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', minHeight: '200px' }}>
                            <Drawer.Title>
                                <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Top Drawer</h2>
                            </Drawer.Title>
                            <Drawer.Description>
                                <p style={{ margin: '0 0 16px 0', color: '#666' }}>This drawer slides in from the top.</p>
                            </Drawer.Description>
                            <Drawer.Close>
                                <Button>Close</Button>
                            </Drawer.Close>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const FromRight = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root side="right">
                <Drawer.Trigger>
                    <Button>Open from Right</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <div style={{ padding: '20px', backgroundColor: 'white', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', minWidth: '300px', height: '100vh' }}>
                            <Drawer.Title>
                                <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Right Drawer</h2>
                            </Drawer.Title>
                            <Drawer.Description>
                                <p style={{ margin: '0 0 16px 0', color: '#666' }}>This drawer slides in from the right side.</p>
                            </Drawer.Description>
                            <Drawer.Close>
                                <Button>Close</Button>
                            </Drawer.Close>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const FromLeft = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root side="left" transitionDuration={300} transitionTimingFunction="cubic-bezier(0.32, 0.72, 0, 1)">
                <Drawer.Trigger>
                    <Button>Open from Left</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    <Drawer.Content>
                        <div style={{ padding: '20px', backgroundColor: 'white', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', minWidth: '300px', height: '100vh', boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)' }}>
                            <Drawer.Title>
                                <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Left Drawer</h2>
                            </Drawer.Title>
                            <Drawer.Description>
                                <p style={{ margin: '0 0 16px 0', color: '#666' }}>This drawer slides in from the left side with smooth animations.</p>
                            </Drawer.Description>
                            <Drawer.Close>
                                <Button>Close</Button>
                            </Drawer.Close>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const SmoothFadeAnimation = {
    render: () => (
        <SandboxEditor>
            <div style={{ padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Smooth Fade Animation Test</h1>
                <p style={{ marginBottom: '16px', opacity: 0.8 }}>This example showcases the improved fade animation with hardware acceleration and better timing.</p>
                <Drawer.Root
                    side="bottom"
                    transitionDuration={280}
                    transitionTimingFunction="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                >
                    <Drawer.Trigger>
                        <Button>Test Smooth Fade</Button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
                        <Drawer.Content>
                            <div style={{ padding: '30px', backgroundColor: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', minHeight: '250px' }}>
                                <Drawer.Title>
                                    <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>✨ Smooth Animations</h2>
                                </Drawer.Title>
                                <Drawer.Description>
                                    <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: '1.6' }}>
                                        The overlay now fades in smoothly with hardware acceleration, double-RAF timing,
                                        and optimized rendering. Notice the buttery smooth fade effect!
                                    </p>
                                </Drawer.Description>
                                <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                                    <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Improvements:</h3>
                                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
                                        <li>Hardware acceleration with translate3d</li>
                                        <li>Double RAF for perfect timing</li>
                                        <li>Smoother cubic-bezier curve</li>
                                        <li>Better backface visibility handling</li>
                                    </ul>
                                </div>
                                <Drawer.Close>
                                    <Button>Close & See Smooth Fade Out</Button>
                                </Drawer.Close>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </SandboxEditor>
    )
};

export const FastAnimation = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root side="bottom" transitionDuration={150} transitionTimingFunction="cubic-bezier(0.25, 0.46, 0.45, 0.94)">
                <Drawer.Trigger>
                    <Button>Fast Animation (150ms)</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                    <Drawer.Content>
                        <div style={{ padding: '20px', backgroundColor: 'white', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', minHeight: '200px' }}>
                            <Drawer.Title>
                                <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Fast & Smooth</h2>
                            </Drawer.Title>
                            <Drawer.Description>
                                <p style={{ margin: '0 0 16px 0', color: '#666' }}>This drawer opens and closes quickly with a 150ms duration and improved smoothness.</p>
                            </Drawer.Description>
                            <Drawer.Close>
                                <Button>Close</Button>
                            </Drawer.Close>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const SpringyAnimation = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root
                side="right"
                transitionDuration={600}
                transitionTimingFunction="cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
                <Drawer.Trigger>
                    <Button>Springy Animation</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                    <Drawer.Content>
                        <div style={{ padding: '20px', backgroundColor: 'white', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', minWidth: '300px', height: '100vh', boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)' }}>
                            <Drawer.Title>
                                <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Springy Animation</h2>
                            </Drawer.Title>
                            <Drawer.Description>
                                <p style={{ margin: '0 0 16px 0', color: '#666' }}>This drawer uses a spring-like cubic-bezier animation with a slight bounce effect.</p>
                            </Drawer.Description>
                            <Drawer.Close>
                                <Button>Close</Button>
                            </Drawer.Close>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const VaulStyleBackground = {
    render: () => (
        <SandboxEditor>
            <div
                style={{
                    padding: '40px',
                    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Vaul-Style Background Effect</h1>

                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Features:</h2>
                    {/* <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Background content scales to 95% size</li>
                        <li>Rounded corners applied to the entire page</li>
                        <li>Smooth transitions synchronized with drawer animation</li>
                        <li>Configurable scale amount and border radius</li>
                        <li>Automatic cleanup on drawer close</li>
                    </ul> */}
                </div>

                <Drawer.Root
                    side="bottom"
                    transitionDuration={400}
                    transitionTimingFunction="cubic-bezier(0.32, 0.72, 0, 1)"
                    scaleBackground={true}
                    backgroundScaleAmount={0.93}
                    backgroundBorderRadius={12}
                >
                    <Drawer.Trigger>
                        <Button
                            style={{
                                backgroundColor: 'white',
                                color: '#667eea',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                            Experience the Magic ✨
                        </Button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                        <Drawer.Content>
                            <div
                                style={{
                                    padding: '30px',
                                    backgroundColor: 'white',
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px',

                                    boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.2)'
                                }}>
                                <Drawer.Title>
                                    <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                                        🎉 Background Scaled Successfully!
                                    </h2>
                                </Drawer.Title>
                                <Drawer.Description>

                                </Drawer.Description>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                    <Drawer.Close>
                                        <Button variant="secondary">Close & See Effect Reverse</Button>
                                    </Drawer.Close>
                                    <Button>Awesome!</Button>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </SandboxEditor>
    )
};

export const NestedDrawers = {
    render: () => (
        <SandboxEditor>
            <div style={{ padding: '20px', backgroundColor: '#e8f4f8', minHeight: '100vh' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>🪆 Nested Drawers Demo</h1>
                <p style={{ marginBottom: '16px', color: '#666' }}>Test nesting drawers with proper z-index layering and progressive background scaling!</p>

                {/* First Level Drawer */}
                <Drawer.Root
                    side="bottom"
                    transitionDuration={350}
                    transitionTimingFunction="cubic-bezier(0.32, 0.72, 0, 1)"
                    scaleBackground={true}
                    backgroundScaleAmount={0.96}
                    backgroundBorderRadius={8}
                >
                    <Drawer.Trigger>
                        <Button>Open Level 1 Drawer</Button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                        <Drawer.Content>
                            <div style={{ padding: '24px', backgroundColor: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', minHeight: '300px', boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)' }}>
                                <Drawer.Title>
                                    <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>Level 1 Drawer</h2>
                                </Drawer.Title>
                                <Drawer.Description>
                                    <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: '1.6' }}>This is the first level drawer. You can open another drawer from here!</p>
                                </Drawer.Description>

                                {/* Second Level Drawer */}
                                <Drawer.Root
                                    side="right"
                                    transitionDuration={300}
                                    transitionTimingFunction="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                    scaleBackground={true}
                                    backgroundScaleAmount={0.92}
                                    backgroundBorderRadius={12}
                                >
                                    <Drawer.Trigger>
                                        <Button variant="secondary" style={{ marginBottom: '16px' }}>Open Level 2 Drawer</Button>
                                    </Drawer.Trigger>
                                    <Drawer.Portal>
                                        <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                                        <Drawer.Content>
                                            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', minWidth: '320px', height: '100vh', boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.15)' }}>
                                                <Drawer.Title>
                                                    <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a' }}>Level 2 Drawer</h2>
                                                </Drawer.Title>
                                                <Drawer.Description>
                                                    <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: '1.6' }}>And you can go even deeper! Notice the enhanced background scaling effect.</p>
                                                </Drawer.Description>

                                                {/* Third Level Drawer */}
                                                <Drawer.Root
                                                    side="top"
                                                    transitionDuration={250}
                                                    transitionTimingFunction="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                                    scaleBackground={true}
                                                    backgroundScaleAmount={0.88}
                                                    backgroundBorderRadius={16}
                                                >
                                                    <Drawer.Trigger>
                                                        <Button size="small" style={{ marginBottom: '16px' }}>Open Level 3 Drawer</Button>
                                                    </Drawer.Trigger>
                                                    <Drawer.Portal>
                                                        <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                                                        <Drawer.Content>
                                                            <div style={{ padding: '16px', backgroundColor: '#fff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', minHeight: '160px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                                                                <Drawer.Title>
                                                                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a' }}>🎉 Level 3 Drawer</h3>
                                                                </Drawer.Title>
                                                                <Drawer.Description>
                                                                    <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>Amazing! Three levels deep with perfect z-index stacking and progressive background scaling!</p>
                                                                </Drawer.Description>
                                                                <Drawer.Close>
                                                                    <Button size="small">Close Level 3</Button>
                                                                </Drawer.Close>
                                                            </div>
                                                        </Drawer.Content>
                                                    </Drawer.Portal>
                                                </Drawer.Root>

                                                <Drawer.Close>
                                                    <Button size="small" variant="secondary" style={{ marginRight: '8px' }}>Close Level 2</Button>
                                                </Drawer.Close>
                                            </div>
                                        </Drawer.Content>
                                    </Drawer.Portal>
                                </Drawer.Root>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Drawer.Close>
                                        <Button variant="secondary">Close Level 1</Button>
                                    </Drawer.Close>
                                    <Button>Action</Button>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </SandboxEditor>
    )
};

export const NestedWithDifferentSides = {
    render: () => (
        <SandboxEditor>
            <div style={{ padding: '20px', backgroundColor: '#fef7f0', minHeight: '100vh' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>📱 Multi-Direction Nested Drawers</h1>
                <p style={{ marginBottom: '16px', color: '#666' }}>Showcase drawers opening from different sides with smart background scaling!</p>

                <Drawer.Root
                    side="left"
                    transitionDuration={350}
                    scaleBackground={true}
                    backgroundScaleAmount={0.95}
                    backgroundBorderRadius={10}
                >
                    <Drawer.Trigger>
                        <Button>← Open Left Menu</Button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                        <Drawer.Content>
                            <div style={{ padding: '20px', backgroundColor: 'white', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', minWidth: '280px', height: '100vh' }}>
                                <Drawer.Title>
                                    <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>📋 Navigation Menu</h2>
                                </Drawer.Title>
                                <Drawer.Description>
                                    <p style={{ margin: '0 0 20px 0', color: '#666' }}>Choose an option to open additional panels:</p>
                                </Drawer.Description>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Bottom drawer from nav */}
                                    <Drawer.Root
                                        side="bottom"
                                        transitionDuration={300}
                                        scaleBackground={true}
                                        backgroundScaleAmount={0.90}
                                        backgroundBorderRadius={15}
                                    >
                                        <Drawer.Trigger>
                                            <Button variant="secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>⚙️ Settings Panel</Button>
                                        </Drawer.Trigger>
                                        <Drawer.Portal>
                                            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                                            <Drawer.Content>
                                                <div style={{ padding: '20px', backgroundColor: 'white', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', minHeight: '250px' }}>
                                                    <Drawer.Title>
                                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>⚙️ Settings</h3>
                                                    </Drawer.Title>
                                                    <Drawer.Description>
                                                        <p style={{ margin: '0 0 16px 0', color: '#666' }}>Adjust your preferences here.</p>
                                                    </Drawer.Description>
                                                    <Drawer.Close>
                                                        <Button size="small">Done</Button>
                                                    </Drawer.Close>
                                                </div>
                                            </Drawer.Content>
                                        </Drawer.Portal>
                                    </Drawer.Root>

                                    {/* Right drawer from nav */}
                                    <Drawer.Root
                                        side="right"
                                        transitionDuration={250}
                                        scaleBackground={true}
                                        backgroundScaleAmount={0.88}
                                        backgroundBorderRadius={18}
                                    >
                                        <Drawer.Trigger>
                                            <Button variant="secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>📊 Analytics</Button>
                                        </Drawer.Trigger>
                                        <Drawer.Portal>
                                            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                                            <Drawer.Content>
                                                <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', minWidth: '300px', height: '100vh' }}>
                                                    <Drawer.Title>
                                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>📊 Analytics Dashboard</h3>
                                                    </Drawer.Title>
                                                    <Drawer.Description>
                                                        <p style={{ margin: '0 0 16px 0', color: '#666' }}>View your stats and metrics.</p>
                                                    </Drawer.Description>
                                                    <Drawer.Close>
                                                        <Button size="small">Close Analytics</Button>
                                                    </Drawer.Close>
                                                </div>
                                            </Drawer.Content>
                                        </Drawer.Portal>
                                    </Drawer.Root>
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <Drawer.Close>
                                        <Button variant="secondary" size="small">Close Menu</Button>
                                    </Drawer.Close>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </SandboxEditor>
    )
};

export const DraggableWithProgressiveScaling = {
    render: () => (
        <SandboxEditor>
            <div style={{ padding: '20px', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>🎯 Draggable Drawer with Progressive Background Scaling</h1>
                <p style={{ marginBottom: '16px', color: '#666' }}>Try dragging the drawer content to open/close. Watch how the background scales progressively based on drag progress!</p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Drawer.Root
                        side="bottom"
                        scaleBackground={true}
                        backgroundScaleAmount={0.92}
                        transitionDuration={350}
                        transitionTimingFunction="cubic-bezier(0.32, 0.72, 0, 1)"
                    >
                        <Drawer.Trigger>
                            <Button>🔥 Draggable Bottom Drawer</Button>
                        </Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                            <Drawer.Content>
                                <div
                                    style={{
                                        padding: '24px',
                                        backgroundColor: 'white',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        minHeight: '400px',
                                        maxHeight: '80vh',
                                        overflow: 'auto',
                                        cursor: 'grab',
                                        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)'
                                    }}>
                                    <div style={{ width: '48px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', margin: '0 auto 16px' }} />
                                    <Drawer.Title>
                                        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>🎯 Draggable Bottom Drawer</h2>
                                    </Drawer.Title>
                                    <Drawer.Description>
                                        <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.6' }}>
                                            You can drag this drawer up and down to open/close it. The background scaling responds to your drag progress in real-time.
                                        </p>
                                    </Drawer.Description>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>How it works:</h3>
                                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                                <li>Drag the drawer content to open/close</li>
                                                <li>Background scales progressively (0% to 92%)</li>
                                                <li>Background opacity changes with drag progress</li>
                                                <li>Smooth snapping when you release</li>
                                            </ul>
                                        </div>

                                        <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '12px' }}>
                                            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Try dragging:</h3>
                                            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                                Grab anywhere on this drawer content and drag up/down. Notice how the background scaling follows your movement.
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '24px' }}>
                                        <Drawer.Close>
                                            <Button>Close Drawer</Button>
                                        </Drawer.Close>
                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>

                    <Drawer.Root
                        side="right"
                        scaleBackground={true}
                        backgroundScaleAmount={0.90}
                        backgroundBorderRadius={15}
                        transitionDuration={300}
                    >
                        <Drawer.Trigger>
                            <Button variant="secondary">⚡ Draggable Right Drawer</Button>
                        </Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                            <Drawer.Content>
                                <div
                                    style={{
                                        padding: '24px',
                                        backgroundColor: 'white',
                                        width: '380px',
                                        height: '100vh',
                                        overflow: 'auto',
                                        cursor: 'grab',
                                        borderTopLeftRadius: '16px',
                                        borderBottomLeftRadius: '16px',
                                        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.12)'
                                    }}>
                                    <div style={{ width: '6px', height: '48px', backgroundColor: '#e2e8f0', borderRadius: '3px', margin: '0 0 16px 0' }} />
                                    <Drawer.Title>
                                        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>⚡ Draggable Right Drawer</h2>
                                    </Drawer.Title>
                                    <Drawer.Description>
                                        <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.6' }}>
                                            Drag this drawer left and right. Notice the different scaling amount (90%) and border radius (15px).
                                        </p>
                                    </Drawer.Description>

                                    <div style={{ padding: '16px', backgroundColor: '#f3e8ff', borderRadius: '12px' }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Different settings:</h3>
                                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                            <li>Scale amount: 90%</li>
                                            <li>Border radius: 15px</li>
                                            <li>Side: right</li>
                                            <li>Drag direction: horizontal</li>
                                        </ul>
                                    </div>

                                    <div style={{ marginTop: '24px' }}>
                                        <Drawer.Close>
                                            <Button>Close Drawer</Button>
                                        </Drawer.Close>
                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>

                    <Drawer.Root
                        side="left"
                        scaleBackground={true}
                        backgroundScaleAmount={0.88}
                        transitionDuration={250}
                    >
                        <Drawer.Trigger>
                            <Button variant="outline">🌟 Draggable Left Drawer</Button>
                        </Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                            <Drawer.Content>
                                <div
                                    style={{
                                        padding: '24px',
                                        backgroundColor: 'white',
                                        width: '320px',
                                        height: '100vh',
                                        overflow: 'auto',
                                        cursor: 'grab',
                                        borderTopRightRadius: '16px',
                                        borderBottomRightRadius: '16px',
                                        boxShadow: '8px 0 32px rgba(0, 0, 0, 0.12)'
                                    }}>
                                    <div style={{ width: '6px', height: '48px', backgroundColor: '#e2e8f0', borderRadius: '3px', margin: '0 0 16px auto' }} />
                                    <Drawer.Title>
                                        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>🌟 Draggable Left Drawer</h2>
                                    </Drawer.Title>
                                    <Drawer.Description>
                                        <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.6' }}>
                                            This drawer has an even more dramatic scaling effect (88%).
                                        </p>
                                    </Drawer.Description>

                                    <div style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '12px' }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>More dramatic scaling:</h3>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                            With 88% scaling, you'll see a more pronounced background effect as you drag.
                                        </p>
                                    </div>

                                    <div style={{ marginTop: '24px' }}>
                                        <Drawer.Close>
                                            <Button>Close Drawer</Button>
                                        </Drawer.Close>
                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>
            </div>
        </SandboxEditor>
    )
};
