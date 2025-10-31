'use client';

import { analyzeImageAction } from '@/app/scan/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, Loader2, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze My Skin'
      )}
    </Button>
  );
}

export default function ScanPage() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [state, formAction] = useFormState(analyzeImageAction, { message: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  const getCameraStream = useCallback(async () => {
    setImageData(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: 'destructive',
        title: 'Camera Error',
        description:
          'Could not access the camera. Please check your browser permissions.',
      });
    }
  }, [toast]);

  useEffect(() => {
    getCameraStream();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const data = canvas.toDataURL('image/jpeg');
        setImageData(data);
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">
            Facial Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden border bg-muted">
            {imageData ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageData}
                alt="Captured face"
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover scale-x-[-1]"
              />
            )}
            {!stream && !imageData && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </div>

          {!imageData ? (
            <Button size="lg" onClick={captureImage} disabled={!stream}>
              <Camera className="mr-2 h-4 w-4" />
              Capture Photo
            </Button>
          ) : (
            <form
              action={formAction}
              className="flex flex-col items-center gap-4"
            >
              <input type="hidden" name="photoDataUri" value={imageData} />
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={getCameraStream}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <SubmitButton />
              </div>
            </form>
          )}

          <canvas ref={canvasRef} className="hidden"></canvas>
        </CardContent>
      </Card>
    </div>
  );
}
