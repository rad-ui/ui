import React from 'react';
import ToolbarRoot from './fragments/ToolbarRoot';
import ToolbarButton from './fragments/ToolbarButton';
import ToolbarSeparator from './fragments/ToolbarSeparator';
import ToolbarLink from './fragments/ToolbarLink';

type ToolbarElement = React.ElementRef<'div'>;
type ToolbarProps = React.ComponentPropsWithoutRef<'div'>;

type ToolbarComponent = React.ForwardRefExoticComponent<ToolbarProps & React.RefAttributes<ToolbarElement>> & {
  Root: typeof ToolbarRoot;
  Button: typeof ToolbarButton;
  Separator: typeof ToolbarSeparator;
  Link: typeof ToolbarLink;
};

const Toolbar = React.forwardRef<ToolbarElement, ToolbarProps>((_props, _ref) => {
  console.warn('Direct usage of Toolbar is not supported. Please use Toolbar.Root, Toolbar.Button, etc. instead.');
  return null;
}) as ToolbarComponent;

Toolbar.displayName = 'Toolbar';

Toolbar.Root = ToolbarRoot;
Toolbar.Button = ToolbarButton;
Toolbar.Separator = ToolbarSeparator;
Toolbar.Link = ToolbarLink;

export default Toolbar;
