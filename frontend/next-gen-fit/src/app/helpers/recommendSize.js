import axios from "axios";

export async function handleGetRecommend(formData) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/recommend_size", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.response?.data?.message || "An error occurred" };
  }
}
