'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateAboutUs, uploadImage } from './actions';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(30).max(500),
  image_url: z.string().min(5).max(100).url(),
});

export type AboutFormValues = z.infer<typeof formSchema>;

type AboutFormProps = {
  aboutUs: AboutFormValues;
};

export default function AboutForm({ aboutUs }: AboutFormProps) {
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: aboutUs || {
      title: '',
      description: '',
      image_url: '',
    },
  });

  async function onSubmit(values: AboutFormValues) {
    const { success, error } = await updateAboutUs(values);
    if (success) {
      toast({
        title: 'About us updated successfully',
        description: 'The about us section has been updated successfully.',
      });
    } else {
      toast({
        title: 'Failed to update about us',
        description: error,
        variant: 'destructive',
      });
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { success, error, imageUrl } = await uploadImage(file);
      if (success) {
        toast({
          title: 'Image uploaded successfully',
          description: 'The image has been uploaded successfully.',
        });
        form.setValue('image_url', imageUrl!);
      } else {
        toast({
          title: 'Failed to upload image',
          description: error,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>This is the title of the about section.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>This is the description of the about section.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} disabled />
                </FormControl>
                <FormDescription>This is the image URL of the about section.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" onChange={handleImageChange} />
            <Image
              src={aboutUs.image_url}
              alt="About Us"
              width={400}
              height={400}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Form>
  );
}
