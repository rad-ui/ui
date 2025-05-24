import React from 'react';
import { Meta } from '@storybook/react';
import SelectPrimitive from '../Select';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
  title: 'Primitives/SelectPrimitive',
  component: SelectPrimitive,
} as Meta;

export const BasicSelect = ({onClickOutside}:any) => {
  const handleOverlayClick = () => {
        onClickOutside();
    };
  
  return (
    <SandboxEditor>
    <div>
      <SelectPrimitive.Root>
   
          <SelectPrimitive.Trigger>
            helo
          </SelectPrimitive.Trigger>
     <SelectPrimitive.Overlay />
              <SelectPrimitive.Content>
                  <SelectPrimitive.Item value='option1'>Option 1</SelectPrimitive.Item>
                  <SelectPrimitive.Item value='option2'disabled >Option 2</SelectPrimitive.Item>
                
                  <SelectPrimitive.Item value='option3'>Option 3</SelectPrimitive.Item>
              </SelectPrimitive.Content>
            
          
        
      </SelectPrimitive.Root>
    </div>
    </SandboxEditor>
  );
};


export const ControlledExample = () => {
  const [value, setValue] = React.useState('option1');

  return (
    <SandboxEditor>
    <SelectPrimitive.Root value={value} onValueChange={setValue}>
   
          <SelectPrimitive.Trigger>
            helo
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Overlay />
              <SelectPrimitive.Content>
                  <SelectPrimitive.Item value='option1'>Option 1</SelectPrimitive.Item>
                  <SelectPrimitive.Item value='option2'>Option 2</SelectPrimitive.Item>
                
                  <SelectPrimitive.Item value='option3'>Option 3</SelectPrimitive.Item>
              </SelectPrimitive.Content>
            
          
        
      </SelectPrimitive.Root>

      <div className='mt-4'>
        Selected value {value}
      </div>
      </SandboxEditor>
  )
} 
