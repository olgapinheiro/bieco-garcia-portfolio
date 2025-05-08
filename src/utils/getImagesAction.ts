'use server'
import { list, ListBlobResult } from '@vercel/blob';
// import { promises as fs } from 'fs'

// import path from 'path'

export type ImageArray = ListBlobResult | undefined;

/**
 *
 *
 * @returns {Promise<ImageArray>}
 */
export const getImagesAction = async (directoryName: string): Promise<ImageArray> => {
    try {
        // https://vercel.com/docs/vercel-blob/using-blob-sdk#list-blobs
        const blobs = await list({prefix: directoryName});
        return blobs
    } catch (error: unknown) {
        console.error(error)
    }
}