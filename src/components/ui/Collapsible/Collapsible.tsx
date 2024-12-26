import React, {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import CollapsibleComponent from ".";

/*
 * CHECKLIST
 *
 * Add rtl and ltr support
 * Support animations
 * Support basic poitioning of button
 * Add title to collapsible
 *
 * */

export type CollapsibleProps = {
  open?: boolean;
  title?: string;
  trigger?: ReactNode;
  
  disabled?: boolean;
  collapsibleContent?: ReactNode;


  onOpenChange?: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;

const Collapsible = ({ children, ...props }: CollapsibleProps) => {
  //State values if not provided by the user
  const [open, onOpenChange] = useState(props.open ?? false);

  
  // Disable or enable collapse
  const disabled = props.disabled ?? false;

  // Title for the component
  const title = props.title;

  // Collapsible Content
  const collapsibleContent = props.collapsibleContent;

  const DisabledContent = () => {
    return <>{children && children}
         {collapsibleContent && collapsibleContent}</>
  }
  return (
    <CollapsibleComponent.Root
      open={props.open ?? open}
      onOpenChange={props.onOpenChange ?? onOpenChange}
      disabled={disabled}
    >
      <CollapsibleComponent.Header title={title}>
        {/* Button */}
        
          <CollapsibleComponent.Trigger asChild>
            {props.trigger && props.trigger}
          </CollapsibleComponent.Trigger>
       
      </CollapsibleComponent.Header>

      {/* Conditonal Loop */}
      {disabled ? (
        // loops through all the items with no toggle
         <DisabledContent />
      )
      :
      (
        <>
          {/* Default Content */}
          {children && children}
          {/* Collapsable Content  */}
          <CollapsibleComponent.Content>
              {collapsibleContent && collapsibleContent}
          </CollapsibleComponent.Content>
        </>
      )}
    </CollapsibleComponent.Root>
  );
};



Collapsible.Root = CollapsibleComponent.Root;
Collapsible.Header = CollapsibleComponent.Header;
Collapsible.Trigger = CollapsibleComponent.Trigger;
Collapsible.Content = CollapsibleComponent.Content;
Collapsible.Item = CollapsibleComponent.Item;

export default Collapsible;
