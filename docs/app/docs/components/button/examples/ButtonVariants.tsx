import Text from '@radui/ui/Text';
import Separator from '@radui/ui/Separator';
import { ArrowRight } from 'lucide-react';

import Button from '@radui/ui/Button';

import TooltipWrapper from '@/components/ui/Tooltip';

const ButtonVariants = () => {
  const buttonVariants = ['solid', 'soft', 'outline', 'ghost'];
  const buttonStyleDescription = {
    solid: 'Solid buttons are the most common type of button. They have a solid background color and a border.',
    soft: 'Soft buttons have a soft background color and a border.',
    outline: 'Outline buttons have a border and a background color.',
    ghost: 'Ghost buttons have a border and a background color.',
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {buttonVariants.map((variant) => (
          <span key={variant}>
            <Button variant={variant} className="space-x-2">
              <span >Button</span>
              <ArrowRight size={15} strokeWidth={2} />
            </Button>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <TooltipWrapper label={buttonStyleDescription[variant]} placement="bottom">
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

export default ButtonVariants;
