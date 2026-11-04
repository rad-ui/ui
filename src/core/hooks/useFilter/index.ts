import * as React from 'react';
import { createFilter, Filter, FilterOptions } from '~/core/utils/filter';

/** Case- and accent-insensitive text matchers (`contains`, `startsWith`, `endsWith`) for a list's `filter`. */
export const useFilter = ({ locale, ignoreAccents = true }: FilterOptions = {}): Filter => {
    const localeKey = Array.isArray(locale) ? locale.join(',') : String(locale ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useMemo(() => createFilter({ locale, ignoreAccents }), [localeKey, ignoreAccents]);
};

export type { Filter, FilterOptions };
