"use client"

import React, {ChangeEvent, FormEvent, useState} from 'react';

const Home: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const textToGitHubLink = (text: string): string => {
    return text.replace(/[^a-zA-Z0-9 -&]/g, "")
        .replace(/&/g, "-")
        .replace(/\s+/g, "-")
        .toLowerCase();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLink(textToGitHubLink(input));
  };

  const handleClear = () => {
    setInput('');
    setLink('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded shadow-md">
          <div className="mb-4">
            <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Enter text"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base sm:text-lg"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base sm:text-lg flex-grow">
              Convert
            </button>
            <button type="button" onClick={handleClear} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-base sm:text-lg">
              Clear
            </button>
            {link && (
                <button type="button" onClick={handleCopy} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-base sm:text-lg">
                  Copy
                </button>
            )}
          </div>
        </form>
        {link && <p className="mt-4 text-lg sm:text-xl font-semibold">GitHub Link: <span className="text-blue-500">{link}</span></p>}
      </div>
  );
}

export default Home;
