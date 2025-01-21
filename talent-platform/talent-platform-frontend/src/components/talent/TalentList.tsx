import React from 'react';
import { Talent } from '../../types/talent';

interface TalentListProps {
  talents: Talent[]; // Define the type for the talents prop
}

const TalentList: React.FC<TalentListProps> = ({ talents }) => {
  return (
    <div>
      {talents.map(talent => (
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
