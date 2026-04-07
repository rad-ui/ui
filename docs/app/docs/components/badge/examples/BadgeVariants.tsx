import Text from '@radui/ui/Text';
import Separator from '@radui/ui/Separator';

import Badge from '@radui/ui/Badge';

import TooltipWrapper from '@/components/ui/Tooltip';

const BadgeVariants = () => {
  const badgeVariants = ['solid', 'soft', 'surface', 'outline', 'ghost'] as const;
  type BadgeVariant = typeof badgeVariants[number];
  const badgestyleDescription: Record<BadgeVariant, string> = {
    solid: 'Solid badge uses the strongest fill for high-emphasis status.',
    soft: 'Soft badge uses a muted fill with no visible border.',
    surface: 'Surface badge sits on a panel with a subtle stroke and shadow.',
    outline: 'Outline badge keeps the fill transparent and emphasizes the border.',
    ghost: 'Ghost badge removes both fill and border for the lightest treatment.',
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {badgeVariants.map((variant) => (
          <span key={variant}>
            <Badge variant={variant} className="space-x-2">
              <span>badge</span>
            </Badge>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <TooltipWrapper label={badgestyleDescription[variant]} placement="bottom">
              <Text className="text-gray-800 font-light inline-block cursor-help">
                {variant}
              </Text>
            </TooltipWrapper>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BadgeVariants;
