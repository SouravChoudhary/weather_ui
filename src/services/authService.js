import * as urls from "../constants/url";

const authService = {
  register: async (username, password, date_of_birth) => {
    const url = `${urls.BASE_URL}${urls.USER_REGISTER}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, date_of_birth }),
    });

    return await response.json();
  },

  login: async (username, password) => {
    const url = `${urls.BASE_URL}${urls.USER_LOGIN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  },
};

export default authService;
