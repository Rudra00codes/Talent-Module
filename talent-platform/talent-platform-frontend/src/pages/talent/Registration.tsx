import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Pattern from '../../components/Pattern'; // Adjust the path as necessary
import Button from '../../components/common/Button/Button'; // Adjust the path as necessary

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: File | null;
  skills: string[];
  experience: string;
  education: string;
  bio: string;
  linkedinUrl: string;
  portfolioUrl: string;
  location: string;
  availability: string;
  expectedRate: string;
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #000;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: #fff;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "SF Pro";
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "SF Pro";
  resize: none;
`;

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photo: null,
    skills: [],
    experience: '',
    education: '',
    bio: '',
    linkedinUrl: '',
    portfolioUrl: '',
    location: '',
    availability: '',
    expectedRate: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/talents/register', {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        skills: formData.skills,
        experience: formData.experience,
        education: formData.education,
        bio: formData.bio,
        linkedinUrl: formData.linkedinUrl,
        portfolioUrl: formData.portfolioUrl,
        location: formData.location,
        availability: formData.availability,
        expectedRate: formData.expectedRate
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering talent:', error);
    }
  };

  return (
    <Pattern>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex">
        <div className="w-1/2 max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-black relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl -top-10 -left-10"></div>
            <div className="absolute w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl -bottom-10 -right-10"></div>
          </div>
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900">Join Our Talent Pool</h2>
            <p className="mt-2 text-gray-600">Showcase your skills to potential clients</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Profile Photo Upload */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-violet-500">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-violet-500 rounded-full p-2 cursor-pointer hover:bg-violet-600">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <InputWrapper>
              <FaUser style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First Name..."
                required
              />
            </InputWrapper>

            <InputWrapper>
              <FaUser style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last Name..."
                required
              />
            </InputWrapper>

            {/* Contact Information */}
            <InputWrapper>
              <FaEnvelope style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email..."
                required
              />
            </InputWrapper>

            <InputWrapper>
              <FaPhone style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number..."
              />
            </InputWrapper>

            {/* Location */}
            <InputWrapper>
              <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Location..."
              />
            </InputWrapper>

            {/* Professional Links */}
            <InputWrapper>
              <FaLinkedin style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="LinkedIn Profile URL..."
              />
            </InputWrapper>

            <InputWrapper>
              <FaGlobe style={{ marginRight: '0.5rem' }} />
              <StyledInput
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="Portfolio URL..."
              />
            </InputWrapper>

            {/* Skills Section */}
            <InputWrapper>
              <StyledInput
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add skills..."
              />
            </InputWrapper>

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <div key={skill} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                  <span>{skill}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeSkill(skill)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Experience */}
            <InputWrapper>
              <StyledTextarea
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                rows={3}
                placeholder="Tell us about your experience..."
              />
            </InputWrapper>

            {/* Education */}
            <InputWrapper>
              <StyledTextarea
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                rows={2}
                placeholder="Your educational background..."
              />
            </InputWrapper>

            {/* Bio */}
            <InputWrapper>
              <StyledTextarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </InputWrapper>

            {/* Availability and Rate */}
            <div className="grid grid-cols-2 gap-4">
              <InputWrapper>
                <StyledInput
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="Availability..."
                />
              </InputWrapper>

              <InputWrapper>
                <StyledInput
                  type="text"
                  value={formData.expectedRate}
                  onChange={(e) => setFormData({ ...formData, expectedRate: e.target.value })}
                  placeholder="Expected Rate ($/hr)..."
                />
              </InputWrapper>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button />
            </div>
          </form>
        </div>

        {/* Spline 3D Design */}
        <div className="w-1/2 flex items-center justify-center">
          <iframe src="https://my.spline.design/your-spline-design-url" frameBorder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
    </Pattern>
  );
};

export default Registration;
