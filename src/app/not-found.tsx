import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">This page could not be found.</p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-blue-900 px-6 py-3 text-base font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/tours"
          className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse Tours
        </Link>
      </div>
    </div>
  );
}
