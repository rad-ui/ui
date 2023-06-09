import * as Tooltip from '@radix-ui/react-tooltip';


const TooltipDemo = () => {
    const DELAY=500
  return (
    <Tooltip.Provider delayDuration={DELAY} >
      <Tooltip.Root>
        <Tooltip.Trigger asChild delayDuration={DELAY}>
          <button className="IconButton">
            icon here
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            Add to library
            <Tooltip.Arrow style={{fill:"red"}} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;
