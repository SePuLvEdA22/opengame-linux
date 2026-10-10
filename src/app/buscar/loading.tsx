export default function BuscarLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8" aria-busy="true" aria-label="Cargando resultados">
      <div className="h-7 w-64 rounded bg-surface-container animate-pulse" />
      <div className="h-4 w-40 rounded bg-surface-container animate-pulse mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="steel-card rounded-xl p-5 space-y-3">
            <div className="h-5 w-2/3 rounded bg-surface-container-high animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-surface-container-high animate-pulse" />
            <div className="h-16 rounded bg-background border border-outline animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
