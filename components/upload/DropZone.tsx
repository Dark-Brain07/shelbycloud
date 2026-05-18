"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X, CheckCircle2, Loader2 } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";
import { useState } from "react";

export function DropZone() {
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, step, isUploading, reset } = useUpload();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    disabled: isUploading,
  });

  const steps = [
    { id: 1, name: "Encode File", desc: "Generating erasure coding" },
    { id: 2, name: "Register on Aptos", desc: "Submitting Merkle root" },
    { id: 3, name: "Upload to Shelby", desc: "Sending chunks to nodes" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {!file ? (
        <div
          {...getRootProps()}
          className={`glass border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive ? "border-accent bg-accent/5 scale-[1.02]" : "border-white/10 hover:border-accent/50 hover:bg-white/5"}
          `}
        >
          <input {...getInputProps()} />
          <UploadCloud className={`w-16 h-16 mx-auto mb-4 transition-colors ${isDragActive ? "text-accent" : "text-muted"}`} />
          <h3 className="text-xl font-semibold mb-2">Drag & Drop your file</h3>
          <p className="text-muted">or click to browse from your computer</p>
        </div>
      ) : (
        <div className="glass rounded-3xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center">
                <FileIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-white max-w-[200px] sm:max-w-xs truncate">{file.name}</p>
                <p className="text-sm text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!isUploading && step === 0 && (
              <button onClick={() => setFile(null)} className="p-2 hover:bg-white/5 rounded-full text-muted hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-6">
            {steps.map((s) => {
              const isActive = step === s.id;
              const isPast = step > s.id;
              return (
                <div key={s.id} className="flex items-start gap-4">
                  <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isPast ? "bg-accent border-accent text-white" : isActive ? "border-accent text-accent animate-pulse" : "border-white/20 text-white/20"
                  }`}>
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs">{s.id}</span>}
                  </div>
                  <div>
                    <p className={`font-medium ${isActive || isPast ? "text-white" : "text-muted"}`}>{s.name}</p>
                    <p className="text-sm text-muted">{s.desc}</p>
                  </div>
                  {isActive && <Loader2 className="w-5 h-5 ml-auto text-accent animate-spin" />}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-4">
            {step === 4 ? (
              <button
                onClick={() => {
                  setFile(null);
                  reset();
                }}
                className="px-6 py-2 rounded-xl bg-surface border border-white/10 hover:bg-white/5 transition-colors"
              >
                Upload Another
              </button>
            ) : (
              <button
                onClick={() => uploadFile(file)}
                disabled={isUploading}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  isUploading ? "bg-accent/50 cursor-not-allowed" : "bg-accent hover:bg-accent-hover hover:scale-105"
                } text-white`}
              >
                {isUploading ? "Uploading..." : "Start Upload"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
