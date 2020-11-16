import { IUser } from '../IUser';
import IComment from '../IComment';

export interface IHike {
  id: number;
  title: string;
  description: string;
  publicPhotoPath: string;
  user: IUser;
  length: number;
  start_point: string;
  end_point: string;
  comments: IComment[];
}
