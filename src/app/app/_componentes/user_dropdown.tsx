import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { LogOut, User, UserRoundPlus } from "lucide-react";
import { signOut } from "next-auth/react";

import { ChevronDown, ChevronUp, CircleUserRound } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/services/auth";

type PropsUserDropdown = {
    avatarAberto: boolean;
    clickAvatar: () => void;
}

export default async function UserDropdown({ clickAvatar, avatarAberto }: PropsUserDropdown) {
    const session = await auth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='hover:bg-slate-300'
                    onClick={clickAvatar}
                    size="sm" variant="ghost">
                    <div className='grid grid-cols-2 justify-items-end'>
                        <Avatar>
                            {session?.user?.image && (<AvatarImage src={session?.user?.image} alt="@shadcn" />)}
                            <AvatarFallback> <CircleUserRound size={24} /></AvatarFallback>
                        </Avatar>
                        {avatarAberto ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>{session?.user?.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UserRoundPlus className="mr-2 h-4 w-4" />
                        <span>Cadastrar Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}