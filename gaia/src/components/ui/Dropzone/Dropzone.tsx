"use client"

import React, { useRef, useState, DragEvent, memo } from "react";
import { FiX, FiUploadCloud, FiCheck } from "react-icons/fi";
import useDragCounter from "@/hooks/useDragCounter";
import { formatAcceptedTypes } from "@/helper/formatAcceptedTypes";
import { formatFileSize } from "@/helper/formatFileSize";
import { toast } from "../use-toast";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  acceptedTypes?: string[];
  maxSize?: number;
  label?: string;
  required?: boolean;
  onDrop: (file: File) => void;
  description?: string;
  className?: string
}

const Dropzone: React.FC<DropzoneProps> = ({
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"],
  maxSize = 5000000,
  label = "",
  required = false,
  onDrop,
  description = "",
  className = ""
}) => {
  const [isValid, setIsValid] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const { dragCounter, setCounter } = useDragCounter(dropZoneRef, setIsValid);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.items;
    if (acceptedTypes && files.length > 0) {
      const fileTypeIsValid = acceptedTypes.includes(files[0].type);
      // New file size check
      let fileSizeIsValid = true;
      const file = files[0].getAsFile();
      if (file && maxSize) {
        fileSizeIsValid = file.size <= maxSize;
      }

      setIsValid(fileTypeIsValid && fileSizeIsValid);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const file = files[0];

    if (validateFile(file)) {
      setIsValid(true);
      onDrop(file);
    } else {
      console.log("hey", validateFile(file))
      setIsValid(false);
      toast({
        title: "Error",
        description: "Invalid file type or size. Please try again.",
        variant: "destructive",
      })
    }
    setTimeout(() => {
      setIsValid(true);
      setCounter(0);
    }, 100);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsValid(true); // Reset the isValid state when dragging leaves the drop zone
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files![0];
    if (validateFile(file)) {
      setIsValid(true);
      onDrop(file);
    } else {
      setIsValid(false);
      if (!acceptedTypes.includes(file?.type)) {
        toast({
          title: "Error",
          description: "Invalid file type. Please try again.",
          variant: "destructive",
        })
      }
      if (file?.size > maxSize) {
        toast({
          title: "Error",
          description: `Image file size exceeds ${formatFileSize(maxSize)}. Please try again.`,
          variant: "destructive",
        })
      }

    }
    setTimeout(() => {
      setIsValid(true);
      setCounter(0);
    }, 100);

    // Reset the value of the file input to ensure onChange is triggered every time
    e.target.value = '';
  };

  const validateFile = (file: File) => {
    let fileTypeIsValid = true;
    let fileSizeIsValid = true;

    if (acceptedTypes) {
      fileTypeIsValid = acceptedTypes.includes(file?.type);
    }

    if (maxSize) {
      fileSizeIsValid = file?.size <= maxSize;
    }

    return fileTypeIsValid && fileSizeIsValid;
  };

  return (
    <div
      ref={dropZoneRef}
      className={cn(`relative border-dashed border-2 rounded-lg transition-all duration-300 ease-in-out ${dragCounter
        ? isValid
          ? " border-indigo-500 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          : " border-red-500 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        : isValid &&
        " border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        } p-4 cursor-pointer`, className)}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrag={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        {dragCounter ? (
          isValid ? (
            <FiCheck className="text-indigo-500" size={48} />
          ) : (
            <FiX className="text-red-500" size={48} />
          )
        ) : (
          <FiUploadCloud className="text-primary-500" size={48} />
        )}
        <p
          className={`mt-2 text-lg font-medium ${dragCounter
            ? isValid
              ? "text-indigo-600"
              : "text-red-500"
            : "text-primary-500"
            }`}
        >
          Drag files or click to upload
        </p>
        {acceptedTypes && (
          <p className="text-sm text-gray-400">
            Accepted file types: {formatAcceptedTypes(acceptedTypes)}
          </p>
        )}
        {maxSize && (
          <p className="text-sm text-gray-400">
            Maximum file size: {formatFileSize(maxSize)}
          </p>
        )}
        {/* {!isValid && (
            <p className="mt-2 text-sm text-red-500">
              Invalid file type or size. Please try again.
            </p>
          )} */}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default memo(Dropzone);
