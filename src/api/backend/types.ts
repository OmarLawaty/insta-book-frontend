export interface AuthUserResponse {
  accessToken: string;
  user: AuthUser;
}

export interface AuthUser {
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

export interface User extends Omit<AuthUser, 'isAdmin'> {
  birthday: string;
  bio: string;
  image: UploadFileResponse | null;
  postIds: string[];
  likedIds: string[];
  savedIds: string[];
}

export interface TopUser extends User {
  likesCount: number;
}

export interface UploadFileResponse {
  id: number;
  url: string;
  publicId: string;
  createdAt: string;
}

export interface CreatePostParams {
  caption: string;
  tags: string[];
  imageId: string;
  location: string;
}

export interface Post {
  id: number;
  caption: string;
  tags: string[];
  image: UploadFileResponse;
  location: string;
  creator: Pick<User, 'id' | 'firstName' | 'lastName'> & { imageUrl: string | null };
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isSaved: boolean;
}
