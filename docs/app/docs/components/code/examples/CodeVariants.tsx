import Code from '@radui/ui/Code';
import Text from "@radui/ui/Text";
import Separator from '@radui/ui/Separator';
import Tooltip from '@radui/ui/Tooltip';

const CodeVariants = () => {
  const codeVariants = ['soft', 'outline'];
  const codeStyleDescription = {
    soft: 'Soft code have a soft background color and a border.',
    outline: 'Outline code have a border and a background color.',
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {codeVariants.map((variant) => (
          <span key={variant}>
            <Code variant={variant} className="space-x-2">

                <Text>console.log('This is some code')</Text>
            </Code>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <Tooltip label={codeStyleDescription[variant]} placement="bottom">
              <Text className="text-gray-800 font-light inline-block cursor-help">
                {variant}
              </Text>
            </Tooltip>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CodeVariants;