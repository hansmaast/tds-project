import { IUser } from './IUser';

export default interface IComment {
  id: number;
  postId: number;
  text: string;
  user: IUser
};
