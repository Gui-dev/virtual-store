import { SignUp } from '@clerk/nextjs'

interface ISignUpPage {
  searchParams: {
    redirect_url: string
  }
}

const SignUpPage = ({ searchParams: { redirect_url } }: ISignUpPage) => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignUp signInUrl="/sign-in" redirectUrl={redirect_url} />
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
