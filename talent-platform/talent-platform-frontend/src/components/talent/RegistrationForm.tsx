import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerTalent as registerTalentApi } from '@/services/talentService';
import { toast } from 'react-toastify';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string;
  description?: string;
  profilePhoto?: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [''],
    description: '',
    profilePhoto: null as File | null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  // Validation functions
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (formData.skills.length === 0 || !formData.skills[0]) {
      newErrors.skills = 'At least one skill is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.profilePhoto) {
      newErrors.profilePhoto = 'Profile photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size should be less than 5MB'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'Please upload an image file'
        }));
        return;
      }

      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profilePhoto: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();

    try {
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'skills') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key === 'profilePhoto' && value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value ?? ''));
        }
      });

  await registerTalentApi(formDataToSend);

      toast.success('Registration successful! Awaiting admin approval.');
      navigate('/registration-success');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Talent Registration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Skills Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Skills *</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.skills];
                  newSkills[index] = e.target.value;
                  setFormData(prev => ({ ...prev, skills: newSkills }));
                }}
                className={`flex-1 p-2 border rounded ${errors.skills ? 'border-red-500' : 'border-gray-300'}`}
                disabled={loading}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const newSkills = formData.skills.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, skills: newSkills }));
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  disabled={loading}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }))}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            disabled={loading}
          >
            Add Skill
          </button>
          {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Professional Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Profile Photo *</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={loading}
          />
          <div className="mt-2 flex items-center gap-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {photoPreview ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>
          {errors.profilePhoto && <p className="text-red-500 text-sm mt-1">{errors.profilePhoto}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded text-white font-medium
            ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;