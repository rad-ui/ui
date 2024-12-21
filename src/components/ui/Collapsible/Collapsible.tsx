import React, {
    Dispatch,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import CollapsibleContent from "./fragments/CollapsibleContent";
import CollapsibleItem from "./fragments/CollapsibleItem";
import CollapsibleRoot from "./fragments/CollapsibleRoot";
import CollapsibleTrigger from "./fragments/CollapsibleTrigger";

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
  items: { content: any }[];
  disabled?: boolean;
  defaultOpen?: { content: any };
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;

const Collapsible = ({ children, items, ...props }: CollapsibleProps) => {
  //State values if not provided by the user
  const [open, setOpen] = useState(props.open ?? false);

  // Disable or enable collapse
  const disabled = props.disabled;

  // Title for the component
  const title = props.title;

  // Default Value to show
  const defaultOpen = props.defaultOpen;

  return (
    <CollapsibleRoot
      open={props.open ?? open}
      onOpenChange={props.onOpenChange ?? setOpen}
    >
      <span
        style={{
          display: "flex",
          padding: "8px",
          width: "full",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        {title && <p>{title}</p>}

        {/* Button */}
        {!disabled && (
          <CollapsibleTrigger>
            {props.trigger && props.trigger}
          </CollapsibleTrigger>
        )}
      </span>

      {/* Conditonal Loop */}
      {disabled ? (
        // loops through all the items with no conditions
        items.map((item) => <CollapsibleItem>{item.content}</CollapsibleItem>)
      ) : (
        <>
          {/* Default value to be shown */}
          {defaultOpen && (
            <CollapsibleItem>{defaultOpen.content}</CollapsibleItem>
          )}
          {/* Collapsable Content  */}
          <CollapsibleContent state={props.open ?? open}>
            {items.map((item) => (
              <>
                {item != defaultOpen && (
                  <CollapsibleItem>{item.content}</CollapsibleItem>
                )}
              </>
            ))}
          </CollapsibleContent>
        </>
      )}
    </CollapsibleRoot>
  );
};

export default Collapsible;
