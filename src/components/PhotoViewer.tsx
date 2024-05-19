import { useEffect, useRef } from "react";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import "viewerjs/dist/viewer.js";

interface PhotoViewerProps {
  images: Array<{ imagePath: string; alt: string }>;
  directory: string;
  name: string;
  title: string;
  minHeight: string;
}

export default function PhotoViewer({
  images,
  directory,
  name,
  title,
  minHeight = "150px",
}: PhotoViewerProps) {
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
        items: 1,
        responsive: {
          640: {
            edgePadding: 30,
            gutter: 20,
            items: 2,
          },
          700: {
            gutter: 0,
          },
          900: {
            gutter: 0,
            items: 3,
          },
        },
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
            <h3 className="m-0">{title}</h3>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-orange-500 text-sm self-center hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              ref={prevButtonRef}
            >
              Prev
            </button>
            <button
              className="bg-orange-500 text-sm self-center hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              ref={nextButtonRef}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div>
        <ul ref={imageDom} style={{ minHeight }} className="flex items-center">
          {images.map((img, index) => {
            return (
              <li key={`${name}-${index}`} className="relative">
                <img
                  style={{ minHeight }}
                  className="bg-slate-400"
                  src={`${directory}/${img.imagePath}`}
                  alt={img.imagePath}
                  //   bg-slate-400
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
