'use client';

import { useEffect, useState } from 'react';

import { CheckCircle2, Code2, Database, Layout, Sparkles } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/components/ui';
import { placeholderService } from '@/services';
import { useCounterStore } from '@/stores';
import { type Post } from '@/validators';

export default function HomePage() {
  const { count, increment, decrement, reset } = useCounterStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    async function loadSampleData() {
      try {
        setLoadingPosts(true);
        const data = await placeholderService.getPosts();
        setPosts(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    }

    loadSampleData();
  }, []);

  return (
    <main className="text-foreground min-h-screen bg-linear-to-b from-zinc-50 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header Hero Section */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm shadow-xs">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Next.js App Router Boilerplate</span>
            <Badge variant="secondary">v2.0</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Clean, Modern & Scalable Frontend Starter
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Built with Next.js App Router, Tailwind CSS v4, Base UI primitives, Zustand state management, and type-safe
            Axios with Zod validation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Zustand Store */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="text-primary h-5 w-5" />
                <CardTitle>Zustand State</CardTitle>
              </div>
              <CardDescription>SSR-safe reactive state management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center rounded-xl bg-zinc-100 p-6 text-3xl font-bold">
                {count}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={decrement}>
                  -1
                </Button>
                <Button className="flex-1" onClick={increment}>
                  +1
                </Button>
                <Button variant="ghost" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Base UI Primitives */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layout className="text-primary h-5 w-5" />
                <CardTitle>Base UI Dialogs</CardTitle>
              </div>
              <CardDescription>Accessible headless modal components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog>
                <DialogTrigger render={<Button variant="outline" className="w-full" />}>Open Dialog</DialogTrigger>
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Base UI Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog is powered by @base-ui/react with zero accessibility compromises.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-muted-foreground py-2 text-sm">
                    Seamless transitions, focus trapping, and keyboard navigation out of the box.
                  </div>
                  <DialogFooter>
                    <DialogClose render={<Button variant="default" />}>Got it</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive" className="w-full" />}>
                  Open Alert Dialog
                </AlertDialogTrigger>
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This demonstrates the Base UI alert dialog pattern.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Confirm Action</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Card 3: Form Controls */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code2 className="text-primary h-5 w-5" />
                <CardTitle>Form Elements</CardTitle>
              </div>
              <CardDescription>Accessible inputs with password toggle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="demo-password">Password Input</Label>
                <Input
                  id="demo-password"
                  isPassword
                  placeholder="Enter secret password..."
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                />
              </div>
              <Checkbox id="terms" label="Accept terms and conditions" checked={agreed} onCheckedChange={setAgreed} />
            </CardContent>
          </Card>
        </div>

        {/* API Layer Showcase */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Type-Safe API & Repository Layer</CardTitle>
                <CardDescription>
                  Data fetched through Axios interceptors and parsed against runtime Zod schemas
                </CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Live API
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loadingPosts ? (
              <div className="text-muted-foreground animate-pulse py-8 text-center text-sm">
                Fetching data from JSONPlaceholder API...
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3">
                {posts.map(post => (
                  <div key={post.id} className="space-y-2 rounded-xl border bg-zinc-50/50 p-4">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">Post #{post.id}</span>
                    <h4 className="line-clamp-1 text-sm font-semibold capitalize">{post.title}</h4>
                    <p className="text-muted-foreground line-clamp-2 text-xs">{post.body}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="text-muted-foreground border-t pt-4 text-xs">
            Validated using <code className="mx-1 rounded bg-zinc-100 px-1 py-0.5">postListSchema</code> in{' '}
            <code className="mx-1 rounded bg-zinc-100 px-1 py-0.5">@/validators/placeholder.schema.ts</code>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
