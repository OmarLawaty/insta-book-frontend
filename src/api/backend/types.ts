export interface BasicUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isMe: boolean;
}

export interface AuthUser extends BasicUser {
  isAdmin: boolean;
}

export interface AuthUserResponse {
  accessToken: string;
  user: AuthUser;
}

export interface User extends BasicUser {
  birthday: string;
  bio: string;
  image: Image | null;
}

export interface TopUser extends BasicUser {
  image: Image | null;
  likesCount: number;
}

export interface PartialUser extends User {
  postIds: string[];
  likedIds: string[];
  savedIds: string[];
}

export interface FullUser extends User {
  posts: Post[];
  saved: Post[];
  liked: Post[];
}

export interface Creator extends BasicUser {
  imageUrl: string | null;
}

export interface ErrorResponse {
  message: string;
  error: string;
  code: null;
}

export interface ForgotPasswordResponse {
  authId: string;
}

export interface Image {
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
  image: Image;
  location: string;
  creator: Creator;
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface InfiniteQueryResponse<T> {
  data: T[];
  nextCursor: string | null;
}
