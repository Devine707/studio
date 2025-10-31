'use server';

/**
 * @fileOverview Analyzes a facial image and recommends treatments or medications.
 *
 * - analyzeFacialImageAndRecommendTreatments - A function that analyzes a facial image and recommends treatments.
 * - AnalyzeFacialImageAndRecommendTreatmentsInput - The input type for the analyzeFacialImageAndRecommendTreatments function.
 * - AnalyzeFacialImageAndRecommendTreatmentsOutput - The return type for the analyzeFacialImageAndRecommendTreatments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFacialImageAndRecommendTreatmentsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
});
export type AnalyzeFacialImageAndRecommendTreatmentsInput = z.infer<
  typeof AnalyzeFacialImageAndRecommendTreatmentsInputSchema
>;

const AnalyzeFacialImageAndRecommendTreatmentsOutputSchema = z.object({
  skinConcerns: z.array(z.string()).describe('The identified skin concerns.'),
  treatmentRecommendations: z
    .array(z.string())
    .describe('The recommended treatments or medications.'),
});
export type AnalyzeFacialImageAndRecommendTreatmentsOutput = z.infer<
  typeof AnalyzeFacialImageAndRecommendTreatmentsOutputSchema
>;

export async function analyzeFacialImageAndRecommendTreatments(
  input: AnalyzeFacialImageAndRecommendTreatmentsInput
): Promise<AnalyzeFacialImageAndRecommendTreatmentsOutput> {
  return analyzeFacialImageAndRecommendTreatmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFacialImageAndRecommendTreatmentsPrompt',
  input: {schema: AnalyzeFacialImageAndRecommendTreatmentsInputSchema},
  output: {schema: AnalyzeFacialImageAndRecommendTreatmentsOutputSchema},
  prompt: `You are a skincare expert. Analyze the provided facial image and identify any skin concerns. Based on these concerns, recommend appropriate treatments or medications.

Facial Image: {{media url=photoDataUri}}

Respond with the identified skin concerns and treatment recommendations.`, 
});

const analyzeFacialImageAndRecommendTreatmentsFlow = ai.defineFlow(
  {
    name: 'analyzeFacialImageAndRecommendTreatmentsFlow',
    inputSchema: AnalyzeFacialImageAndRecommendTreatmentsInputSchema,
    outputSchema: AnalyzeFacialImageAndRecommendTreatmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
