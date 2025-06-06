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
