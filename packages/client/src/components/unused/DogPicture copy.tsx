import { useQuery } from "react-query";
import DogPictureContainer from "../DogPictureContainer/DogPictureContainer";
import DogPictureExpandedContainer from "../DogPictureExpandedContainer/DogPictureExpandedContainer";
import { useState } from "react";

export default function DogPicture() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const fetchImageUrl = async () => {
    const url = "https://dog.ceo/api/breeds/image/random";
    const response = await fetch(url);
    const data = await response.json();
    return data.message; 
  };

  const {
    data: imageUrl,
    isError,
    isLoading,
  } = useQuery("fetchImageUrl", fetchImageUrl);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !imageUrl)
    return <p>Error loading image or no image available.</p>;

  return (
    <div onClick={toggleDetails}>
      <DogPictureContainer imageUrl={imageUrl} />
      {isOpen && <DogPictureExpandedContainer imageUrl={imageUrl} />}
    </div>
  );
}
