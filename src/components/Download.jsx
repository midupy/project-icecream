import React, { useState } from "react";

// Libraries
import styled from "styled-components";
import jsPDF from "jspdf";

// Utils
import { useFrames } from "../store/contexts/frames.context";

const ButtonContainer = styled.div`
  width: 70%;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;
  border-radius: 30px;
  margin: 1rem auto 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

const Div = styled.div`
  background: #333333;
  border-radius: 7px;

  padding: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 15px;
  margin-bottom: 1rem;
  border-radius: 2rem;
  border: 1px solid rgb(102, 102, 102);
  font-size: 1.2rem;
  line-height: 1.6;
  background: transparent;
  color: rgb(102, 102, 102);
`;

const Download = () => {
  const [state] = useFrames();
  const [textInput, setTextInput] = useState(""); // Estado para armazenar o texto do nome
  const [setorInput, setSetorInput] = useState(""); // Estado para armazenar o texto do setor

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = (ref) => {
    const pdfWidthCm = 7.9;
    const pdfHeightCm = 7.9;
    const dpi = 300;

    // Converter as dimensões do cm para pontos
    const pdfWidth = 222;
    const pdfHeight = 222;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [pdfWidth, pdfHeight],
    });

    const dataURL = ref.current.toDataURL({ pixelRatio: 4 });

    pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text(textInput, 111, 175, "center"); // Usar o texto do estado no método pdf.text
    pdf.setFont("helvetica", "regular");
    pdf.setFontSize(8);
    pdf.text(setorInput, 111, 185, "center");

    const fileName = textInput + "-" + setorInput + ".pdf";

    pdf.save(fileName);
  };

  return (
    <div>
      <Input
        placeholder="Nome do colaborador"
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)} // Atualizar o estado com o valor do input
      />
      <Input
        placeholder="Nome do setor"
        type="text"
        value={setorInput}
        onChange={(e) => setSetorInput(e.target.value)} // Atualizar o estado com o valor do input
      />
      <ButtonContainer onClick={() => handleDownload(state.stageDetails.ref)}>
        Gerar figurinha
      </ButtonContainer>
    </div>
  );
};

export default Download;
