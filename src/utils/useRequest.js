import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { authenticateAndSaveToken, base_url } from "./getToken";
const useRequest = (queryKey, url, options = {}) => {
  const fetchData = async () => {
    try {
      const token = await authenticateAndSaveToken();
      const res = await axios.get(`${base_url}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Encoding": "gzip, deflate, br, zstd",
        },
        ...options,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await authenticateAndSaveToken();
        const retryRes = await axios.get(`${base_url}/${url}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
            "Content-Encoding": "gzip, deflate, br, zstd",
          },
          ...options,
        });
        return retryRes.data;
      }
      throw error;
    }
  };
  return useQuery({
    queryKey: queryKey,
    queryFn: fetchData,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};
export default useRequest;

export const usePostRequest = (url, options = {}) => {
  const postData = async (data) => {
    try {
      const token = await authenticateAndSaveToken();
      const res = await axios.post(`${base_url}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...options,
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  return useMutation({
    mutationFn: postData,
    ...options,
  });
};
