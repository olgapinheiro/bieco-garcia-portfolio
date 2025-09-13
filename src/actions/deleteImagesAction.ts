'use server'

import { del } from '@vercel/blob';
import { auth } from '@clerk/nextjs/server';

export type DeleteResult = {
  success: boolean;
  message: string;
  deletedCount?: number;
  error?: string;
};

/**
 * Delete multiple images from Vercel Blob
 * @param urls - Array of blob URLs to delete
 * @returns Promise<DeleteResult>
 */
export const deleteImagesAction = async (urls: string[]): Promise<DeleteResult> => {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
        error: 'You must be logged in to delete images'
      };
    }

    if (!urls || urls.length === 0) {
      return {
        success: false,
        message: 'No URLs provided',
        error: 'No images to delete'
      };
    }

    // Validate that all URLs are from Vercel Blob storage
    const isValidBlobUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.endsWith('.vercel-storage.com') ||
               urlObj.hostname.endsWith('.public.blob.vercel-storage.com');
      } catch {
        return false;
      }
    };

    const invalidUrls = urls.filter(url => !isValidBlobUrl(url));
    if (invalidUrls.length > 0) {
      return {
        success: false,
        message: 'Invalid URLs provided',
        error: 'All URLs must be from Vercel Blob storage'
      };
    }

    // Delete all images in parallel
    const deletePromises = urls.map(async (url) => {
      try {
        await del(url);
        return { success: true, url };
      } catch (error) {
        console.error(`Failed to delete ${url}:`, error);
        return { success: false, url, error };
      }
    });

    const results = await Promise.all(deletePromises);
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    if (failed.length > 0) {
      return {
        success: false,
        message: `Deleted ${successful.length} of ${urls.length} images. ${failed.length} failed.`,
        deletedCount: successful.length,
        error: `Failed to delete: ${failed.map(f => f.url).join(', ')}`
      };
    }

    return {
      success: true,
      message: `Successfully deleted ${successful.length} image(s)`,
      deletedCount: successful.length
    };

  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      message: 'Delete operation failed',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Delete a single image from Vercel Blob
 * @param url - Blob URL to delete
 * @returns Promise<DeleteResult>
 */
export const deleteImageAction = async (url: string): Promise<DeleteResult> => {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
        error: 'You must be logged in to delete images'
      };
    }

    if (!url || url.trim() === '') {
      return {
        success: false,
        message: 'No URL provided',
        error: 'URL is required'
      };
    }

    // Validate that the URL is from Vercel Blob storage
    const isValidBlobUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.endsWith('.vercel-storage.com') ||
               urlObj.hostname.endsWith('.public.blob.vercel-storage.com');
      } catch {
        return false;
      }
    };

    if (!isValidBlobUrl(url)) {
      return {
        success: false,
        message: 'Invalid URL provided',
        error: 'URL must be from Vercel Blob storage'
      };
    }

    await del(url);

    return {
      success: true,
      message: 'Image deleted successfully',
      deletedCount: 1
    };

  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      message: 'Failed to delete image',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
