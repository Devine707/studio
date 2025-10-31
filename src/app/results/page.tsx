'use client';

import type { AnalyzeFacialImageAndRecommendTreatmentsOutput } from '@/ai/flows/analyze-facial-image-and-recommend-treatments';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRoutineStore } from '@/hooks/use-routine-store';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '@/lib/products';
import {
  AlertCircle,
  CheckCircle,
  ListPlus,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

function ResultsDisplay() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { addTreatment, routine } = useRoutineStore();

  const analysisResult = useMemo(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        return JSON.parse(
          data
        ) as AnalyzeFacialImageAndRecommendTreatmentsOutput;
      } catch (e) {
        console.error('Failed to parse analysis result', e);
        return null;
      }
    }
    return null;
  }, [searchParams]);

  if (!analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Analysis Failed</h2>
        <p className="text-muted-foreground">
          Could not retrieve analysis results. Please try scanning again.
        </p>
        <Button asChild className="mt-6">
          <Link href="/scan">New Scan</Link>
        </Button>
      </div>
    );
  }

  const handleAddTreatment = (treatmentName: string) => {
    addTreatment(treatmentName);
    toast({
      title: 'Added to Routine',
      description: `"${treatmentName}" has been added to your skincare routine.`,
    });
  };

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="text-3xl font-bold text-center mb-2 font-headline">
        Your Skin Analysis
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Here are the results from your facial scan and our AI-powered
        recommendations.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              Identified Concerns
            </CardTitle>
            <CardDescription>
              Our AI has identified the following potential skin concerns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysisResult.skinConcerns.map((concern, index) => (
                <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                  {concern}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-accent" />
              Treatment Recommendations
            </CardTitle>
            <CardDescription>
              Based on the analysis, we suggest the following.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResult.treatmentRecommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <p className="font-medium">{rec}</p>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Suggested Products for "{rec}"</DialogTitle>
                        <DialogDescription>
                          Here are some products that may help. Consult a
                          dermatologist for medical advice.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {mockProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    onClick={() => handleAddTreatment(rec)}
                    disabled={routine.some((item) => item.name === rec)}
                  >
                    <ListPlus className="mr-2 h-4 w-4" />
                    {routine.some((item) => item.name === rec)
                      ? 'Added'
                      : 'Add'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsDisplay />
    </Suspense>
  );
}
