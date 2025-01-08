import Code from "@radui/ui/Code";
import Copy from "@/components/Copy";
import Tooltip from "@radui/ui/Tooltip";

const CodeWithCopy = ({ code }) => {
  const copyContent = code
    .replace(/\n{2,}/g, "\n") // Replace multiple newlines with single newline
    .trim();

  return (
    <Code>
      <span className="flex items-center relative min-h-[2.06rem]">
        <span
          className={`whitespace-pre-wrap mr-10`}
          style={{ wordBreak: "break-word" }}
        >
          {code}
        </span>
        <Tooltip
          label="Copy"
          placement="bottom"
          className="absolute top-0 right-0"
        >
          <Copy content={copyContent} />
        </Tooltip>
      </span>
    </Code>
  );
};

export default CodeWithCopy;
