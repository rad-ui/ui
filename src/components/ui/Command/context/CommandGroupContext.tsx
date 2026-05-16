'use client';

import React from 'react';

export const CommandGroupContext = React.createContext<string | null>(null);

export const useCommandGroupContext = () => React.useContext(CommandGroupContext);
