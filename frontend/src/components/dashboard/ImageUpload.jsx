import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, CheckCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export function ImageUpload({ onImageUpdate }) {
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.');
      return;
    }

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update the user context with new image
        if (onImageUpdate) {
          onImageUpdate(result.image);
        }
        setSuccess('Image uploaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <Avatar className="h-20 w-20 border-4 border-white shadow-md cursor-pointer transition-transform group-hover:scale-105">
        <AvatarImage 
          src={user?.image ? `http://localhost:5000/${user.image}` : undefined} 
          alt="User Profile" 
        />
        <AvatarFallback>{getInitials(user?.name || user?.email)}</AvatarFallback>
      </Avatar>
      
      <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? (
          <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
        ) : success ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <Camera className="h-4 w-4 text-gray-600" />
        )}
      </label>
      
      {error && (
        <div className="absolute top-full left-0 mt-2 bg-red-100 border border-red-200 text-red-800 px-3 py-2 rounded text-sm max-w-xs z-10">
          {error}
        </div>
      )}
      
      {success && (
        <div className="absolute top-full left-0 mt-2 bg-green-100 border border-green-200 text-green-800 px-3 py-2 rounded text-sm max-w-xs z-10">
          {success}
        </div>
      )}
    </div>
  );
}