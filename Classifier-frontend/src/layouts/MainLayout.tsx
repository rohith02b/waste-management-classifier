import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChangeTheme from '@/components/changeTheme';

export default async function LandingLayout({ children, btnText }: any) {
  return (
    <div className='px-6 md:max-w-6xl mx-auto min-h-screen'>
      <nav className='my-6  flex flex-col gap-6 md:flex-row md:gap-0 justify-center md:justify-between'>
        <p className='text-xl text-center'>WASTE CLASSIFIER</p>
        <div className='flex gap-6 justify-center'>
          {btnText === 'Go back' ? (
            <Link href={'/'}>
              <Button>Go Back</Button>
            </Link>
          ) : (
            <Link href={'/dashboard'}>
              <Button>Get started</Button>
            </Link>
          )}
        </div>
      </nav>
      <div>{children}</div>
      <footer>
        <div className='flex flex-col md:flex-row md:justify-between justify-center mb-6'>
          <p className='text-center'>
            &copy; {new Date().getFullYear()} WASTE CLASSIFIER. All Rights
            Reserved.
          </p>
          <ChangeTheme />
        </div>
      </footer>
    </div>
  );
}
