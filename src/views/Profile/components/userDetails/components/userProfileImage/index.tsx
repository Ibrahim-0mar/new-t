'use client';
import Button from '@/components/common/base/Button';
import Input from '@/components/common/base/Input';
import { updateUserAvatarAPI } from '@/services/apis/common/profile';
import { PencilLine } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface props {
  avatarUrl: string;
  token: string;
}

const UserProfileImage = ({ avatarUrl, token }: props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<{
    preview: string;
    raw: File | null;
    value: string;
  }>({ preview: '', raw: null, value: '' });
  const [updatedImage, setUpdatedImage] = useState<string>(avatarUrl);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!;

    if (files[0]) {
      setImage({
        preview: URL.createObjectURL(files![0]),
        raw: files![0],
        value: event.target.value,
      });
      setUpdatedImage(URL.createObjectURL(files![0]));
    }
  };

  const handleUpload = async () => {
    const images = new FormData();
    images.append('image', image.raw!);

    try {
      const response = await updateUserAvatarAPI(images, token);
      if (response.success) {
        setUpdatedImage(image.preview);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    if (image.raw && image.value) {
      handleUpload();
    }
  }, [image, updatedImage]);

  return (
    <div className={styles.photoContainer}>
      <Image src={updatedImage} fill objectFit="cover" alt="" loading="lazy" />
      <Button
        variant="default"
        className={styles.photoEdit}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <PencilLine color="#2ba6de" />
        <Input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
        />
      </Button>
    </div>
  );
};

export default UserProfileImage;
