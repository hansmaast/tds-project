import { CameraPhoto } from '@capacitor/core';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { getFilenameForPhoto } from '../utils/helpers';
import { auth, storage } from '../utils/nhost';
import { INSERT_HIKE } from '../graphql/mutations';
import { PUBLIC_STORAGE_DIR } from '../utils/constants/urls';
import { paths } from '../navigation/paths';
import { IHikeInsert } from '../types';

interface DbInsertProps {
  data: IHikeInsert;
  photo: CameraPhoto | undefined;
}

export const useDbInsert = ({ data, photo }: DbInsertProps) => {
  const [filename, setFilename] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [insertMutation] = useMutation(INSERT_HIKE);
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
  const insertData = async () => {
    if (filename) {
      try {
        const { data: resData, errors } = await insertMutation({
          variables: {
            hike: {
              ...data,
              user_id: auth.getClaim('x-hasura-user-id'),
              publicPhotoPath: filename,
            },
          },
        });
        if (data) console.log('Got some data ->', resData);
        if (errors) console.warn('Got some errors ->', errors);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('failed to post: ', {
        ...data,
        user_id: auth.getClaim('x-hasura-user-id'),
        publicPhotoPath: filename,
      });
    }
  };

  // triggers upload
  useEffect(() => {
    if (uploadSuccess) {
      insertData()
        .then(() => history.replace(paths.home))
        .catch((e) => console.error(e));
    }
  }, [uploadSuccess]); // eslint-disable-line

  return { startPostUpload, uploadSuccess, uploadProgress };
};
