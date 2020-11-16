import { IUser } from './IUser';

export default interface IComment {
  id: number;
  post_id: number;
  text: string;
  user: IUser;
};
