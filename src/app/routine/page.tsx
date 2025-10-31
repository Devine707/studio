'use client';

import { useRoutineStore } from '@/hooks/use-routine-store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format, formatDistanceToNow } from 'date-fns';
import {
  CalendarDays,
  History,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function RoutinePage() {
  const { routine, removeTreatment, logApplication, isLoaded } =
    useRoutineStore();

  if (!isLoaded) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <div className="space-y-4 mb-8">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (routine.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <CalendarDays className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold">Your Routine is Empty</h2>
        <p className="text-muted-foreground max-w-md mx-auto mt-2">
          Start by getting a skin analysis and add recommended treatments to
          build your personalized routine.
        </p>
        <Button asChild className="mt-6">
          <Link href="/scan">Start a New Scan</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">My Skincare Routine</h1>
        <p className="text-muted-foreground">
          Track your treatments and log your progress here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {routine.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>
                    Added{' '}
                    {formatDistanceToNow(new Date(item.addedAt), {
                      addSuffix: true,
                    })}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTreatment(item.id)}
                  aria-label={`Remove ${item.name} from routine`}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <Button
                onClick={() => logApplication(item.id)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Log Application
              </Button>
              <div className="flex-1 rounded-lg border p-4 space-y-4">
                <h4 className="font-semibold flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  Application History
                </h4>
                <ScrollArea className="h-32">
                  {item.logs.length > 0 ? (
                    <div className="space-y-2 pr-4">
                      {[...item.logs].reverse().map((log, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md"
                        >
                          <span>Applied</span>
                          <span className="text-muted-foreground">
                            {format(
                              new Date(log),
                              "MMM d, yyyy 'at' hh:mm a"
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center pt-8">
                      No applications logged yet.
                    </p>
                  )}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
