import { UserSettings } from '@renderer/lib/user-settings';
import { TooltipProvider } from '../ui/tooltip';
import { ReactNode } from 'react';

interface TooltipProviderOutlineProps {
  children: ReactNode;
}

export default function TooltipProviderOutline({ children }: TooltipProviderOutlineProps): React.JSX.Element {
  return <TooltipProvider delayDuration={UserSettings.getUserSettings().textDisplayDelay * 1000}>{children}</TooltipProvider>;
}
