import DocumentCard from "./components/DocumentCard";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AutoSaveComponent from "./components/AutoSaveComponent";
import { DocumentType, thumbnails } from "./lib/constants";
import Overlay from "./components/Overlay";

function App() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [overlayImage, setOverlayImage] = useState<string>("");

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedItem", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedItemIndex = parseInt(e.dataTransfer.getData("draggedItem"));

    if (draggedItemIndex === targetIndex) {
      return;
    }
    const reorderedDocuments = [...documents];
    const [draggedItem] = reorderedDocuments.splice(draggedItemIndex, 1);
    reorderedDocuments.splice(targetIndex, 0, draggedItem);
    setDocuments(reorderedDocuments);
    (e.target as any).classList.remove("opacity-50"); // reset visual feedback
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get("/api/documents");
      setDocuments(res?.data ?? []);
    } catch (err) {}
  }

  const saveDocuments = useCallback(async () => {
    try {
      await axios.post("/api/documents", documents);
    } catch (err) {}
  }, []);

  return (
    <div className="max-w-2xl mx-auto flex items-center min-h-screen justify-center">
      <div>
        <AutoSaveComponent
          documents={documents}
          saveDocuments={saveDocuments}
        />
        <div className="grid grid-cols-3 gap-12">
          {(documents ?? []).map((item, index) => (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="cursor-pointer"
              onClick={() => setOverlayImage(thumbnails[item.type])}
            >
              <DocumentCard {...item} thumbnail={thumbnails[item.type]} />
            </div>
          ))}
        </div>
      </div>
      {overlayImage && (
        <Overlay image={overlayImage} reset={() => setOverlayImage("")} />
      )}
    </div>
  );
}

export default App;
