'use client';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Copy, ExternalLink, Trash2 } from "lucide-react";

type LinkItem = {
  id: string;
  code: string;
  url: string;
  clicks: number;
  lastClicked?: string | null;
  createdAt: string;
};

export default function Page() {
  const [links, setLinks] = useState<LinkItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => { fetchLinks(); }, []);

  const fetchLinks = async () => {
    setLoading(true);
    const res = await fetch('/api/links');
    const data = await res.json();
    setLinks(data);
    setLoading(false);
  };

  const createLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);
    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, code: customCode || undefined }),
    });
    setCreating(false);
    if (!res.ok) {
      const err = await res.json();
      setError(err?.error || 'Something went wrong');
      return;
    }
    setUrl(''); setCustomCode('');
    await fetchLinks();
  };


  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* FORM */}
      <form onSubmit={createLink}
        className="bg-white p-4 md:p-6 shadow rounded space-y-4 max-w-2xl mx-auto w-full">

        <div>
          <label className="block text-sm font-medium">Target URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            placeholder="https://example.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Custom code</label>
          <input
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            placeholder="6-8 chars A-Za-z0-9"
          />
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div>
          <button
            disabled={creating}
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded w-full md:w-auto"
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>

      {/* LIST */}
      <div className="bg-white p-4 md:p-6 shadow rounded w-full max-w-4xl mx-auto">
        <h2 className="text-lg font-medium mb-4">Links</h2>

        {loading && <div>Loading...</div>}
        {!loading && links?.length === 0 && <div>No links yet</div>}

        {!loading && links?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 whitespace-nowrap">Code</th>
                  <th className="py-2 whitespace-nowrap">Target</th>
                  <th className="py-2 whitespace-nowrap">Clicks</th>
                  <th className="py-2 whitespace-nowrap">Last clicked</th>
                  <th className="py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>

              <tbody>
                {links.map(l => (
                  <tr key={l.id} className="border-b">
                    <td className="py-3 pr-3">
                      <Link href={`/code/${l.code}`} className="text-blue-600 underline">
                        {l.code}
                      </Link>
                    </td>

                    <td className="py-3 pr-3 max-w-xs md:max-w-md truncate">
                      {l.url}
                    </td>

                    <td className="py-3 pr-3">{l.clicks}</td>

                    <td className="py-3 pr-3">
                      {l.lastClicked
                        ? formatDistanceToNow(new Date(l.lastClicked)) + " ago"
                        : "—"}
                    </td>

                    <td className="py-3 flex items-center gap-3">
                      <button
                        onClick={() => { }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Copy size={18} />
                      </button>

                      <a
                        href={`/${l.code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <ExternalLink size={18} />
                      </a>

                      <button
                        onClick={() => { }}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
