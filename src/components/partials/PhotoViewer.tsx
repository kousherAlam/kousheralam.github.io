import { useEffect, useRef } from "react";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import "viewerjs/dist/viewer.js";
import "tiny-slider/dist/tiny-slider.css";

export default function PhotoViewer(
  props: {
    images: Array<{ imagePath: string; alt: string }>;
    directory: string;
    name: string;
  } = { images: [], directory: "", name: "default-name" }
) {
  const imageDom = useRef(null);
  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
  };
  async function useTNS() {
    const { tns } = await import("tiny-slider");
    if (imageDom === null || imageDom.current === null) {
      return;
    }
    var slider = tns({
      container: imageDom.current,
      items: 3,
      slideBy: "page",
      autoplay: true,
    });
  }
  useEffect(() => {
    if (imageDom === null || imageDom.current === null) {
      return;
    }
    useTNS();
    const viewer = new Viewer(imageDom.current, {
      inline: false,
    });
  }, []);
  return (
    <>
      <div>
        <ul ref={imageDom}>
          {props.images.map((img, index) => {
            return (
              <li
                key={`${props.name}-${index}`}
                style={{ position: "relative" }}
              >
                <img
                  loading="lazy"
                  src={`${props.directory}/${img.imagePath}`}
                  alt={img.imagePath}
                  //   style={imgStyles}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
