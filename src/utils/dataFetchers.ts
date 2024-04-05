import Userfront from "@userfront/core";

export const checkLogin = async () => {
  Userfront.init("xbp876mb");
  const l = Userfront.getSession()
    .then((session) => {
      console.log(`Logged In: ${session.isLoggedIn}`);
      return session.isLoggedIn;
    })
    .catch((err) => {
      return null;
    });
  return l;
  };


