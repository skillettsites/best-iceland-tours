import Link from 'next/link';

export default function AffiliateDisclosure() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 mb-6">
      <p className="text-xs text-blue-700 leading-relaxed">
        This page contains affiliate links. If you book through our links, we earn a small commission at no extra cost to you.{' '}
        <Link href="/affiliate-disclosure" className="underline hover:text-blue-900 font-medium">
          Learn more
        </Link>
      </p>
    </div>
  );
}
