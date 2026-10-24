import React from 'react';
import Autocomplete from '../Autocomplete';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Autocomplete',
    component: Autocomplete
} as any;

const CITIES = ['Amsterdam', 'Athens', 'Bangalore', 'Barcelona', 'Berlin', 'Hyderabad', 'Lisbon', 'London', 'Mumbai', 'Paris'];

export const Basic = () => {
    const [value, setValue] = React.useState('');
    return (
        <SandboxEditor>
            <Autocomplete.Root value={value} onValueChange={setValue}>
                <Autocomplete.Input aria-label="City" placeholder="Search cities" />
                <Autocomplete.Portal>
                    <Autocomplete.Content>
                        {CITIES.map((city) => <Autocomplete.Item key={city} value={city}>{city}</Autocomplete.Item>)}
                    </Autocomplete.Content>
                </Autocomplete.Portal>
            </Autocomplete.Root>
            <p className="mt-4 text-sm">Value: {value || '—'}</p>
        </SandboxEditor>
    );
};
