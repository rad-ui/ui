import { createContext } from 'react';

/** Set by Toolbar.Group so every item inside it can be disabled at once. */
const ToolbarGroupContext = createContext<{ disabled: boolean }>({ disabled: false });

export default ToolbarGroupContext;
