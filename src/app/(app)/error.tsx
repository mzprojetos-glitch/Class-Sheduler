'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="p-6 text-center">
      <p className="mb-3 font-semibold">Algo deu errado / Something went wrong.</p>
      <button className="btn" onClick={reset}>Tentar novamente / Retry</button>
    </div>
  );
}
