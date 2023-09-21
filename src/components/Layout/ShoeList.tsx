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
                      />
                      <p>{item?.name}</p>
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
