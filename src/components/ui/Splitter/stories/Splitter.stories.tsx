import React from 'react';
import Splitter from '../Splitter';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// Sample content components
const SamplePanel = ({
    title,
    children,
    color = 'var(--rad-ui-color-gray-300)'
}: {
    title: string;
    children?: React.ReactNode;
    color?: string;
}) => (
    <div
        style={{
            padding: '20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: color
        }}
    >
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{title}</h3>
        <div style={{ flex: 1, overflow: 'auto' }}>
            {children || (
                <p>This is a sample panel content. You can resize this panel by dragging the handle.</p>
            )}
        </div>
    </div>
);

const CodePanel = ({ title }: { title: string }) => (
    <div className="bg-gray-900 p-5 h-full flex flex-col text-gray-300 font-mono">
        <h3 className="m-0 mb-2.5 text-lg">{title}</h3>
        <div className="flex-1 overflow-auto">
            <pre className="m-0">
                {`function example() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return (
    <div>
      {data.map(item => (
        <Component key={item.id} />
      ))}
    </div>
  );
}`}
            </pre>
        </div>
    </div>
);

export default {
    title: 'Components/Splitter',
    component: Splitter,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Splitter

A headless splitter component for creating resizable panel layouts. Supports both horizontal and vertical orientations with drag and keyboard controls.

## Basic Usage

\`\`\`tsx
<Splitter.Root orientation="horizontal" defaultSizes={[30, 70]}>
  <Splitter.Panel index={0}>
    <div>Left Panel</div>
  </Splitter.Panel>
  <Splitter.Handle index={0} />
  <Splitter.Panel index={1}>
    <div>Right Panel</div>
  </Splitter.Panel>
</Splitter.Root>
\`\`\`

## Features

- **Headless**: Logic only, style however you like
- **Accessible**: Keyboard navigation, ARIA attributes, screen reader support
- **Flexible**: Horizontal and vertical orientations
- **Responsive**: Touch and mouse support
- **Customizable**: Min/max sizes, custom callbacks

## API Reference

### Splitter.Root

The main container component that manages the splitter state and layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`orientation\` | \`'horizontal' \\| 'vertical'\` | \`'horizontal'\` | The direction of the splitter |
| \`defaultSizes\` | \`number[]\` | \`[50, 50]\` | Initial panel sizes as percentages |
| \`minSizes\` | \`number[]\` | \`[0, 0]\` | Minimum panel sizes as percentages |
| \`maxSizes\` | \`number[]\` | \`[100, 100]\` | Maximum panel sizes as percentages |
| \`onSizesChange\` | \`(sizes: number[]) => void\` | - | Callback when panel sizes change |
| \`className\` | \`string\` | - | Additional CSS classes |
| \`customRootClass\` | \`string\` | - | Custom root class for styling |

### Splitter.Panel

A resizable panel that contains your content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`index\` | \`number\` | - | Panel index (0, 1, 2, etc.) |
| \`className\` | \`string\` | - | Additional CSS classes |
| \`customRootClass\` | \`string\` | - | Custom root class for styling |

### Splitter.Handle

The draggable handle between panels.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`index\` | \`number\` | - | Handle index (0, 1, 2, etc.) |
| \`aria-label\` | \`string\` | - | Accessible label for screen readers |
| \`className\` | \`string\` | - | Additional CSS classes |
| \`customRootClass\` | \`string\` | - | Custom root class for styling |

## Keyboard Navigation

- **Arrow keys**: Resize panels by 1%
- **Shift + Arrow keys**: Resize panels by 10%
- **Tab**: Navigate between handles
- **Enter/Space**: Activate handle for keyboard resizing
        `
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px' }}>
                <Splitter.Root {...args}>
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Left Panel" />
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <SamplePanel title="Right Panel" />
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Basic horizontal splitter
export const Horizontal = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [50, 50]
    },
    parameters: {
        docs: {
            description: {
                story: 'Create a horizontal splitter with two equally sized panels.'
            }
        }
    }
};

// Basic vertical splitter
export const Vertical = {
    args: {
        orientation: 'vertical',
        defaultSizes: [50, 50]
    },
    parameters: {
        docs: {
            description: {
                story: 'Create a vertical splitter with two equally sized panels.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root {...args}>
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Top Panel" />
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <SamplePanel title="Bottom Panel" />
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Splitter with custom initial sizes
export const CustomSizes = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [30, 70]
    },
    parameters: {
        docs: {
            description: {
                story: 'Set custom initial panel sizes using the `defaultSizes` prop.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root {...args}>
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Sidebar (30%)" />
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <SamplePanel title="Main Content (70%)" />
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Splitter with minimum sizes
export const WithMinSizes = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [50, 50],
        minSizes: [20, 30]
    },
    parameters: {
        docs: {
            description: {
                story: 'Set minimum panel sizes to prevent panels from becoming too small.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root {...args}>
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Min 20%" />
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <SamplePanel title="Min 30%" />
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Code editor example
export const CodeEditor = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [40, 60]
    },
    parameters: {
        docs: {
            description: {
                story: 'A practical example showing how to create a code editor layout with file explorer and editor panels.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root {...args}>
                    <Splitter.Panel index={0}>
                        <CodePanel title="File Explorer" />
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <CodePanel title="Code Editor" />
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Three panel layout
export const ThreePanels = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [25, 50, 25]
    },
    parameters: {
        docs: {
            description: {
                story: 'Create a three-panel layout by nesting splitters. This example shows left, center, and right panels.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root orientation="horizontal" defaultSizes={[25, 75]}>
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Left Panel" />
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <Splitter.Root orientation="vertical" defaultSizes={[70, 30]}>
                            <Splitter.Panel index={0}>
                                <SamplePanel title="Center Panel" />
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <SamplePanel title="Right Panel" />
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// With size change callback
export const WithCallback = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [50, 50]
    },
    parameters: {
        docs: {
            description: {
                story: 'Listen to size changes using the `onSizesChange` callback. This example shows real-time size updates.'
            }
        }
    },
    render: (args: any) => {
        const [sizes, setSizes] = React.useState([50, 50]);

        return (
            <SandboxEditor>
                <div>
                    <div style={{ marginBottom: '10px', padding: '10px', background: '#f3f4f6', borderRadius: '4px' }}>
                        <p style={{ margin: 0, fontSize: '14px' }}>
              Current sizes: {sizes[0].toFixed(1)}% | {sizes[1].toFixed(1)}%
                        </p>
                    </div>
                    <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                        <Splitter.Root {...args} onSizesChange={setSizes}>
                            <Splitter.Panel index={0}>
                                <SamplePanel title="Panel A" />
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <SamplePanel title="Panel B" />
                            </Splitter.Panel>
                        </Splitter.Root>
                    </div>
                </div>
            </SandboxEditor>
        );
    }
};

// Accessibility example
export const Accessibility = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [50, 50]
    },
    parameters: {
        docs: {
            description: {
                story: 'The splitter includes full accessibility support with keyboard navigation, ARIA attributes, and screen reader compatibility.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root {...args}>
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Navigation">
                            <p>This panel can be resized using:</p>
                            <ul>
                                <li>Mouse drag on the handle</li>
                                <li>Touch drag on mobile</li>
                                <li>Arrow keys when handle is focused</li>
                                <li>Shift + Arrow keys for larger steps</li>
                            </ul>
                        </SamplePanel>
                    </Splitter.Panel>
                    <Splitter.Handle index={0} aria-label="Resize navigation panel" />
                    <Splitter.Panel index={1}>
                        <SamplePanel title="Content Area">
                            <p>This is the main content area. The splitter handle has proper ARIA attributes for screen readers.</p>
                        </SamplePanel>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Complex IDE Layout
export const ComplexIDELayout = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [20, 80]
    },
    parameters: {
        docs: {
            description: {
                story: 'A complex IDE layout with multiple nested splitters. This demonstrates how to create professional development environments with file explorer, editor, preview, and terminal panels.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '500px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root orientation="horizontal" defaultSizes={[20, 80]}>
                    {/* Left Sidebar */}
                    <Splitter.Panel index={0}>
                        <Splitter.Root orientation="vertical" defaultSizes={[60, 40]}>
                            <Splitter.Panel index={0}>
                                <CodePanel title="File Explorer" />
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <CodePanel title="Search" />
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>

                    <Splitter.Handle index={0} />

                    {/* Main Content Area */}
                    <Splitter.Panel index={1}>
                        <Splitter.Root orientation="vertical" defaultSizes={[70, 30]}>
                            <Splitter.Panel index={0}>
                                <Splitter.Root orientation="horizontal" defaultSizes={[60, 40]}>
                                    <Splitter.Panel index={0}>
                                        <CodePanel title="Editor" />
                                    </Splitter.Panel>
                                    <Splitter.Handle index={0} />
                                    <Splitter.Panel index={1}>
                                        <CodePanel title="Preview" />
                                    </Splitter.Panel>
                                </Splitter.Root>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <CodePanel title="Terminal" />
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Dashboard Layout
export const DashboardLayout = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [25, 75]
    },
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive dashboard layout with sidebar navigation and multiple content areas. Shows how to organize analytics, activity feeds, tasks, messages, and calendar widgets.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '500px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root orientation="horizontal" defaultSizes={[25, 75]}>
                    {/* Sidebar */}
                    <Splitter.Panel index={0}>
                        <SamplePanel title="Sidebar">
                            <p>Navigation menu</p>
                            <p>User settings</p>
                            <p>Quick actions</p>
                        </SamplePanel>
                    </Splitter.Panel>

                    <Splitter.Handle index={0} />

                    {/* Main Dashboard */}
                    <Splitter.Panel index={1}>
                        <Splitter.Root orientation="vertical" defaultSizes={[60, 40]}>
                            <Splitter.Panel index={0}>
                                <Splitter.Root orientation="horizontal" defaultSizes={[50, 50]}>
                                    <Splitter.Panel index={0}>
                                        <SamplePanel title="Analytics">
                                            <p>Charts and graphs</p>
                                            <p>Performance metrics</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                    <Splitter.Handle index={0} />
                                    <Splitter.Panel index={1}>
                                        <SamplePanel title="Activity Feed">
                                            <p>Recent activities</p>
                                            <p>Notifications</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                </Splitter.Root>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <Splitter.Root orientation="horizontal" defaultSizes={[33, 33, 34]}>
                                    <Splitter.Panel index={0}>
                                        <SamplePanel title="Tasks">
                                            <p>Todo list</p>
                                            <p>Progress tracking</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                    <Splitter.Handle index={0} />
                                    <Splitter.Panel index={1}>
                                        <SamplePanel title="Messages">
                                            <p>Chat interface</p>
                                            <p>Team communications</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                    <Splitter.Handle index={1} />
                                    <Splitter.Panel index={2}>
                                        <SamplePanel title="Calendar">
                                            <p>Schedule view</p>
                                            <p>Upcoming events</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                </Splitter.Root>
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Photo Editor Layout
export const PhotoEditorLayout = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [20, 60, 20]
    },
    parameters: {
        docs: {
            description: {
                story: 'A professional photo editor layout with tools panel, canvas area, and properties panel. Demonstrates how to create complex editing interfaces similar to Photoshop.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '500px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Splitter.Root orientation="horizontal" defaultSizes={[20, 60, 20]}>
                    {/* Tools Panel */}
                    <Splitter.Panel index={0}>
                        <Splitter.Root orientation="vertical" defaultSizes={[40, 30, 30]}>
                            <Splitter.Panel index={0}>
                                <SamplePanel title="Tools">
                                    <p>Brush tools</p>
                                    <p>Selection tools</p>
                                    <p>Shape tools</p>
                                </SamplePanel>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <SamplePanel title="Layers">
                                    <p>Layer stack</p>
                                    <p>Blend modes</p>
                                </SamplePanel>
                            </Splitter.Panel>
                            <Splitter.Handle index={1} />
                            <Splitter.Panel index={2}>
                                <SamplePanel title="History">
                                    <p>Undo/Redo</p>
                                    <p>Action history</p>
                                </SamplePanel>
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>

                    <Splitter.Handle index={0} />

                    {/* Canvas Area */}
                    <Splitter.Panel index={1}>
                        <Splitter.Root orientation="vertical" defaultSizes={[80, 20]}>
                            <Splitter.Panel index={0}>
                                <SamplePanel title="Canvas" color="#1f2937">
                                    <p>Main editing area</p>
                                    <p>Image canvas</p>
                                </SamplePanel>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <SamplePanel title="Timeline" color="#111827">
                                    <p>Animation timeline</p>
                                    <p>Keyframes</p>
                                </SamplePanel>
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>

                    <Splitter.Handle index={1} />

                    {/* Properties Panel */}
                    <Splitter.Panel index={2}>
                        <Splitter.Root orientation="vertical" defaultSizes={[50, 50]}>
                            <Splitter.Panel index={0}>
                                <SamplePanel title="Properties" color="#6b7280">
                                    <p>Tool properties</p>
                                    <p>Color picker</p>
                                    <p>Brush settings</p>
                                </SamplePanel>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <SamplePanel title="Color Palette" color="#374151">
                                    <p>Swatches</p>
                                    <p>Gradients</p>
                                    <p>Patterns</p>
                                </SamplePanel>
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};

// Data Analysis Layout
export const DataAnalysisLayout = {
    args: {
        orientation: 'horizontal',
        defaultSizes: [30, 70]
    },
    parameters: {
        docs: {
            description: {
                story: 'A data analysis platform layout with data sources, query builder, visualizations, and collaboration tools. Perfect for business intelligence and analytics applications.'
            }
        }
    },
    render: (args: any) => (
        <SandboxEditor>
            <div style={{ height: '500px', border: '1px solid #e5e7eb', borderRadius: '8px', width: '600px' }}>
                <Splitter.Root orientation="horizontal" defaultSizes={[30, 70]}>
                    {/* Data Sources */}
                    <Splitter.Panel index={0}>
                        <Splitter.Root orientation="vertical" defaultSizes={[40, 30, 30]}>
                            <Splitter.Panel index={0}>
                                <SamplePanel title="Data Sources" color="#3b82f6">
                                    <p>Database connections</p>
                                    <p>API endpoints</p>
                                    <p>File imports</p>
                                </SamplePanel>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <SamplePanel title="Query Builder" color="#10b981">
                                    <p>SQL editor</p>
                                    <p>Query history</p>
                                </SamplePanel>
                            </Splitter.Panel>
                            <Splitter.Handle index={1} />
                            <Splitter.Panel index={2}>
                                <SamplePanel title="Data Preview" color="#f59e0b">
                                    <p>Table view</p>
                                    <p>Data statistics</p>
                                </SamplePanel>
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>

                    <Splitter.Handle index={0} />

                    {/* Analysis Area */}
                    <Splitter.Panel index={1}>
                        <Splitter.Root orientation="vertical" defaultSizes={[60, 40]}>
                            <Splitter.Panel index={0}>
                                <Splitter.Root orientation="horizontal" defaultSizes={[50, 50]}>
                                    <Splitter.Panel index={0}>
                                        <SamplePanel title="Visualizations" color="#8b5cf6">
                                            <p>Charts and graphs</p>
                                            <p>Interactive plots</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                    <Splitter.Handle index={0} />
                                    <Splitter.Panel index={1}>
                                        <SamplePanel title="Insights" color="#ef4444">
                                            <p>AI insights</p>
                                            <p>Trend analysis</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                </Splitter.Root>
                            </Splitter.Panel>
                            <Splitter.Handle index={0} />
                            <Splitter.Panel index={1}>
                                <Splitter.Root orientation="horizontal" defaultSizes={[40, 60]}>
                                    <Splitter.Panel index={0}>
                                        <SamplePanel title="Reports" color="#059669">
                                            <p>Generated reports</p>
                                            <p>Export options</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                    <Splitter.Handle index={0} />
                                    <Splitter.Panel index={1}>
                                        <SamplePanel title="Collaboration" color="#dc2626">
                                            <p>Team comments</p>
                                            <p>Share settings</p>
                                        </SamplePanel>
                                    </Splitter.Panel>
                                </Splitter.Root>
                            </Splitter.Panel>
                        </Splitter.Root>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        </SandboxEditor>
    )
};
