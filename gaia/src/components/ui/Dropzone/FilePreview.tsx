import React, { FormEvent } from "react";
import Image from "next/image";
import { RiCloseFill, RiDeleteBin5Line } from "react-icons/ri";

interface IFilePreviewProps {
  previewUrl: string;
  file: string;
  handleRemoveImage: () => void;
  imageName: string;
  deleteTrigger: JSX.Element;
}

const FilePreview = ({
  previewUrl,
  file,
  imageName,
  handleRemoveImage,
  deleteTrigger,
}: IFilePreviewProps) => {

  return (
    <div className="flex items-center border border-gray-200 p-1.5 rounded-lg gap-4">
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Preview"
          className="object-cover w-10 h-10 rounded"
          width={60}
          height={60}
        />
      ) : <div className="w-10 h-10 rounded bg-gray-200"></div>}
      <div className="flex items-center justify-between w-full">
        {(() => {
          if (!file && !imageName) {
            return <p className="text-gray-400 truncate max-w-md">No selected photo</p>;
          }

          if (file && file !== imageName) {
            return (
              <>
                <p className="text-gray-800 truncate max-w-md">{file}</p>
                <RemoveImage handleRemoveImage={handleRemoveImage} />
              </>
            );
          }

          if (!file && imageName) {
            return (
              <>
                <p className="text-gray-800 truncate max-w-md">{imageName}</p>
                {deleteTrigger}
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default FilePreview;

interface IRemoveImageProps {
  handleRemoveImage: () => void;
  type?: "remove" | "delete"
}

const RemoveImage = ({ handleRemoveImage, type = "remove" }: IRemoveImageProps) => {
  return (
    <button
      className="mr-4 text-red-600 hover:text-red-800"
      onClick={handleRemoveImage}
      type="button"
    >
      {type === "remove" ? <RiCloseFill className="w-6 h-6 text-inherit" /> : <RiDeleteBin5Line className="w-6 h-6 text-inherit" />}
    </button>
  );
};
