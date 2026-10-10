export default function FichaLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8" aria-busy="true" aria-label="Cargando ficha del juego">
      <div className="h-4 w-40 rounded bg-surface-container animate-pulse" />
      <div className="h-9 w-80 max-w-full rounded bg-surface-container animate-pulse mt-2" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 steel-card rounded-lg p-5 space-y-3">
          <div className="h-5 w-48 rounded bg-surface-container-high animate-pulse" />
          <div className="h-20 rounded bg-background border border-outline animate-pulse" />
        </div>
        <div className="steel-card rounded-lg p-5 space-y-2">
          <div className="h-5 w-32 rounded bg-surface-container-high animate-pulse" />
          <div className="h-24 rounded bg-background border border-outline animate-pulse" />
        </div>
      </div>
    </main>
  );
}
