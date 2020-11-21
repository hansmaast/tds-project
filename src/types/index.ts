export interface IHike {
  id: number;
  title: string;
  description: string;
  publicPhotoPath: string;
  user: IUser;
  length: number;
  comments: IComment[];
  coordinates: IdbCoords[];
}

export interface IHikeList {
  hikes: IHike[];
}

export interface IHikeInsert {
  title: string;
  description: string;
  user_id: string;
  publicPhotoPath: string;
  length: number;
  coordinates: {
    data: IdbCoords[] | undefined
  }
}

export interface IdbCoords {
  lng_lat: string;
  index: number;
}

export default interface IComment {
  id: number;
  post_id: number;
  text: string;
  user: IUser;
}

export interface IUser {
  id: string;
  display_name: string;
}

export interface IHelperString {
  sentence: string;
  button: string;
}
