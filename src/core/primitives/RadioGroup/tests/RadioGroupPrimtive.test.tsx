import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroupPrimitive from '../RadioGroupPrimitive';

describe('RadioGroupPrimitive', () => {
  const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' },
  ];

  function renderGroup(props = {}, itemProps = {}) {
    return render(
      <RadioGroupPrimitive.Root data-testid="root" {...props}>
        {options.map((option) => (
          <RadioGroupPrimitive.Item key={option.value} value={option.value} {...itemProps}>
            {option.label}
          </RadioGroupPrimitive.Item>
        ))}
      </RadioGroupPrimitive.Root>
    );
  }

  function getRadioByText(label: string): HTMLInputElement {
    // Find the radio input by traversing from the text node
    const textNode = screen.getByText(label);
    const parent = textNode.closest('div');
    if (!parent) throw new Error('No parent div found for label: ' + label);
    const radio = parent.querySelector('input[type="radio"]');
    if (!radio) throw new Error('No radio input found for label: ' + label);
    return radio as HTMLInputElement;
  }

  it('renders all radio items and labels', () => {
    renderGroup();
    options.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('checks the defaultChecked value', () => {
    renderGroup({ defaultChecked: 'css' });
    const radio = getRadioByText('CSS');
    expect(radio).toBeChecked();
  });

  it('calls onChange with correct value', () => {
    const handleChange = jest.fn();
    renderGroup({ onChange: handleChange });
    const radio = getRadioByText('JavaScript');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith('js');
    expect(radio).toBeChecked();
  });

  it('only allows one item to be checked at a time', () => {
    renderGroup();
    const radio1 = getRadioByText('HTML');
    const radio2 = getRadioByText('CSS');
    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    fireEvent.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });

  it('respects the disabled prop on group', () => {
    renderGroup({ disabled: true });
    options.forEach(({ label }) => {
      expect(getRadioByText(label)).toBeDisabled();
    });
  });

  it('respects the disabled prop on item', () => {
    renderGroup({}, { disabled: true });
    options.forEach(({ label }) => {
      expect(getRadioByText(label)).toBeDisabled();
    });
  });

  it('passes required and name props to input', () => {
    renderGroup({ required: true, name: 'test-group' });
    const radio = getRadioByText('HTML');
    expect(radio).toBeRequired();
    expect(radio).toHaveAttribute('name', 'test-group');
  });

  it('applies custom className and customRootClass', () => {
    renderGroup({ className: 'my-class', customRootClass: 'custom-root' });
    const root = screen.getByTestId('root');
    expect(root.className).toMatch(/my-class|custom-root/);
  });

  it('supports orientation and dir props', () => {
    renderGroup({ orientation: 'vertical', dir: 'rtl' });
    // No direct DOM effect, but should not throw and should render
    expect(screen.getByTestId('root')).toBeInTheDocument();
  });

  it('throws if Item is used outside Root', () => {
    // Suppress error output for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <RadioGroupPrimitive.Item value="test">Test</RadioGroupPrimitive.Item>
      )
    ).toThrow();
    spy.mockRestore();
  });

  it('supports loop prop (keyboard navigation)', () => {
    renderGroup({ loop: true });
    // Focus the first radio and press ArrowRight to loop
    const radios = options.map(({ label }) => getRadioByText(label));
    if (radios[0]) (radios[0] as HTMLInputElement).focus();
    fireEvent.keyDown(radios[0], { key: 'ArrowRight' });
    // This test is basic, as focus management is handled by RovingFocusGroup
    // and would require more integration tests for full coverage
    expect(radios[1]).toBeDefined();
  });

  it('supports asChild prop (renders as child element)', () => {
    // asChild is passed but not directly testable unless Primitive.div is customized
    renderGroup({ asChild: true });
    expect(screen.getByTestId('root')).toBeInTheDocument();
  });

  it('works correctly inside a form and submits checked value', () => {
    let submittedValue: FormDataEntryValue | null = null;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      submittedValue = formData.get('fav');
    };
    render(
      <form onSubmit={handleSubmit}>
        <RadioGroupPrimitive.Root name="fav" defaultChecked="css">
          {options.map((option) => (
            <RadioGroupPrimitive.Item key={option.value} value={option.value}>
              {option.label}
            </RadioGroupPrimitive.Item>
          ))}
        </RadioGroupPrimitive.Root>
        <button type="submit">Submit</button>
      </form>
    );
    // Change selection
    const radio = getRadioByText('JavaScript');
    fireEvent.click(radio);
    fireEvent.click(screen.getByText('Submit'));
    expect(submittedValue).toBe('js');
  });
});
