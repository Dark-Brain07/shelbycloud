"use client";

import { FileTable } from "@/components/files/FileTable";

export default function FilesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Files</h1>
        <p className="text-muted mt-1">Browse and manage your uploaded blobs.</p>
      </div>

      <FileTable />
    </div>
  );
}
