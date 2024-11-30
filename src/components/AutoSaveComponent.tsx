import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { DocumentType } from "../lib/constants";
import axios from "axios";

interface Props {
  documents: DocumentType[];
}

const AutoSaveComponent = ({ documents }: Props) => {
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState<number | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  const documentsRef = useRef(documents);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaveTime) {
        const elapsed = Math.floor(
          (Date.now() - lastSaveTime.getTime()) / 1000
        );
        setTimeSinceLastSave(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  const saveDocuments = async (documents: DocumentType[]) => {
    await axios.post("/api/documents", documents);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (documentsRef.current.length > 0) {
      interval = setTimeout(async () => {
        setIsSaving(true);
        try {
          await saveDocuments(documents);
          setLastSaveTime(new Date());
        } catch (err) {
          console.error("Failed to save:", err);
        } finally {
          setIsSaving(false);
          setTimeSinceLastSave(0);
        }
      }, 5000);
    }
    documentsRef.current = documents;

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [documents]);

  return (
    <div className="flex justify-end w-full pb-8">
      {isSaving ? (
        <LoadingSpinner />
      ) : lastSaveTime ? (
        <span>Last saved {timeSinceLastSave ?? 0} seconds ago</span>
      ) : (
        <span>Not saved yet</span>
      )}
    </div>
  );
};

export default AutoSaveComponent;
