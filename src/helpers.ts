export const getSearchParams = () => {
  if (!isClient()) return new URLSearchParams();

  return new URLSearchParams(window.location.search);
};

export const isClient = () => typeof window !== 'undefined';

export const getCombinedUserName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
