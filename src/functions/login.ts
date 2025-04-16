export async function LoginFn(info: FormData) {
  const apiUrl = `${import.meta.env.VITE_APP_SECRET}/api/login`;
  console.log(apiUrl);
  let errorMessage;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        lang: "en",
      },

      body: info,
    });

    if (!response.ok) {
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
  } catch (err) {
    console.error("Error :", errorMessage);
    return errorMessage;
  }
}
