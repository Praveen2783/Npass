import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex justify-center relative top-48  '>

    <SignIn />
  </div>
}