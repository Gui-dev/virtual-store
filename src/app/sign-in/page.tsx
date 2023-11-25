import { SignIn } from '@clerk/nextjs'

interface ISignInPage {
  searchParams: {
    redirect_url: string
  }
}

const SignInPage = ({ searchParams: { redirect_url } }: ISignInPage) => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignIn signUpUrl="/sign-up" redirectUrl={redirect_url} />
        </div>
      </div>
    </section>
  )
}

export default SignInPage
