'use server'

import { del } from '@vercel/blob';

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
    if (!urls || urls.length === 0) {
      return {
        success: false,
        message: 'No URLs provided',
        error: 'No images to delete'
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
    if (!url || url.trim() === '') {
      return {
        success: false,
        message: 'No URL provided',
        error: 'URL is required'
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
