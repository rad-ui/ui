Avoid `querySelector` in components. With multiple instances, it always selects the first match in the DOM.
This causes cross-component bugs—use refs for scoped, instance-safe access instead.