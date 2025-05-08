'use server'
import { promises as fs } from 'fs'
import path from 'path'

export type ImageArray = string[] | undefined;

/**
 *
 *
 * @returns {Promise<ImageArray>}
 */
export const getImagesAction = async (directoryName: string): Promise<ImageArray> => {
    try {
        /* Grabs path to public/{directoryName} */
        const imageDirectory = path.join(process.cwd(), `/public/${directoryName}`);

        /* Reads the content of the midj dir and returns an array of strings */
        const imageFilenames: ImageArray = await fs.readdir(imageDirectory)

        return imageFilenames.filter((fileName) => !fileName.startsWith('.'))
    } catch (error: unknown) {
        console.error(error)
    }
}