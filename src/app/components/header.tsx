import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import { Cart } from './cart'

export const Header = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-slate-800 px-8 py-2 text-gray-300">
      <Link
        href="/"
        className="text-md flex h-12 items-center font-bold uppercase"
      >
        Virtual Store
      </Link>
      <div className="flex items-center gap-8">
        <Cart />
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-md flex items-center rounded-sm border border-gray-400 px-3 py-2">
                Fazer Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
