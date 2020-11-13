import { CameraPhoto } from '@capacitor/core';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { getFilenameForPhoto } from '../getFilenameForPhoto';
import { IInsertPost } from '../../interfaces/Post/IInsertPost';
import { auth, storage } from '../nhost';
import { INSERT_POST } from '../graphql/mutations';
import { PUBLIC_STORAGE_DIR } from '../constants/urls';

interface NewPostInsertProps {
  postData: IInsertPost;
  photo: CameraPhoto | undefined;
}

export const useNewPostUpload = ({ postData, photo }: NewPostInsertProps) => {
  const [filename, setFilename] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [insertPostMutation] = useMutation(INSERT_POST);
  const history = useHistory();
  const [uploadProgress, setUploadProgress] = useState(0);

  // uploads image to storage
  const startPostUpload = async () => {
    if (photo) {
      try {
        const newFilename = getFilenameForPhoto(photo);
        await storage.putString(
          `${PUBLIC_STORAGE_DIR}${newFilename}`,
            photo.dataUrl as string,
            'data_url',
            null,
            (pe: ProgressEvent) => {
              setUploadProgress((pe.loaded / pe.total) * 100);
            },
        );
        setFilename(newFilename);
        setUploadSuccess(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('Photo is: ', photo);
    }
  };

  // uploads post when image is uploaded
  const insertPost = async () => {
    if (filename) {
      try {
        await insertPostMutation({
          variables: {
            post: {
              ...postData,
              user_id: auth.getClaim('x-hasura-user-id'),
              publicPhotoPath: filename,
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('failed to post: ', {
        ...postData,
        user_id: auth.getClaim('x-hasura-user-id'),
        publicPhotoPath: filename,
      });
    }
  };

  // triggers upload
  useEffect(() => {
    if (uploadSuccess) {
      insertPost()
        .then(() => history.replace('/home'))
        .catch((e) => console.error(e));
    }
  }, [uploadSuccess]);

  return { startPostUpload, uploadSuccess, uploadProgress };
};
