import { CropRegionsType } from "@/lib/types";
import { createWorker } from "tesseract.js";

let loading: {};

const convertToGrayscale = (imageData: ImageData) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  return imageData;
};

const preProcessImage = (imageSrc: string, cropRegions: CropRegionsType[]) => {
  const image = new Image();
  image.src = imageSrc;
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleFactor = 0.55; // Adjusted for further scaling

      // Upscale the canvas dimensions
      canvas.width = cropRegions[0].width * scaleFactor;
      canvas.height =
        cropRegions.reduce((sum, region) => sum + region.height, 0) *
        scaleFactor;

      let currentY = 0;
      for (const region of cropRegions) {
        ctx?.drawImage(
          image,
          region.x,
          region.y,
          region.width,
          region.height, // Source rectangle
          0,
          currentY,
          region.width * scaleFactor,
          region.height * scaleFactor // Destination rectangle
        );
        currentY += region.height * scaleFactor;
      }

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height); // You can adjust blockSize and C based on your images
      ctx?.putImageData(convertToGrayscale(imageData!), 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = reject;
  });
};

const handleExtractText = async (image: string) => {
  const worker = await createWorker({
    logger: (m) =>
      (loading = {
        loading: m.progress * 100,
        status: m.status,
      }),
  });

  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const {
    data: { text },
  } = await worker.recognize(
    image,
    { rotateAuto: true },
    { imageColor: true, imageGrey: true, imageBinary: true }
  );
  await worker.terminate();
  return text;
};

const extractTextFromRegion = async (
  imageSrc: string,
  region: CropRegionsType
) => {
  const processedImage = await preProcessImage(imageSrc, [region]); // Process only the current region
  let text = await handleExtractText(processedImage as unknown as string);
  text = text.replace(/\n/g, "").trim();
  return text;
};

interface ProcessAndExtractType<T> {
  getStructuredData: (res: T[]) => T[];
  regions: CropRegionsType[];
  image: string;
}

export const processAndExtract = async <T>({
  getStructuredData,
  regions,
  image,
}: ProcessAndExtractType<T>) => {
  const textExtractionPromises = regions.map((region) =>
    extractTextFromRegion(image, region)
  );
  const results = await Promise.all(textExtractionPromises);
  // Map the results to the dailyMedicalReportData structure
  return { extractedText: getStructuredData(results as T[]), loading };
  // Update the state
};
