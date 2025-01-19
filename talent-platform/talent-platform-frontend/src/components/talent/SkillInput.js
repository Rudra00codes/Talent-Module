import React from 'react';

const SkillInput = ({ skills, setSkills }) => {
  const addSkill = () => {
    setSkills([...skills, { name: '', yearsOfExperience: '' }]);
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const updateSkill = (index, field, value) => {
    const newSkills = skills.map((skill, i) => {
      if (i === index) {
        return { ...skill, [field]: value };
      }
      return skill;
    });
    setSkills(newSkills);
  };

  return (
    <div className="skills-section">
      <label>Skills *</label>
      {skills.map((skill, index) => (
        <div key={index} className="skill-input-group">
          <input
            type="text"
            placeholder="Skill name"
            value={skill.name}
            onChange={(e) => updateSkill(index, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Years of experience"
            value={skill.yearsOfExperience}
            onChange={(e) => updateSkill(index, 'yearsOfExperience', e.target.value)}
            required
            min="0"
            max="50"
          />
          {skills.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeSkill(index)}
              className="remove-skill"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button 
        type="button" 
        onClick={addSkill}
        className="add-skill"
      >
        Add Skill
      </button>
    </div>
  );
};

export default SkillInput;