export const getAllBatchElements = (rootElement: HTMLElement):NodeList => {
    return rootElement.querySelectorAll('[data-rad-ui-batch-element]');
};

export const getActiveBatchItem = (batches: NodeList) => {
    // batches is a NodeList
    let activeItem = null;
    batches.forEach((item) => {
        // check if the item has the attribute `data-rad-ui-focus-element`
        if ((item as HTMLElement).hasAttribute('data-rad-ui-focus-element')) {
            activeItem = item;
        }
    });

    return activeItem as HTMLElement | null;
};

export const getNextBatchItem = (batches: NodeList, loop = false): Element => {
    const activeItem = getActiveBatchItem(batches) as HTMLElement | null;
    // Try to get the next sibling element
    const nextItem = activeItem?.nextElementSibling;

    if (nextItem) {
        return nextItem;
    }

    if (loop) {
        // When at the end and looping is enabled, return the first item
        return batches[0] as HTMLElement;
    }

    // When at the end and looping is disabled, stay on the last item
    return batches[batches.length - 1] as HTMLElement;
};

export const getPrevBatchItem = (batches: NodeList, loop = false) => {
    const activeItem = getActiveBatchItem(batches) as HTMLElement | null;
    // get the next item, return it if it is not the last item
    const prevItem = activeItem?.previousElementSibling;
    if (prevItem) {
        return prevItem;
    }

    if (loop) {
        // if it is the last item, return the last item
        return batches[batches.length - 1] as HTMLElement;
    }
    // if it is the last item, return the first item
    return batches[0] as HTMLElement;
};
