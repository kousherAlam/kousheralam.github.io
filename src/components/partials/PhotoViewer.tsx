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
  // const autoPlayButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
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
    if (prevButtonRef.current && nextButtonRef.current) {
      var slider = tns({
        container: imageDom.current,
        items: 3,
        slideBy: "page",
        mouseDrag: true,
        prevButton: prevButtonRef.current,
        nextButton: nextButtonRef.current,
        autoplay: true,
      });
    }
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
      <div className="text-right">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            ref={prevButtonRef}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            ref={nextButtonRef}
          >
            Next
          </button>
        </div>
      </div>
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
