import { buttonVariants } from '@renderer/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@renderer/components/ui/dropdown-menu';
import ButtonLink from '@renderer/components/user/button-link';

export default function MenuButton(): React.JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger type="button" className={buttonVariants()}>
        Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="w-full">
          <ButtonLink linkHref="/" className="w-full">
            Return
          </ButtonLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
