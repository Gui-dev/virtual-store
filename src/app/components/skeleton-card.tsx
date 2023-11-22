import clsx from 'clsx'

type SkeletonCardProps = {
  isLoading: boolean
}

export const SkeletonCard = ({ isLoading }: SkeletonCardProps) => {
  return (
    <div
      className={clsx('flex h-96 flex-col bg-slate-800 p-5 shadow-lg', {
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
          isLoading,
      })}
    >
      <div className="relative max-h-72 flex-1 bg-zinc-700" />
      <div className="my-3 flex justify-between bg-zinc-700 font-bold" />
      <div className="h-3 w-8/12 rounded-md bg-zinc-700" />
    </div>
  )
}
