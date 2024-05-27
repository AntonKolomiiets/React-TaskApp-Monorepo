import "./PictureGrid.css";
import { useInfiniteQuery } from "react-query";
import { useRef, useEffect } from "react";
import DogCard from "../DogCard/DogCard";

// struct
interface ImageResponse {
  message: string;
  status: string;
}

// API
const DOG_API = "https://dog.ceo";

// fetch function
const fetchImageUrl = async () => {
  const res = await fetch(DOG_API + "/api/breeds/image/random");
  const data: ImageResponse = await res.json();
  return data.message;
};

// Main
export default function PictureGrid() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery<string, Error>("dogImages", fetchImageUrl, {
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || isFetchingNextPage) return;

    const currentObserver = observer.current;
    if (currentObserver) currentObserver.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        console.log("Fetching next page");  // Debug log
        fetchNextPage();
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]);

  if (isLoading)
    return <img src="src/assets/Spinner@1x-1.0s-200px-200px-2.svg" />;
  if (isError) return <p>Error loading images</p>;

  // Render
  return (
    <div className="cardCont">
      {data?.pages.map((url: string, index) => (
        <DogCard key={index} imageUrl={url} />
      ))}
      <div
        ref={lastElementRef}
        style={{ height: "1px", visibility: "hidden" }}
      ></div>
      {isFetchingNextPage && (
        <img src="src/assets/Spinner@1x-1.0s-200px-200px-2.svg" />
      )}
    </div>
  );
}
