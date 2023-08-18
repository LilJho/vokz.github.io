"use client"

import React, { useEffect, useRef } from 'react';
import { getDocument } from 'pdfjs-dist';
import * as PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
function PDFViewer({ fileURL }: any) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = (canvas as any).getContext('2d');

        // Load the document
        const loadingTask = getDocument(fileURL);
        loadingTask.promise.then(pdfDocument => {
            // Render the first page
            pdfDocument.getPage(1).then(pdfPage => {
                const viewport = pdfPage.getViewport({ scale: 1.5 });

                (canvas as any).width = viewport.width;
                (canvas as any).height = viewport.height;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                pdfPage.render(renderContext);
            });
        });

        return () => {
            if (loadingTask) {
                loadingTask.destroy();
            }
        }
    }, [fileURL]);

    return <canvas ref={canvasRef} />;
}

export default PDFViewer;
