export const getAllBatchElements = (rootElement) => {
    return rootElement.querySelectorAll('[data-rad-ui-batch-element]');
};

export const getActiveBatchItem = (batches=[]) => {
    // batches is a NodeList
    let activeItem = null;
    batches.forEach((item) => {
        // check if the item has the attribute `data-rad-ui-focus-element`
        if (item.hasAttribute('data-rad-ui-focus-element')) {
            activeItem = item;
        }
    });

    return activeItem;
};

export const getNextBatchItem = (batches=[]) => {
    const activeItem = getActiveBatchItem(batches);
    // get the next item, return it if it is not the last item
    const nextItem = activeItem?.nextElementSibling;
    if (nextItem) {
        return nextItem;
    }

    // if it is the last item, return the last item
    return batches[batches.length - 1];
};

export const getPrevBatchItem = (batches=[]) => {
    const activeItem = getActiveBatchItem(batches);
    // get the next item, return it if it is not the last item
    const prevItem = activeItem?.previousElementSibling;
    if (prevItem) {
        return prevItem;
    }

    // if it is the last item, return the last item
    return batches[0];
};
