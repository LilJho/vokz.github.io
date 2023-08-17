import { useState, useEffect, DragEventHandler, RefObject } from "react";

interface UseDragCounter {
  dragCounter: boolean;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function useDragCounter(
  ref: RefObject<HTMLElement>,
  setIsValid: (isValid: boolean) => void
): UseDragCounter {
  const [counter, setCounter] = useState(0);

  const handleDragEnter: EventListener = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDragLeave: EventListener = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCounter((prevCounter) => {
      if (prevCounter === 1) {
        setIsValid(true);
      }
      return prevCounter - 1;
    });
  };

  useDragEvents(ref, handleDragEnter, handleDragLeave);

  return { dragCounter: counter > 0, setCounter };
}

function useDragEvents(
  ref: RefObject<HTMLElement>,
  handleDragEnter: EventListener,
  handleDragLeave: EventListener
): void {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragleave", handleDragLeave);

    return () => {
      element.removeEventListener("dragenter", handleDragEnter);
      element.removeEventListener("dragleave", handleDragLeave);
    };
  }, [ref, handleDragEnter, handleDragLeave]);
}
