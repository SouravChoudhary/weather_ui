import * as urls from "../constants/url";

const weatherService = {
  fetchCurrentWeather: async (user_id,city,token) => {

    const headers = new Headers({
      Authorization: token,
      "Content-Type": "application/json",
    });

    const url = `${urls.BASE_URL}${urls.CURRENT_WEATHER}?user_id=${user_id}&city=${city}`;
    const response = await fetch(url, { method: "GET", headers: headers });
    return await response.json();
  },

  fetchHistoricalWeather: async (page, per_page, user_id,token) => {
    // Define the headers with the Authorization token
    const headers = new Headers({
      "Authorization": token,
      "Content-Type": "application/json",
    });

    const url = `${urls.BASE_URL}${urls.WEATHER_HISTORY}?page=${page}&per_page=${per_page}&user_id=${user_id}`;
    const response = await fetch(url, { method: "GET", headers: headers });
    return await response.json();
  },

  bulkDeleteWeatherHistory: async (recordIds,token) => {
    const headers = new Headers({
      Authorization: token,
      "Content-Type": "application/json",
    });

    const url = `${urls.BASE_URL}${urls.BULK_DELETE_HISTORY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ record_ids: recordIds }),
    });
    return await response.json();
  },
};

export default weatherService;
