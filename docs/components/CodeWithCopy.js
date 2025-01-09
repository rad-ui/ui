import Code from "@radui/ui/Code";
import Copy from "@/components/Copy";
import Tooltip from "@radui/ui/Tooltip";

const CodeWithCopy = ({ code }) => {
  return (
    <Code>
       <span  className="flex items-center">
            <span className="mr-2">
                {code}
            </span>
            <Tooltip label="Copy" placement="bottom">      
              <Copy content={code} />
            </Tooltip>
        </span>
    </Code>
  );
};

export default CodeWithCopy;
