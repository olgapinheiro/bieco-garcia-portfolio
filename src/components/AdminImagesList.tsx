'use client';

import React, { useState, useTransition } from 'react';
import { TransitionPanel } from '@/components/motion-primitives/transition-panel';
import { getImagesAction } from '@/actions/getImagesAction';
import { deleteImagesAction, deleteImageAction, type DeleteResult } from '@/actions/deleteImagesAction';
import Image from 'next/image';

const FOLDERS = [
  { value: 'foods-and-drinks', label: 'Foods & Drinks' },
  { value: 'insides', label: 'Insides' },
  { value: 'destinations', label: 'Landscape & Wildlife' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'outsides', label: 'Outsides' },
];

interface ImageItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date;
}

interface FolderImages {
  [key: string]: ImageItem[];
}

export default function AdminImagesList() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [deleteResult, setDeleteResult] = useState<DeleteResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [folderImages, setFolderImages] = useState<FolderImages>({});

  // Load images for a specific folder
  const loadFolderImages = async (folder: string) => {
    if (folderImages[folder]) return; // Already loaded

    try {
      const result = await getImagesAction(folder);
      if (result?.blobs) {
        const images: ImageItem[] = result.blobs.map(blob => ({
          url: blob.url,
          pathname: blob.pathname,
          size: blob.size,
          uploadedAt: blob.uploadedAt
        }));

        setFolderImages(prev => ({
          ...prev,
          [folder]: images
        }));
      }
    } catch (error) {
      console.error(`Failed to load images for ${folder}:`, error);
    }
  };

  // Load images when tab changes
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    const folder = FOLDERS[index].value;
    loadFolderImages(folder);
    setSelectedImages(new Set()); // Clear selection when switching tabs
  };

  // Toggle image selection
  const toggleImageSelection = (url: string) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(url)) {
        newSet.delete(url);
      } else {
        newSet.add(url);
      }
      return newSet;
    });
  };

  // Delete selected images
  const handleDeleteSelected = async () => {
    if (selectedImages.size === 0) return;

    startTransition(async () => {
      const urls = Array.from(selectedImages);
      const result = await deleteImagesAction(urls);
      setDeleteResult(result);

      if (result.success) {
        // Remove deleted images from state
        const currentFolder = FOLDERS[activeTab].value;
        setFolderImages(prev => ({
          ...prev,
          [currentFolder]: prev[currentFolder]?.filter(img => !urls.includes(img.url)) || []
        }));
        setSelectedImages(new Set());
      }
    });
  };

  // Delete single image
  const handleDeleteSingle = async (url: string) => {
    startTransition(async () => {
      const result = await deleteImageAction(url);
      setDeleteResult(result);

      if (result.success) {
        // Remove deleted image from state
        const currentFolder = FOLDERS[activeTab].value;
        setFolderImages(prev => ({
          ...prev,
          [currentFolder]: prev[currentFolder]?.filter(img => img.url !== url) || []
        }));
        setSelectedImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(url);
          return newSet;
        });
      }
    });
  };

  // Load initial folder
  React.useEffect(() => {
    loadFolderImages(FOLDERS[activeTab].value);
  }, [activeTab, loadFolderImages]);

  const currentFolder = FOLDERS[activeTab].value;
  const currentImages = folderImages[currentFolder] || [];

  return (
    <div className="bg-white border border-black p-6 rounded-none">
      <h2 className="text-2xl font-bold text-black mb-6">Manage Images</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FOLDERS.map((folder, index) => (
          <button
            key={folder.value}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-2 border border-black font-medium transition-colors ${
              activeTab === index
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {folder.label}
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedImages.size > 0 && (
        <div className="mb-4 p-4 bg-gray-100 border border-black">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedImages.size} image(s) selected
            </span>
            <button
              onClick={handleDeleteSelected}
              disabled={isPending}
              className="bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending ? 'Deleting...' : 'Delete Selected'}
            </button>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <TransitionPanel
        activeIndex={activeTab}
        className="min-h-[400px]"
        variants={{
          enter: { opacity: 0, y: 20 },
          center: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }}
        transition={{ duration: 0.3 }}
      >
        {FOLDERS.map((folder) => (
          <div key={folder.value} className="space-y-4">
            {currentImages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No images found in {folder.label}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentImages.map((image) => (
                  <div
                    key={image.url}
                    className={`relative border-2 transition-colors ${
                      selectedImages.has(image.url)
                        ? 'border-black bg-gray-100'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedImages.has(image.url)}
                        onChange={() => toggleImageSelection(image.url)}
                        className="w-4 h-4 text-black border-2 border-black focus:ring-black"
                      />
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteSingle(image.url)}
                      disabled={isPending}
                      className="absolute top-2 right-2 z-10 bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      title="Delete image"
                    >
                      ×
                    </button>

                    {/* Image */}
                    <Image
                      src={image.url}
                      alt={image.pathname}
                      className="w-full h-32 object-cover cursor-pointer"
                      onClick={() => toggleImageSelection(image.url)}
                      loading="lazy"
                      width={300}
                      height={300}
                    />

                    {/* Image Info */}
                    <div className="p-2 text-xs text-gray-600">
                      <p className="truncate" title={image.pathname}>
                        {image.pathname.split('/').pop()}
                      </p>
                      <p>{(image.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </TransitionPanel>

      {/* Delete Result */}
      {deleteResult && (
        <div className={`mt-6 p-4 border ${
          deleteResult.success
            ? 'border-green-500 bg-green-50 text-green-800'
            : 'border-red-500 bg-red-50 text-red-800'
        }`}>
          <p className="font-medium">{deleteResult.message}</p>
          {deleteResult.error && (
            <p className="text-sm mt-1">{deleteResult.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
