import React, { useState } from 'react';

interface TalentSearchProps {
  onSearch: (searchTerm: string) => void;
}

const TalentSearch: React.FC<TalentSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search talents by name or skills..."
          className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default TalentSearch;
