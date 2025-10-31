'use server';

/**
 * @fileOverview Summarizes product information to quickly understand key benefits and usage instructions.
 *
 * - summarizeProductInformation - A function that summarizes product information.
 * - SummarizeProductInformationInput - The input type for the summarizeProductInformation function.
 * - SummarizeProductInformationOutput - The return type for the summarizeProductInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductInformationInputSchema = z.object({
  productDetails: z
    .string()
    .describe('Detailed information about the product, including benefits, ingredients, and usage instructions.'),
});
export type SummarizeProductInformationInput = z.infer<typeof SummarizeProductInformationInputSchema>;

const SummarizeProductInformationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the product benefits and usage instructions.'),
});
export type SummarizeProductInformationOutput = z.infer<typeof SummarizeProductInformationOutputSchema>;

export async function summarizeProductInformation(
  input: SummarizeProductInformationInput
): Promise<SummarizeProductInformationOutput> {
  return summarizeProductInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProductInformationPrompt',
  input: {schema: SummarizeProductInformationInputSchema},
  output: {schema: SummarizeProductInformationOutputSchema},
  prompt: `Summarize the key benefits and usage instructions of the following product details in a concise manner:\n\n{{{productDetails}}}`,
});

const summarizeProductInformationFlow = ai.defineFlow(
  {
    name: 'summarizeProductInformationFlow',
    inputSchema: SummarizeProductInformationInputSchema,
    outputSchema: SummarizeProductInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
