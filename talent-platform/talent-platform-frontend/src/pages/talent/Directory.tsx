import React, { useState, useEffect } from 'react';
import TalentSearch, { TalentFilters } from '../../components/talent/TalentSearch';
import TalentList from '../../components/talent/TalentList';
import { Talent } from '../../types/Talent';

const TalentDirectory = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>([]);

  useEffect(() => {
    // Fetch talents from API or data source
    // This is a placeholder for actual data fetching logic
    fetchTalents().then(data => {
      setTalents(data);
      setFilteredTalents(data);
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

  const handleSearch = (filters: TalentFilters) => {
    const filtered = talents.filter(talent => {
      const matchesSearch = talent.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        talent.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesLevel = !filters.experienceLevel || 
        talent.skills.some(skill => skill.expertiseLevel === filters.experienceLevel);

      return matchesSearch && matchesLevel;
    });

    setFilteredTalents(filtered);
  };

  return (
    <div className="talent-directory">
      <h1>Find Talent</h1>
      <TalentSearch onSearch={handleSearch} />
      <TalentList talents={filteredTalents} />
    </div>
  );
};

export default TalentDirectory;