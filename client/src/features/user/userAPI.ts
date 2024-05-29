// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => {
      console.log("from redux");
      resolve({ data: amount });
    }, 1500)
  );
}

// export const getUserData = async () => {
//   try {
//     const response = await axios.post(`${URL}/signin/consultant`);

//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError;

//     return err.response?.data;
//   }
// };
