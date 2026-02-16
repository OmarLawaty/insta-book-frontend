export interface AuthUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

export interface ErrorResponse {
  message: string;
  error: string;
  code: null;
}

export interface ForgotPasswordResponse {
  authId: string;
}

export interface User extends Omit<AuthUserResponse, 'isAdmin'> {
  birthday: string;
  bio: string;
  imageUrl: string;
  imageId: string;
  postIds: string[];
  likedIds: string[];
  savedIds: string[];
}

export interface UploadFileResponse {
  id: number;
  url: string;
  publicId: string;
  createdAt: string;
}

export interface Post {
  id: number;
  caption: string;
  tags: string[];
  imageUrl: string;
  location: string;
  creator: Pick<User, 'id' | 'firstName' | 'lastName' | 'imageUrl'>;
  likeIds: number[];
  saveIds: number[];
}
