
import { UploadButton } from '@/lib/uploadthing';
import React from 'react';
type FileUploadProps = {
  imageUrl: string;
  onFieldsChange: (field: string, value: any) => void;
  setFiles: (files: any) => void;
};

const FileUploader = ({ imageUrl, onFieldsChange, setFiles }: FileUploadProps) => {
  return (
    <div className="file-uploader">
      {/* Display the uploaded image if available */}
      {imageUrl && <img src={imageUrl} alt="Uploaded" className="uploaded-image" />}

      {/* Upload Button */}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");

          // Assuming 'res' contains an array of uploaded file details
          if (res.length > 0) {
            const uploadedFileUrl = res[0].url; // Adjust based on response structure
            setFiles(res);
            onFieldsChange("imageUrl", uploadedFileUrl);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default FileUploader;
