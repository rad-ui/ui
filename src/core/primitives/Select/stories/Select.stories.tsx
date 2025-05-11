import React from 'react';
import { Meta } from '@storybook/react';
import Select from '../Select';
import { SelectContext } from '../contexts/SelectContext';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
  title: 'Primitives/Select',
  component: Select,
} as Meta;

export const BasicSelect = () => {

  
  return (
    <SandboxEditor>
    <div>
      <Select.Root>
   
          <Select.Trigger>
            helo
          </Select.Trigger>
          
              <Select.Content>
                  <Select.Item value='option1'>Option 1</Select.Item>
                  <Select.Item value='option2'>Option 2</Select.Item>
                
                  <Select.Item value='option3'>Option 3</Select.Item>
              </Select.Content>
            
          
        
      </Select.Root>
    </div>
    </SandboxEditor>
  );
};
