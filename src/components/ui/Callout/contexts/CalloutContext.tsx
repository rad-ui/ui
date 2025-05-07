import { createContext } from 'react';

interface CalloutContextType {
    rootClass?: string
}

const CalloutContext = createContext<CalloutContextType>({
    rootClass: ''
});

export default CalloutContext;