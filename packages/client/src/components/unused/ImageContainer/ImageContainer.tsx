import { useQuery } from "react-query";
import { useBreed, useNumber } from "../../../contexts/DogsContext";

// main
export default function ImageContainer() {
  // localise global variable
  const { selectedBreed } = useBreed();
  const { selectedNumber } = useNumber();

  const fetchImageUrl = async () => {
    const url = `https://dog.ceo/api/breed/${selectedBreed.replace(
      "-",
      "/"
    )}/images/random/${selectedNumber}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.message;
  };

  const {
    data: imageUrls,
    isError,
    isLoading,
  } = useQuery<string[], Error>(
    ["fetchImageUrl", selectedBreed, selectedNumber],
    fetchImageUrl,
    {
      enabled: !!selectedBreed && !!selectedNumber,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError || !imageUrls)
    return <p>Error loading image or no images available.</p>;

  return (
    <div>
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Dog ${index + 1}`}
          style={{ marginTop: "20px", maxHeight: "300px", maxWidth: "300px" }}
        />
      ))}
    </div>
  );
}
