import BgGradient from '@/components/common/bg-gradient'
import UploadFormPage from '@/components/upload/upload-form'
import UploadHeaderPage from '@/components/upload/upload-header'
import { hasReachedUploadLimit } from '@/lib/user'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  if(!user?.id) {
    redirect("/sign-in")
  }
  const userId = user.id
  const { hasReachedLimit } = await hasReachedUploadLimit(userId)

  if(hasReachedLimit) {
    redirect("/dashboard")
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <BgGradient />

      {/* Content Wrapper */}
      <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-6 py-4 sm:py-32 lg:px-8">
        <UploadHeaderPage />
        <UploadFormPage />
      </div>
    </section>
  )
}
