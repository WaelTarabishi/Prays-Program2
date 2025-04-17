"use server";
import Cookies from "js-cookie";
export async function GetHadiths() {
  const apiUrl = `${import.meta.env.VITE_APIKEY}/api/hadiths/getAll`;
  let errorMessage;

  const prayerTimeIdlebTimeAdminToken = Cookies.get(
    "prayerTimeIdlebTimeAdminToken"
  );

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${prayerTimeIdlebTimeAdminToken}`,
      },
    });

    if (!response.ok) {
      // Log more information about the response
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || "An error occurred during login";
      } catch {
        errorMessage = errorText || "An error occurred during login";
      }
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error :", errorMessage);
    return errorMessage;
  }
}
