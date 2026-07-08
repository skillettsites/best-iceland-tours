"use client";
import { useState, useEffect } from "react";

export function StickyBookingBar({ tourName, affiliateUrl, price }: { tourName: string; affiliateUrl: string; price?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 hidden lg:block bg-white border-t border-gray-200 shadow-2xl print:hidden">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-4 min-w-0">
          <div className="min-w-0">
            <p className="font-bold text-sm text-gray-900 truncate">{tourName}</p>
            <div className="flex items-center gap-3 mt-0.5">
              {price && (
                <span className="text-base font-bold text-green-700">From {price}</span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Popular tour, limited availability
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Free cancellation
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm transition-colors whitespace-nowrap shadow-lg hover:shadow-xl"
            >
              Check Availability and Book
            </a>
            <span className="text-[10px] text-green-700 font-medium">Instant confirmation, best price guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
