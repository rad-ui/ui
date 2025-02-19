import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import composeEventHandlers from './index';

const OnlyOriginalHandlerWithPreventDefault = ({
    checkForDefaultPrevented = true
}: {
    checkForDefaultPrevented?: boolean;
}) => {
    const originalClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // we prevent default, so we should not see our handler
        console.log('RETURNING_ORIGINAL_HANDLER');
    };
    const ourClickHandler = () => {
        // This won't be triggered because we prevent default in the original handler
        console.log('RETURNING_OUR_HANDLER');

        console.log('RETURN_OUR_HANDLER_WITH_CHECK_FOR_DEFAULT_PREVENTED');
    };
    const composedHandleClick = composeEventHandlers(
        originalClickHandler,
        ourClickHandler,
        { checkForDefaultPrevented }
    );

    return <button onClick={composedHandleClick}>Click Me</button>;
};

describe('composeEventHandlers', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    test('should compose event handlers', () => {
        render(<OnlyOriginalHandlerWithPreventDefault />);
        const button = screen.getByText('Click Me');
        fireEvent.click(button);
        expect(consoleLogSpy).toHaveBeenCalledWith('RETURNING_ORIGINAL_HANDLER');
        expect(consoleLogSpy).not.toHaveBeenCalledWith('RETURNING_OUR_HANDLER');
    });

    test('should compose event handlers with checkForDefaultPrevented false', () => {
        // if checkForDefaultPrevented is false, we should see our handler
        render(<OnlyOriginalHandlerWithPreventDefault checkForDefaultPrevented={false} />);
        const button = screen.getByText('Click Me');
        fireEvent.click(button);
        expect(consoleLogSpy).toHaveBeenCalledWith('RETURNING_ORIGINAL_HANDLER');

        // even if the event is prevented, we should see our handler - the function completely ignores the event prevent default
        expect(consoleLogSpy).toHaveBeenCalledWith('RETURN_OUR_HANDLER_WITH_CHECK_FOR_DEFAULT_PREVENTED');
    });
});
