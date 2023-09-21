import { useState, useEffect } from "react";
import shoes from "../../../data.json";
import Image from "next/image";
import { DragDropContext, DropResult, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "@components/helpers/Dropable";

import styles from "./ShoeList.module.css";

interface ItemType {
  id: number;
  image: string;
  name: string;
}

export default function ShoeList() {
  const sneaks = shoes.sneakers;
  const [images, setImages] = useState<ItemType[]>(sneaks);
  const [searchimg, setSearchImg] = useState<string>("");
  const [filtered, setFiltered] = useState<ItemType[]>(sneaks);

  useEffect(() => {
    if (searchimg.trim() === "") {
      // If the search input is empty, display all images
      setFiltered(images);
    } else {
      // filter the images based on search input
      const filteredList = images.filter((item) =>
        item.name.toLowerCase().includes(searchimg.toLowerCase())
      );
      setFiltered(filteredList);
    }
  }, [searchimg, images]);

  // configurations for next blur data url
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  // configurations for beautiful drag and drop

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedImages = [...filtered];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setFiltered(reorderedImages);
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearchImg(e.target.value)}
        placeholder="search image here"
        className={styles.inputz}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sneaker-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.container}
            >
              {filtered.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={styles["show-info"]}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Image
                        src={item.image}
                        width={200}
                        height={200}
                        alt="chukwuemeka"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={rgbDataURL(237, 181, 6)}
                      />
                      <p className={styles["shoe-name"]}>{item?.name}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
