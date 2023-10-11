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
    title: string;
  } = { images: [], directory: "", name: "default-name", title: "Screenshots" }
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
        autoplay: false,
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
      <div className="relative top-10">
        <div className="flex gap-4 justify-between">
          <div>
            <h3 className="m-0">{props.title}</h3>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-orange-500 text-sm hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              ref={prevButtonRef}
            >
              Prev
            </button>
            <button
              className="bg-orange-500 text-sm hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              ref={nextButtonRef}
            >
              Next
            </button>
          </div>
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
