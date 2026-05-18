"use client";

import { DropZone } from "@/components/upload/DropZone";

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload File</h1>
        <p className="text-muted mt-1">Upload a new file to the decentralized network.</p>
      </div>

      <DropZone />
    </div>
  );
}
