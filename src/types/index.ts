export interface IUser {
  id: string;
  display_name: string;
}

export default interface IComment {
  id: number;
  post_id: number;
  text: string;
  user: IUser;
};

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

export interface IHikeInsert {
  user_id: string;
  title: string;
  description: string;
  start_point: string;
  end_point: string;
  length: number;

  publicPhotoPath: string;
}

export interface IHikeList {
  hikes: IHike[];
}
