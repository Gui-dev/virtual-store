import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

// import { useCartStore } from '@/hooks/store'

export const Header = () => {
  // const store = useCartStore()

  return (
    <nav className="flex w-full items-center justify-between bg-slate-800 px-8 py-2 text-gray-300">
      <Link
        href="/"
        className="text-md flex h-12 items-center font-bold uppercase"
      >
        Virtual Store
      </Link>
      <div className="flex items-center gap-8">
        <div className="relative flex items-center">
          <button type="button">
            <ShoppingBasket className="h-5 w-5" />
          </button>
          <span className="absolute bottom-3 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-sm font-bold">
            2
          </span>
        </div>
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
