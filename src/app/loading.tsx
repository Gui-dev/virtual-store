import { SkeletonCard } from './components/skeleton-card'

const Loading = () => {
  return (
    <div className="mx-auto max-w-7xl px-8 py-8 xl:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
        <SkeletonCard isLoading />
      </div>
    </div>
  )
}

export default Loading
