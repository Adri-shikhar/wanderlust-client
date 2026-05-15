const ACCENT = "#33A1C9";

function Spinner() {
  return (
    <div className="relative size-12" role="status" aria-label="Loading">
      <div
        className="absolute inset-0 rounded-full border-4 border-[#33A1C9]/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#33A1C9]"
        style={{ borderTopColor: ACCENT }}
        aria-hidden
      />
    </div>
  );
}

function Skeleton({ className = "" }) {
  return <div className={`skeleton-shimmer rounded-xl ${className}`} aria-hidden />;
}

export default function LoadingPage({ variant = "default" }) {
  if (variant === "grid") {
    return (
      <div className="min-h-[60vh] px-4 pb-16 pt-10 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl animate-fade-in">
          <Skeleton className="mb-3 h-4 w-28" />
          <Skeleton className="mb-2 h-10 w-80 max-w-full" />
          <Skeleton className="mb-10 h-5 w-96 max-w-full" />
          <Skeleton className="mb-8 h-4 w-36" />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n}>
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                <Skeleton className="mt-4 h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="min-h-screen animate-fade-in pb-16">
        <Skeleton className="h-14 w-full rounded-none" />
        <Skeleton className="aspect-[21/9] min-h-[200px] w-full rounded-none sm:mx-6 sm:mt-2 sm:rounded-b-xl lg:mx-8" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-80 w-full rounded-2xl lg:sticky lg:top-24" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "auth") {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
        <div className="animate-fade-in text-center">
          <div className="mb-6 flex justify-center">
            <Spinner />
          </div>
          <Skeleton className="mx-auto mb-3 h-8 w-48" />
          <Skeleton className="mx-auto mb-8 h-4 w-64" />
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="animate-fade-in flex flex-col items-center text-center">
        <Spinner />
        <p
          className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ color: ACCENT }}
        >
          Wanderlust
        </p>
        <p className="mt-2 text-base text-gray-500">Loading your experience…</p>
        <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="mx-auto h-3 w-4/5" />
          <Skeleton className="mx-auto h-3 w-3/5" />
        </div>
      </div>
    </main>
  );
}
