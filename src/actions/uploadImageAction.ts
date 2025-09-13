'use server'

import { put } from '@vercel/blob';

export type UploadResult = {
  success: boolean;
  message: string;
  urls?: string[];
  error?: string;
};

/**
 * Upload one or more images to a specific folder in Vercel Blob
 * @param formData - FormData containing the folder and files
 * @returns Promise<UploadResult>
 */
export const uploadImageAction = async (
  formData: FormData
): Promise<UploadResult> => {
  try {
    // Extract folder and files from FormData
    const folder = formData.get('folder') as string;
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return {
        success: false,
        message: 'No files provided',
        error: 'No files to upload'
      };
    }

    if (!folder || folder.trim() === '') {
      return {
        success: false,
        message: 'No folder specified',
        error: 'Folder name is required'
      };
    }

    const uploadPromises = files.map(async (file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error(`File ${file.name} is not an image`);
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error(`File ${file.name} is too large (max 10MB)`);
      }

      // Create filename with timestamp to avoid conflicts
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const pathname = `${folder}/${filename}`;

      // Upload to Vercel Blob
      const blob = await put(pathname, file, {
        access: 'public',
        addRandomSuffix: false, // We're already adding timestamp
      });

      return blob.url;
    });

    const urls = await Promise.all(uploadPromises);

    return {
      success: true,
      message: `Successfully uploaded ${files.length} image(s) to ${folder}`,
      urls
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
