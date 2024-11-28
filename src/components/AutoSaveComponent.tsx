import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { DocumentType } from "../lib/constants";

interface Props {
  documents: DocumentType[];
  saveDocuments: (documents: DocumentType[]) => Promise<any>;
}

const AutoSaveComponent = ({ documents, saveDocuments }: Props) => {
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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    console.log("INside use Effect", documentsRef.current);
    if (documentsRef.current.length > 0) {
      interval = setTimeout(async () => {
        setIsSaving(true);
        try {
          await saveDocuments(documents);
          setLastSaveTime(new Date());
        } catch (error) {
          console.error("Failed to save:", error);
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
