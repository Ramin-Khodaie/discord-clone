"use client";

import React from "react";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ value, endpoint, onChange }: FileUploadProps) => {
  return <div>FileUpload</div>;
};

export default FileUpload;

