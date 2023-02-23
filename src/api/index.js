export const bannerApi = async () => {
  const response = await fetch(
    "https://62d5368fd4406e5235558a46.mockapi.io/banners"
  );
  return response.json();
};

export const articleApi = async ({ queryKey }) => {
  let url =
    "https://62d5368fd4406e5235558a46.mockapi.io/articles?page=1&limit=" +
    queryKey[1];
  if (!!queryKey[2]) {
    url += `&search=${queryKey[2]}`;
  }
  const response = await fetch(url);
  return response.json();
};

export const articleDetailApi = async ({ queryKey }) => {
  console.info(queryKey[1], "><<< limit");
  const response = await fetch(
    "https://62d5368fd4406e5235558a46.mockapi.io/articles/" + queryKey[1]
  );
  return response.json();
};

export const commentsArticleApi = async ({ queryKey }) => {
  console.info("masuk sini ", queryKey);
  const response = await fetch(
    "https://62d5368fd4406e5235558a46.mockapi.io/articles/" +
      queryKey[1] +
      "/comments"
  );
  return response.json();
};
export const crudCommentsArticleApi = async (key) => {
  console.info(key, "><<< limit");
  if (!key[0]?.user) {
    key[0].user = "Anonymous";
  }
  const payload = {
    headers: {
      "Content-Type": "application/json",
    },
    method: key[2],
    // body: JSON.stringify(key[0]),
  };
  if (!key[2] !== "DELETE") {
    payload.body = JSON.stringify(key[0]);
  }

  const response = await fetch(
    key[2] === "POST"
      ? "https://62d5368fd4406e5235558a46.mockapi.io/articles/" +
          key[1] +
          "/comments"
      : "https://62d5368fd4406e5235558a46.mockapi.io/articles/" +
          key[1] +
          "/comments/" +
          key[3],
    {
      ...payload,
    }
  );
  return response.json();
};

// export const  = async ({ queryKey }) => {
//   console.info(queryKey[1], "><<< limit");
//   const response = await fetch(
//     "https://62d5368fd4406e5235558a46.mockapi.io/articles/" + queryKey[1]
//   );
//   return response.json();
// };
