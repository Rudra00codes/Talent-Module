import React from 'react';
import { Talent } from '../../types/talent';

interface TalentListProps {
  talents: Talent[]; // Define the type for the talents prop
  searchQuery: string; // Added this line
}

const TalentList: React.FC<TalentListProps> = ({ talents, searchQuery }) => {
  // Filter talents based on searchQuery
  const filteredTalents = talents.filter(talent =>
    talent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredTalents.map(talent => (
        <div key={talent.id}>
          <h2>{talent.name}</h2>
          <p>{talent.email}</p>
          {/* Render other talent details as needed */}
        </div>
      ))}
    </div>
  );
};

export default TalentList;
