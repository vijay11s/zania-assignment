import DocumentCard from "./components/DocumentCard";
import { useState, useEffect } from "react";
import axios from "axios";
import AutoSaveComponent from "./components/AutoSaveComponent";
import { DocumentType, thumbnails } from "./lib/constants";
import Overlay from "./components/Overlay";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [overlayImage, setOverlayImage] = useState<string>("");
  const [documentsLoading, setDocumentsLoading] = useState<boolean>(false);

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
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setDocumentsLoading(true);
      const res = await axios.get("/api/documents");
      setDocuments(res?.data ?? []);
    } catch (err) {
      console.error("Failed to fech data from server", err);
    } finally {
      setDocumentsLoading(false);
    }
  }

  if (documentsLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex items-center min-h-screen justify-center">
      <div>
        <AutoSaveComponent documents={documents} />
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
