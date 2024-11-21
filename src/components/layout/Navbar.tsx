import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton} from '@clerk/clerk-react';
import { ModeToggle } from '@/components/theme-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Users, UserPlus, Layout, ClipboardList } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-secondary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ClipboardList className="h-6 w-6" />
            <span className="font-semibold text-lg">DRDO Expert Match</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Management</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link to="/experts" className="flex items-center space-x-2 hover:bg-accent p-2 rounded-md">
                        <Users className="h-4 w-4" />
                        <span>Expert Management</span>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/candidates" className="flex items-center space-x-2 hover:bg-accent p-2 rounded-md">
                        <UserPlus className="h-4 w-4" />
                        <span>Candidate Management</span>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/boards" className="flex items-center space-x-2 hover:bg-accent p-2 rounded-md">
                        <Layout className="h-4 w-4" />
                        <span>Board Management</span>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/matching" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Matching System
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {/* <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            */}
              {/* <header className='flex items-center space-x-4'>
      <SignedOut>
        <SignInButton >
          <Button variant={'outline'} >
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button variant={'outline'} className='bg-[#646cff]'>
          Register
          </Button>
          </SignUpButton>   
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
            </header> */}
          </div>
        </div>
      </div>
    </nav>
  );
}