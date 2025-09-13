'use client';

import { useState, useRef } from 'react';
import { uploadImageAction, type UploadResult } from '@/actions/uploadImageAction';

const FOLDERS = [
  { value: 'foods-and-drinks', label: 'Foods & Drinks' },
  { value: 'insides', label: 'Insides' },
  { value: 'destinations', label: 'Landscape & Wildlife' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'outsides', label: 'Outsides' },
];

export default function FileUpload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('outsides');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files || inputFileRef.current.files.length === 0) {
      setResult({
        success: false,
        message: 'No files selected',
        error: 'Please select at least one file'
      });
      return;
    }

    const files = Array.from(inputFileRef.current.files);
    setUploading(true);
    setResult(null);

    try {
      const uploadResult = await uploadImageAction(selectedFolder, files);
      setResult(uploadResult);

      // Reset form on success
      if (uploadResult.success && inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Upload failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border border-black p-6 rounded-none">
      <h2 className="text-2xl font-bold text-black mb-6">Upload Images</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Folder Selector */}
        <div>
          <label htmlFor="folder" className="block text-sm font-medium text-black mb-2">
            Select Folder
          </label>
          <select
            id="folder"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full p-3 border border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            disabled={uploading}
          >
            {FOLDERS.map((folder) => (
              <option key={folder.value} value={folder.value}>
                {folder.label}
              </option>
            ))}
          </select>
        </div>

        {/* File Input */}
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-black mb-2">
            Select Images
          </label>
          <input
            id="files"
            name="files"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            multiple
            required
            disabled={uploading}
            className="w-full p-3 border border-black bg-white text-black file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:cursor-pointer"
          />
          <p className="text-sm text-gray-600 mt-1">
            You can select multiple images. Maximum 10MB per file.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-black text-white py-3 px-4 font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className={`mt-6 p-4 border ${
          result.success
            ? 'border-green-500 bg-green-50 text-green-800'
            : 'border-red-500 bg-red-50 text-red-800'
        }`}>
          <p className="font-medium">{result.message}</p>
          {result.error && (
            <p className="text-sm mt-1">{result.error}</p>
          )}
          {result.urls && result.urls.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Uploaded URLs:</p>
              <ul className="text-sm mt-1 space-y-1">
                {result.urls.map((url, index) => (
                  <li key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}