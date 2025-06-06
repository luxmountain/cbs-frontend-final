async function fetchModel(url, options = {}) {
  try {
    const response = await fetch(`https://l3w7zl-8081.csb.app/api${url}`, {
      credentials: "include",
      ...options,
    });

    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent("unauthorized"));
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchModel error:", error);
    return null;
  }
}

export default fetchModel;
