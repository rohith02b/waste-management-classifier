'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from './ui/use-toast';
import Image from 'next/image';

export function Uploader() {
  const [open, setOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth > 768);
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.innerWidth > 768);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Get Started</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Upload an image to classify</DialogTitle>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Get Started</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Upload an image to classify</DrawerTitle>
        </DrawerHeader>
        <ProfileForm className='px-4' />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  const [selectedFile, setSelectedFile] = React.useState<any>();
  const [uploading, setUploading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        setImageUrl(event.target.result as string);
        setResult('');
      };
    }
  };

  const handleSubmit = () => {
    console.log(selectedFile);
    setUploading(true);

    const formData = new FormData();
    formData.append('img', selectedFile);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/waste-classifier/service/predict_waste`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        setResult(response?.data);
      })
      .catch((error) => {
        setResult('Error');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div className={cn('grid items-start gap-4', className)}>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Input
          type='file'
          id='files'
          name='file'
          required
          className='cursor-pointer'
          onChange={handleFileChange}
        />
      </div>
      {imageUrl && (
        <div className='py-3'>
          <Image
            src={imageUrl}
            alt='Selected Image'
            width={400}
            height={100}
            className='max-h-[40vh]'
          />
        </div>
      )}
      {result && (
        <div className='py-3'>
          {result === 'Error' ? (
            <>
              <p className='text-red-500'>
                An error occurred, Please try again later
              </p>
            </>
          ) : (
            <div>
              <p>Predicted Waste : {result?.predicted_waste}</p>
              <p>Accuracy : {result?.accuracy}%</p>
            </div>
          )}
        </div>
      )}
      <Button onClick={handleSubmit} disabled={uploading || !selectedFile}>
        {uploading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {uploading ? 'Uploading' : 'Upload'}
      </Button>
    </div>
  );
}

export default Uploader;
