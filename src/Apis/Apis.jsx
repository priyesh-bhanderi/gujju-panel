import { UserState } from "../Context/Usercontext";

export const allApis = () => {

  const { user } = UserState();

  const images = {
    upload: '/image/upload',
    avatar: (name) => `https://ui-avatars.com/api/?name=${name}`
  }

  const auth = {
    login: '/auth/login',
    profile: '/auth/profile',
  }

  const project = {
    list: '/projects/list',
    status: (id) => `/projects/update-status/${id}`,
    update: (id) => `/projects/update/${id}`,
    add:'/projects/add',
    delete: (id) => `/projects/delete/${id}`,
  }


  return { auth, project ,images};
};
