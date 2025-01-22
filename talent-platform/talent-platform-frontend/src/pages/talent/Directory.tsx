import React, { useState, useEffect } from 'react';
import TalentList from '../../components/talent/TalentList';
import TalentSearch from '../../components/talent/TalentSearch';
import { Talent } from '../../types/talent';

const Directory: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch talents from API or data source
    fetchTalents().then(data => {
      setTalents(data);
    });
  }, []);

  const fetchTalents = async (): Promise<Talent[]> => {
    // Replace with actual API call
    return [
      {
        id: '1',
        userId: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        skills: [{ name: 'React', yearsOfExperience: 3, expertiseLevel: 'Expert' }],
        description: 'Experienced React developer',
        profilePhoto: '/path/to/photo.jpg',
        status: 'approved',
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy data or fetch from a real API
    ];
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Talent Directory</h1>
      <TalentSearch onSearch={handleSearch} />
      <TalentList talents={talents} searchQuery={searchQuery} />
    </div>
  );
};

export default Directory;