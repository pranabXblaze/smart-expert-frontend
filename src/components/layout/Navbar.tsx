import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ModeToggle } from '@/components/theme-toggle';
import logo from '../../public/DRDO-logo.png';
import {Menubar, MenubarItem, MenubarContent, MenubarMenu,MenubarTrigger, MenubarSeparator} from '@/components/ui/menubar';
import { Users, UserPlus, Layout } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-secondary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} height={40} width={40} alt="logo of drdo" />
            <span className="font-semibold text-lg">DRDO Expert Match</span>
          </Link>

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <p className='bg-gray-200 dark:bg-black hover:text-blue-300'>Management</p>
                </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                <Link to="/experts" className="flex items-center space-x-2 hover:bg-accent p-2 rounded-md">
                        <Users className="h-4 w-4" />
                        <p>Expert Management</p>
                      </Link>
                </MenubarItem>
               <MenubarSeparator/>
                <MenubarItem>
                <Link to="/candidates" className="flex items-center space-x-2 hover:bg-accent p-2 rounded-md">
                        <UserPlus className="h-4 w-4" />
                        <p>Candidate Management</p>
                      </Link>
                </MenubarItem>
                <MenubarSeparator/>

                <MenubarItem>
                <Link to="/boards" className="flex items-center space-x-2 hover:bg-accent p-2 rounded-md">
                        <Layout className="h-4 w-4" />
                        <p>Board Management</p>
                      </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <p className='bg-gray-200 dark:bg-black hover:text-blue-300'>Matching System</p>
              </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                  <Link to="/matching" className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Matching System
                  </Link>
                  </MenubarItem>
                  <MenubarItem>
                  <Link to="/dashboard" className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Dashboard
                  </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
          </Menubar>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild variant={'link'}>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Register</Link>
            </Button>
             
          </div>
        </div>
      </div>
    </nav>
  );
}