'use client';

import dynamic from 'next/dynamic';

// Import dynamique, SSR désactivé
const PdfViewer = dynamic(() => import('./PdfViewerClient'), { ssr: false });

export default PdfViewer;
