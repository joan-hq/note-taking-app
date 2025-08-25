import NoteDetailHeader from "../components/NoteDetail/NoteDetailHeader";
import NoteDetailContent from "../components/NoteDetail/NoteDetailContent";
import NoteDetailAction from "../components/NoteDetail/NoteDetailAction";

import type { Tag } from "../types/index";

interface NoteDetailProps {
  //**Header Params */
  // title:
  title: string;
  handleTitleOnChange: () => void;
  // Tags:
  options: Tag[];
  newTagValue: string;
  handleNewTagSave: () => void;
  handleNewTagOnChange: () => void;
  //Time:
  time: string;

  //**Content Params*/
  noteValue: string;
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  //**Action Params */
  handleNoteEditSave: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  handleNoteEditCancel: () => void;
}

const options = [
  { id: "1", label: "dev" },
  { id: "2", label: "travel" },
  { id: "3", label: "study" },
  { id: "4", label: "food" },
  { id: "5", label: "location" },
  { id: "6", label: "test" },
];

const NoteDetail = ({
  //**Header Params */
  title,
  handleTitleOnChange,
  //options,
  newTagValue,
  handleNewTagSave,
  handleNewTagOnChange,
  time,
  //**Content Params*/
  noteValue,
  handleContentOnChange,
  //**Action Params */
  handleNoteEditSave,
  handleNoteEditCancel,
}: NoteDetailProps) => {
  return (
    <>
      <NoteDetailHeader
        title={title}
        handleTitleOnChange={handleTitleOnChange}
        options={options}
        newTagValue={newTagValue}
        handleNewTagSave={handleNewTagSave}
        handleNewTagOnChange={handleNewTagOnChange}
        time={time}
      />

      <NoteDetailContent
        noteValue={noteValue}
        handleContentOnChange={handleContentOnChange}
      />
      <NoteDetailAction
        handleNoteEditSave={handleNoteEditSave}
        handleNoteEditCancel={handleNoteEditCancel}
      />
    </>
  );
};

export default NoteDetail;
