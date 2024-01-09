export const setUserDataToLocalStorage = ({
  user,
  accessToken,
  refreshToken,
}) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  const userData = JSON.stringify(user);
  localStorage.setItem("user", userData);
};
