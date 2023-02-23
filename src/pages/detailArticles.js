import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Popover } from "@headlessui/react";
import {
  articleDetailApi,
  commentsArticleApi,
  crudCommentsArticleApi,
} from "../api";
import { useParams } from "react-router-dom";
import moment from "moment";
function DetailArticles() {
  const { id } = useParams();
  const [idComment, setIdComment] = useState(null);
  const [valueComment, setValueComment] = useState({
    user: "",
    comment: "",
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["articles", id],
    queryFn: articleDetailApi,
  });
  const {
    isLoading: isLoadingComment,
    isError: isErrorComment,
    data: dataComment,
    error: errorComment,
    refetch: refetchComment,
  } = useQuery({
    queryKey: ["comment", id],
    queryFn: commentsArticleApi,
  });
  const {
    mutate: mutateAddComment,
    isLoading: isLoadingAddComment,
    isError: isErrorAddComment,
    data: dataAddComment,
    error: errorAddComment,
  } = useMutation({
    mutationKey: ["AddArticles", id, "post"],
    mutationFn: crudCommentsArticleApi,
  });
  const {
    mutate: mutateDeleteComment,
    isLoading: isLoadingDeleteComment,
    isError: isErrorDeleteComment,
    data: dataDeleteComment,
    error: errorDeleteComment,
  } = useMutation({
    mutationKey: ["articles", id, "delete"],
    mutationFn: crudCommentsArticleApi,
  });

  const addOrEditCommentMutate = () => {
    mutateAddComment(
      [valueComment, id, idComment ? "PUT" : "POST", idComment],
      {
        onSuccess(data) {
          setValueComment({
            user: "",
            comment: "",
          });
          setIdComment(null);
          refetchComment();
        },
        onError(err) {
          console.info(err, "<<< err");
        },
      }
    );
  };
  const deleteComment = (idComment) => {
    mutateDeleteComment([valueComment, id, "DELETE", idComment], {
      onSuccess(data) {
        refetchComment();
      },
      onError(err) {
        console.info(err, "<<< err");
      },
    });
  };
  return (
    <main className="bg-grey-900 pb-16 xl:my-8 xl:mx-8 mx-4 my-4">
      <div
        className="bg-no-repeat bg-cover w-full relative "
        style={{
          backgroundImage: `url(${data?.image})`,
          backgroundPosition: "50% center",
          height: "460px",
        }}
      >
        <div className="opacity-50 bg-black w-full h-full absolute top-0 left-0"></div>
      </div>
      <div
        className="dark:bg-gray-800 xl:p-9 p-6 mx-w-xl z-20  relative xl:mx-auto mx-4 max-w-screen-xl flex flex-col rounded-xl"
        style={{ marginTop: "-9rem" }}
      >
        <header className="mb-4 lg:mb-6 not-format">
          <address className="flex items-center mb-6 not-italic">
            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                className="mr-4 w-16 h-16 rounded-full"
                src="https://e7.pngegg.com/pngimages/416/62/png-clipart-anonymous-person-login-google-account-computer-icons-user-activity-miscellaneous-computer.png"
                alt="Jese Leos"
              />
              <div>
                <a
                  href="#"
                  rel="author"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Jese Leos
                </a>
                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                  <time
                    pubdate
                    datetime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    Feb. 8, 2022
                  </time>
                </p>
              </div>
            </div>
          </address>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {data?.title}
          </h1>
        </header>
        <div className=" text-white mb-10">
          <p className="lead">{data?.content}</p>
        </div>
        <div className="max-w-2xl mx-auto px-4 ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Comment {`(${dataComment?.length})`}
            </h2>
          </div>
          <form
            id="form"
            className="mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              addOrEditCommentMutate();
            }}
          >
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                rows="6"
                value={valueComment.user}
                onChange={({ target }) => {
                  setValueComment({ ...valueComment, user: target?.value });
                }}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a name"
                required=""
              ></input>
            </div>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                value={valueComment.comment}
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                onChange={({ target }) => {
                  setValueComment({ ...valueComment, comment: target?.value });
                }}
                required=""
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {isLoadingAddComment && (
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
              )}
              {idComment ? "Edit comment" : "Post comment"}
            </button>
          </form>
          {dataComment?.map((el, idx) => {
            return (
              <article
                key={idx}
                class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
              >
                <div>
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://e7.pngegg.com/pngimages/416/62/png-clipart-anonymous-person-login-google-account-computer-icons-user-activity-miscellaneous-computer.png"
                          alt="Michael Gough"
                        />
                        {el?.user}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time
                          pubdate=""
                          datetime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {moment(el?.createdAt)?.isValid() &&
                            moment(el?.createdAt)?.format("ll")}
                        </time>
                      </p>
                    </div>
                    <Popover className="relative">
                      <Popover.Button
                        id={`dropdownComment${idx}Button`}
                        data-dropdown-toggle={"dropdownComment" + idx}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </Popover.Button>
                      <Popover.Panel className="absolute z-10">
                        {({ close }) => (
                          <div
                            id={"dropdownComment" + idx}
                            className="mt-1 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            data-popover-placement="bottom"
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby={`dropdownComment${idx}Button`}
                            >
                              <li>
                                <p
                                  onClick={() => {
                                    setValueComment({
                                      user: el?.user,
                                      comment: el?.comment,
                                    });

                                    setIdComment(el?.id);
                                    close();
                                    document
                                      .getElementById("form")
                                      .scrollIntoView({
                                        behavior: "smooth",
                                      });
                                  }}
                                  className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </p>
                              </li>
                              <li>
                                <p
                                  onClick={() => {
                                    deleteComment(el?.id);
                                    close();
                                  }}
                                  className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Remove
                                </p>
                              </li>
                            </ul>
                          </div>
                        )}
                      </Popover.Panel>
                    </Popover>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {el?.comment}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default DetailArticles;
