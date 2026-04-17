import Code from "@radui/ui/Code";
import Copy from "@/components/Copy";

import TooltipWrapper from "@/components/ui/Tooltip";

const CodeWithCopy = ({ code }) => {
  return (
    <Code>
       <span className="flex items-center">
            <span className="mr-2">
                {code}
            </span>
            <TooltipWrapper label="Copy" placement="bottom">
              <Copy content={code} />
            </TooltipWrapper>
        </span>
    </Code>
  );
};

export default CodeWithCopy;
