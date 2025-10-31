'use server';

import { analyzeFacialImageAndRecommendTreatments } from '@/ai/flows/analyze-facial-image-and-recommend-treatments';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  photoDataUri: z.string().min(1, { message: 'Photo data is required.' }),
});

export async function analyzeImageAction(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    photoDataUri: formData.get('photoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid photo data.',
    };
  }

  try {
    const result =
      await analyzeFacialImageAndRecommendTreatments(validatedFields.data);
    const params = new URLSearchParams({
      data: JSON.stringify(result),
    });
    redirect(`/results?${params.toString()}`);
  } catch (error) {
    console.error(error);
    return {
      message: 'Analysis failed. Please try again.',
    };
  }
}
