import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { uniqueId } from "lodash";
import filesize from "filesize";
import { Button, Modal, Form, Col } from "react-bootstrap";

import api from "../../Services/api";
import { useHistory } from "react-router-dom";
import FileList from "../../components/FileList/index.js";
import Header from "../Header/Index";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropContainer, UploadMessage } from "./style";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState([]);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const history = useHistory();

  async function handleSubmit(e) {
    let form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    let { data } = await api.post("/new-product", {
      name,
      price,
      quantity
    });

    photo.forEach(p => processUpload(p, data.id));

    setShow(true);
  }

  function Message() {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Produto cadastrado com sucessso!</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>Deseja cadastrar outro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose}>
            Sim
          </Button>
          <Button ariant="primary" onClick={() => history.push("/")}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
      <Header />
      <Message />
      <div style={{}}>
        <h1>
          <strong>Cadastre um produto</strong>
        </h1>
        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nome do produto"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Form.Label>Quantidade:</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Quantidade"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Preço do produto"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <div className="upload-img">
              <Dropzone required accept="image/*" onDropAccepted={handleUpload}>
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
            <Button type="submit">Cadastrar</Button>
          </Form>
        </div>
      </div>
    </>
  );
}
