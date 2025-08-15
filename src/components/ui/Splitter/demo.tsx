import React from 'react';
import Splitter from './Splitter';

const SplitterDemo = () => {
    const [sizes, setSizes] = React.useState([50, 50]);

    return (
        <div style={{ padding: '20px', height: '100vh' }}>
            <h1>Splitter Component Demo</h1>
            <p>Current sizes: {sizes[0].toFixed(1)}% | {sizes[1].toFixed(1)}%</p>

            <div style={{ height: '400px', border: '2px solid #e5e7eb', borderRadius: '8px', marginTop: '20px' }}>
                <Splitter.Root
                    orientation="horizontal"
                    defaultSizes={[50, 50]}
                    onSizesChange={setSizes}
                >
                    <Splitter.Panel index={0}>
                        <div
                            style={{
                                background: '#3b82f6',
                                padding: '20px',
                                height: '100%',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <h3>Left Panel</h3>
                            <div style={{ flex: 1, overflow: 'auto' }}>
                                <p>This is the left panel content. You can resize this panel by dragging the handle.</p>
                                <p>The handle should be visible and easy to interact with.</p>
                                <p>Try dragging the handle to resize the panels!</p>
                            </div>
                        </div>
                    </Splitter.Panel>

                    <Splitter.Handle index={0} aria-label="Resize panels" />

                    <Splitter.Panel index={1}>
                        <div
                            style={{
                                background: '#10b981',
                                padding: '20px',
                                height: '100%',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <h3>Right Panel</h3>
                            <div style={{ flex: 1, overflow: 'auto' }}>
                                <p>This is the right panel content.</p>
                                <p>The handle between the panels should be clearly visible.</p>
                                <p>You can also use keyboard navigation when the handle is focused.</p>
                            </div>
                        </div>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h2>Vertical Splitter Example</h2>
                <div style={{ height: '300px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                    <Splitter.Root orientation="vertical" defaultSizes={[60, 40]}>
                        <Splitter.Panel index={0}>
                            <div
                                style={{
                                    background: '#8b5cf6',
                                    padding: '20px',
                                    height: '100%',
                                    color: 'white'
                                }}>
                                <h3>Top Panel</h3>
                                <p>This is a vertical splitter example.</p>
                            </div>
                        </Splitter.Panel>

                        <Splitter.Handle index={0} aria-label="Resize vertical panels" />

                        <Splitter.Panel index={1}>
                            <div
                                style={{
                                    background: '#f59e0b',
                                    padding: '20px',
                                    height: '100%',
                                    color: 'white'
                                }}>
                                <h3>Bottom Panel</h3>
                                <p>Drag the handle to resize vertically.</p>
                            </div>
                        </Splitter.Panel>
                    </Splitter.Root>
                </div>
            </div>
        </div>
    );
};

export default SplitterDemo;
