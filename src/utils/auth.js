export const login = (user) => {
  localStorage.setItem("USER", user.email);
  localStorage.setItem("TOKEN", user.token);
};

export const logout = () => {
  localStorage.removeItem("USER");
  localStorage.removeItem("TOKEN");
};

export const isLogin = () => {
  if (localStorage.getItem("USER")) {
    return true;
  }
  return false;
};
