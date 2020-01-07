import React from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import { Container, FileInfo, Preview } from "./styles";
import { MdLink, MdError, MdCheckCircle } from "react-icons/md";

import "react-circular-progressbar/dist/styles.css";

export default function FileList({ files }) {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize} </span>
            </div>
          </FileInfo>
          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{ root: { width: 24 }, path: { stoke: "#7159c1" } }}
                strokeWidth={10}
                percentage={uploadedFile.progress}
              />
            )}
            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}
