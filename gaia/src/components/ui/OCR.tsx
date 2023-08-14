"use client"

import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import ReactCrop, { type Crop } from 'react-image-crop'
import { Button } from './button';
import Dropzone from './Dropzone/Dropzone';
import { Label } from './FormControls/label';
import { mime_types } from '@/lib/utils';

import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const OCRComponent = () => {
    const [crop, setCrop] = useState<Crop>(
        { x: 1407, y: 274, width: 78, height: 47.5, unit: 'px' }
    );

    const [selectedFile, setSelectedFile] = useState({
        file: "",
        type: ""
    });

    const [croppedImage, setCroppedImage] = useState("")
    const [ocr, setOcr] = useState<string>('');
    const [progress, setProgress] = useState({
        loading: 0,
        status: ''
    });
    const [loading, setLoading] = useState(false)

    const handleExtractText = async () => {
        console.log({ croppedImage })
        if (croppedImage) {
            const { data: { text } } = await Tesseract.recognize(croppedImage, 'eng', {
                logger: (m) => (
                    setLoading(true),
                    setProgress({
                        loading: m.progress * 100,
                        status: m.status
                    })
                )
            });
            setLoading(false)
            setOcr(text);
        }
    }

    const handleImageChange = async (files: any) => {
        if (files && mime_types.IMAGE_MIME_TYPE.includes(files.type)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile({
                    file: e.target?.result as string,
                    type: "image"
                });
                onCropComplete(crop)
            };
            reader.readAsDataURL(files);

        } else if (files && mime_types.PDF_MIME_TYPE.includes(files.type)) {
            setSelectedFile({
                file: files,
                type: "pdf"
            })
        }
    };

    const onCropComplete = (crop: Crop) => {
        console.log({ crop })
        // You can access the cropped image here
        // For example, using canvas to get the cropped image data
        const image = new Image();
        image.src = selectedFile.file;
        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(
                image,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height
            );
            setCroppedImage(canvas.toDataURL());
        }
    };

    const getCroppedImg = (crop: Crop) => {
        const image = new Image();
        image.src = selectedFile.file;
        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(
                image,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height
            );
            setCroppedImage(canvas.toDataURL());
        }
    };

    return (
        <div className='gap-4 h-full'>
            <div>
                <Label>Upload File</Label>
                <Dropzone className='max-w-md px-8 py-10' onDrop={(file) => handleImageChange(file)} acceptedTypes={[...mime_types.IMAGE_MIME_TYPE, ...mime_types.PDF_MIME_TYPE]} />
                {croppedImage && <img src={croppedImage} alt="image" />}
                <Button className='mt-4 w-full max-w-md' onClick={handleExtractText}>Extract Text</Button>
                <p className='mt-4 font-medium'>Recognized Text:</p>
                {loading && <div>
                    <div className="mb-2">Progress ({progress.loading}%)</div>
                    <div className="bg-gray-200 rounded overflow-hidden max-w-sm h-3">
                        <div className="bg-green-600 w-0 h-3" style={{ width: `${progress.loading}%` }}></div>
                    </div>
                    <span className='capitalize'>{progress.status}</span>
                </div>}
                <p>{ocr}</p>
            </div>
            <div className=''>
                <Label>Photo Preview</Label>
                <div className='rounded-md'>
                    <ReactCrop
                        crop={crop}
                        onComplete={onCropComplete}
                        onChange={(crop: any) => setCrop(crop)}
                    // onImageLoaded={getCroppedImg}
                    >
                        {selectedFile.type === "pdf" &&
                            <Document file={selectedFile.file}>
                                <Page pageNumber={1} />
                            </Document>}
                        {selectedFile.type === "image" && <img src={selectedFile.file} alt="image" className='' />}
                    </ReactCrop>

                </div>
            </div>
        </div>
    );
};

export default OCRComponent;
