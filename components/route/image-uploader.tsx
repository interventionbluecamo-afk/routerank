'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  initialUrl?: string;
}

export function ImageUploader({ onUploadComplete, initialUrl }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const { url } = await response.json();
      onUploadComplete(url);
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadComplete('');
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="proof-upload"
      />
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Proof preview"
            className="w-full rounded-xl border-2 border-gray-200 max-h-96 object-contain"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      ) : (
        <label
          htmlFor="proof-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="mb-2 text-sm font-medium text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            id="proof-upload"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*"
          />
        </label>
      )}

      {uploading && (
        <div className="text-center text-sm text-gray-600">Uploading...</div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">💡 Verification Required:</span> Upload a screenshot from your delivery app to prove your stats. This keeps leaderboards honest!
        </p>
      </div>
    </div>
  );
}


