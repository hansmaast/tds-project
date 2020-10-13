import { IUser } from '../IUser';

export interface IPost {
  id?: number;
  title: string;
  description: string;
  publicPhotoPath: string;
  user: IUser;
}
