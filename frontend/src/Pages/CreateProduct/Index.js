import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { uniqueId } from "lodash";
import filesize from "filesize";

import api from "../../Services/api";
import { useHistory } from "react-router-dom";
import "./index.css";
import FileList from "../../components/FileList/index.js";

import { DropContainer, UploadMessage } from "./style";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState([]);
  const [product, setProduct] = useState({});
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    let { data } = await api.post("/new-product", {
      name,
      price,
      quantity
    });

    photo.forEach( p => processUpload(p, data.id));
  }
  
  function handleUpload(files) {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    setPhoto(photo.concat(uploadedFiles));

    //uploadedFiles.forEach(processUpload);
  }

  function processUpload(file, id) {
    const data = new FormData();
    data.append("file", file.file, file.name);
    
    api
      .post(`/new-product/${id}/photos`, data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          updateFile(file.id, {
            progress
          });
        }
      })
      .then(response => {
        updateFile(file.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url
        });
      })
      .catch(() => {
        updateFile(file.id, {
          error: true
        });
      });
  }

  function updateFile(id, data) {
    setPhoto(
      photo.map(f => {
        return id === f.id ? { ...f, ...data } : f;
      })
    );
  }

  function dragMessage(isDragActive, isDragReject) {
    if (!isDragActive)
      return <UploadMessage>Arraste os arquivos aqui...</UploadMessage>;
    if (isDragReject)
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  }

  return (
    <>
      <div>
        <strong>Cadastre um produto</strong>
        <form onSubmit={handleSubmit}>
          <p>
            Nome:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </p>
          <p>
            Preço:
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </p>
          <p>
            Quantidade:
            <input
              type="text"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </p>
          <div className="upload-img">
            <Dropzone accept="image/*" onDropAccepted={handleUpload}>
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject
              }) => (
                <DropContainer
                  {...getRootProps()}
                  isDragActive={isDragActive}
                  isDragReject={isDragReject}
                >
                  <input {...getInputProps()} />
                  {dragMessage(isDragActive, isDragReject)}
                </DropContainer>
              )}
            </Dropzone>
            {!!photo.length && <FileList files={photo} />}
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}
