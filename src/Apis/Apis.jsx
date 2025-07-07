import { UserState } from "../Context/Usercontext";

export const allApis = () => {

  const { user } = UserState();

  // const images = {
  //   imgUrl: import.meta.env.VITE_IMAGE_BASEURL,
  //   imageUpdate: '/upload-image',
  //   avatar: (name) => `https://ui-avatars.com/api/?name=${name}`
  // }

  const auth = {
    login: '/auth/login',
    profile: '/auth/profile',
  }


  return { auth };
};
