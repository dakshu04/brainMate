import BgGradient from '@/components/common/bg-gradient'
import UploadFormPage from '@/components/upload/upload-form'
import UploadHeaderPage from '@/components/upload/upload-header'

export default function Page() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <BgGradient />

      {/* Content Wrapper */}
      <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <UploadHeaderPage />
        <UploadFormPage />
      </div>
    </section>
  )
}
