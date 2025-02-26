import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { prisma } from '@/utils/db'

const CustomUserButton = async () => {
  const user = await currentUser()
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id as string,
    },
  })
  const getInitals = (name: string) => {
    const nameArray = name.split(' ')
    return nameArray[0].charAt(0) + nameArray[1].charAt(0)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative size-[35px] "
        >
          <Avatar className="size-[35px]">
            <AvatarImage
              src={dbUser?.imageUrl ?? undefined}
              alt="dbUserImage"
            />

            <AvatarFallback>{getInitals(dbUser?.name ?? '')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1 p-3">
          <p className="text-sm font-medium leading-none">
            {dbUser?.name ? `${dbUser?.name}` : ''}
          </p>
          <p className="text-[10px] leading-none text-muted-foreground">
            {dbUser?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/dashboard/profile"
            className="text-sm font-medium leading-none p-1"
          >
            {dbUser?.name ? `${dbUser?.name}'s Profile` : 'Profile'}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton>
            <div className="w-full">Logout</div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomUserButton
