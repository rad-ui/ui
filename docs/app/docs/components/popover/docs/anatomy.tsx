import Popover from "@radui/ui/Popover";

export default () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        {/* Your trigger element */}
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        {/* Your popover content */}
      </Popover.Content>
    </Popover.Root>
  );
};
