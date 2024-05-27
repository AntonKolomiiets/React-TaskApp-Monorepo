import DogPictureContainer from "../DogPictureContainer/DogPictureContainer";
import DogPictureExpandedContainer from "../DogPictureExpandedContainer/DogPictureExpandedContainer";
import { useState } from "react";

// struct
interface DogCardProps {
  imageUrl: string;
}

export default function DogCard({ imageUrl }: DogCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleDetails}>
      <DogPictureContainer imageUrl={imageUrl} />
      {isOpen && <DogPictureExpandedContainer imageUrl={imageUrl} />}
    </div>
  );
}
