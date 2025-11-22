'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CodePage() {
  const params = useParams();
  const code = params.code;
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/links/${code}`);

      if (!res.ok) {
        setLink(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setLink(data);
      setLoading(false);
    })();
  }, [code]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!link) return <div className="text-center py-10 text-red-600">Not found</div>;

  return (
    <div className="px-4 md:px-0 flex justify-center mt-6">
      <div className="bg-white p-6 shadow rounded w-full max-w-2xl">
        <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
          Stats for {link.code}
        </h2>

        <div className="mt-6 space-y-4 text-sm md:text-base">
          <div className="break-words">
            <strong>Target URL:</strong> <span className="text-blue-700">{link.url}</span>
          </div>

          <div>
            <strong>Total clicks:</strong> {link.clicks}
          </div>

          <div>
            <strong>Last clicked:</strong>{' '}
            {link.lastClicked ? new Date(link.lastClicked).toString() : '—'}
          </div>

          <div>
            <strong>Created:</strong> {new Date(link.createdAt).toString()}
          </div>
        </div>
      </div>
    </div>
  );
}
