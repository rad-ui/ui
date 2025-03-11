import Card from '@radui/ui/Card';
import Text from "@radui/ui/Text";
import Separator from '@radui/ui/Separator';
import Tooltip from '@radui/ui/Tooltip';
import Avatar from '@radui/ui/Avatar';

const CardVariants = () => {
  const cardVariants = ['soft', 'outline'];
  const cardStyleDescription = {
    soft: 'Soft card have a soft background color and a border.',
    outline: 'Outline card have a border and a background color.',
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {cardVariants.map((variant) => (
          <span key={variant}>
            <Card variant={variant} className="bg-gray-50 text-gray-950 flex items-center space-x-2">
                <Avatar fallback="PP" />
                    <div className="flex flex-col">
                        <span className="font-medium">Peter Parker</span>
                        <span className="text-xs text-gray-800">Biochemist</span>
                    </div>
            </Card>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <Tooltip label={cardStyleDescription[variant]} placement="bottom">
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

export default CardVariants;