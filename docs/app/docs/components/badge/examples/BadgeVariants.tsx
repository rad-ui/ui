import Text from '@radui/ui/Text';
import Separator from '@radui/ui/Separator';
import Tooltip from '@radui/ui/Tooltip';
import Badge from '@radui/ui/Badge';

const Arrow = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const BadgeVariants = () => {
  const badgeVariants = ['soft', 'outline'];
  const badgestyleDescription = {
    soft: 'Soft badge have a soft background color and a border.',
    outline: 'Outline badge have a border and a background color.',
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {badgeVariants.map((variant) => (
          <span key={variant}>
            <Badge variant={variant} className="space-x-2">
              <span >badge</span>
            </Badge>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <Tooltip label={badgestyleDescription[variant]} placement="bottom">
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

export default BadgeVariants;