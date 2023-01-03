import ImageGallery from "react-image-gallery";
import "./CarouselStyle.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

// const images = [
//   {
//     original:
//       "https://www.seabookings.com/photos/original/971-you-even-encounter-some-friendly-dolphins-1575397384-jpg",
//     thumbnail:
//       "https://www.seabookings.com/photos/original/971-you-even-encounter-some-friendly-dolphins-1575397384-jpg",
//   },
//   {
//     original:
//       "https://thumbs.dreamstime.com/b/spring-summer-land%E2%80%A6ountryside-grass-poland-water-leaves-58070004.jpg",
//     thumbnail:
//       "https://thumbs.dreamstime.com/b/spring-summer-land%E2%80%A6ountryside-grass-poland-water-leaves-58070004.jpg",
//   },
//   {
//     original:
//       "https://thumbs.dreamstime.com/b/sailing-boat-wide-angle-view-sea-instagram-toning-50855721.jpg",
//     thumbnail:
//       "https://thumbs.dreamstime.com/b/sailing-boat-wide-angle-view-sea-instagram-toning-50855721.jpg",
//   },
// ];

type PropsCarrusel = {
  original: string;
  thumbnail: string;
};

export const CarouselImages = (images: string[]) => {
  const [listCarrusel, setListCarrusel] = useState<PropsCarrusel[]>([]);

  useEffect(() => {
    Object.values(images).forEach((image) => {
      let newArray = listCarrusel;
      newArray.push({ original: image, thumbnail: image });

      setListCarrusel(newArray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="carousel-demo">
      <Box className="card" sx={{ p: 4 }}>
        <ImageGallery
          lazyLoad={true}
          showPlayButton={false}
          showNav={true}
          thumbnailPosition={"bottom"}
          showFullscreenButton={false}
          items={listCarrusel}
        />
      </Box>
    </Box>
  );
};
