import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
// import AwesomeSlider from "react-awesome-slider";
// import withAutoplay from "react-awesome-slider/dist/autoplay";
import { Carousel } from "react-carousel-minimal";
import { bannerApi, articleApi } from "../api";
import useDebounce from "../utils/useDebounce";
function Home() {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 700);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["banners"],
    queryFn: bannerApi,
  });
  const {
    isLoading: isLoadingArticles,
    isError: isErrorArticles,
    data: dataArticles,
    error: erorrArticles,
  } = useQuery({
    queryKey: ["articles", limit, debouncedSearch],
    queryFn: articleApi,
    keepPreviousData: true,
  });
  const renderMain = useMemo(() => {
    return (
      <div className="app bg-gray-900">
        {data?.length && !isLoading && (
          <Carousel
            data={data?.map((el) => {
              return { image: el?.images };
            })}
            time={3000}
            width="100%"
            height="500px"
            // captionStyle={captionStyle}
            radius="10px"
            // slideNumberStyle={slideNumberStyle}
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            style={{
              textAlign: "center",
              maxWidth: "auto",
              maxHeight: "500px",
              margin: "20px",
            }}
            className="sm:max-w-screen-sm sm:max-w-screen-md sm:max-w-screen-lg sm:max-w-screen-xl"
          />
        )}
        <div className="mx-auto max-w-screen-xl px-4 my-20">
          <div className="grid md:grid-cols-2 lg:gap-12 gap-6">
            <h2 className="text-white font-bold text-2xl flex items-center">
              Articles
            </h2>
            <div class="relative flex justify-end items-center">
              <input
                type="search"
                class="dark:bg-gray-800 shadow rounded border-0 p-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-white"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {dataArticles?.map((el, idx) => {
              return (
                <article key={idx} className="flex xl:flex-row flex-col">
                  <a href="/" className="xl:mb-0 mb-2">
                    <img
                      src={el?.image}
                      className="max-w-xs rounded-xl mr-5 "
                    ></img>
                  </a>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-white leading-5 text-lg font-bold mb-2">
                      {el?.title}
                    </h2>
                    <p className="text-gray-400 mb-4 font-light max-w-sm">
                      {el?.previewContent}
                    </p>
                    <a
                      href={"articles/" + el.id}
                      className="text-blue-500 underline underline-offset-4 hover:no-underline font-medium"
                    >
                      Preview Content
                    </a>
                  </div>
                </article>
              );
            })}
            {isLoadingArticles ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              !debouncedSearch && (
                <div className="flex justify-start">
                  {limit < 50 && (
                    <button
                      onClick={(e) => {
                        setLimit(limit + 10);
                      }}
                      className="text-blue-500 underline underline-offset-4 hover:no-underline font-medium"
                    >
                      <p>View More</p>
                    </button>
                  )}
                </div>
              )
            )}
            {!debouncedSearch && (
              <div className="flex md:justify-end">
                {limit > 10 && (
                  <button
                    onClick={(e) => {
                      setLimit(limit - 10);
                    }}
                    className="text-blue-500 underline underline-offset-4 hover:no-underline font-medium"
                  >
                    <p>View Less</p>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [data, dataArticles, limit, search]);
  return renderMain;
}

export default Home;
