'use server';

import { analyzeFacialImageAndRecommendTreatments } from '@/ai/flows/analyze-facial-image-and-recommend-treatments';
import { z } from 'zod';

const schema = z.object({
  photoDataUri: z.string().min(1, { message: 'Photo data is required.' }),
  redirectPath: z.string(),
});

export async function analyzeImageAction(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    photoDataUri: formData.get('photoDataUri'),
    redirectPath: formData.get('redirectPath'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
    };
  }

  try {
    const result =
      await analyzeFacialImageAndRecommendTreatments({ photoDataUri: validatedFields.data.photoDataUri });

    return {
      data: result,
      redirectPath: validatedFields.data.redirectPath
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Analysis failed. Please try again.',
    };
  }
}
