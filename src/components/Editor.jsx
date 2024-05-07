/* eslint-disable no-unused-vars */

import {
  Editor as DraftEditor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useState, useEffect, useTransition } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  addDoc,
  collection,
  doc,
  query,
  where,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";

function Editor() {


  const initData = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        key: "key",
        text: "",
        type: "unstyled",
        depth: 7,
        entityRanges: [],
        inlineStyleRanges: [],
        data: {},
      },
    ],
  });
  const [user, loading] = useAuthState(auth);
  const [docId, setDocId] = useState("");
  const initState = EditorState.createWithContent(initData);
  const [editorState, setEditorState] = useState(initState);
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (user) {
      initializeEditDoc();
    }
  }, [user]);

  const handleFontStyle = (e, style) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }


  const initializeEditDoc = async () => {
    const collectionRef = collection(db, "editor");
    const q = query(collectionRef, where("userId", "==", user.uid));

    const findDoc = await getDocs(q)
    let docs = findDoc.docs.map(doc => ({...doc.data(), id: doc.id}))
    if(docs.length === 0) {
      const docRef= addDoc(collectionRef, {
              userId: user.uid,
              content: "",
    });
    setDocId(docRef.id)
    } else {
      setDocId(docs[0].id)
      getContent(docs)
    }

  };
const getContent = async(docs) => {
  let content = docs[0].content
  try {
    let parsedContent = JSON.parse(content);
    const object = convertFromRaw(parsedContent);
    setEditorState(EditorState.createWithContent(object));
  } catch (error) {
    console.error("Error parsing JSON content:", error);
  }

}


  const onSave = async (contentState) => {
    const object = convertToRaw(contentState);
    const data = JSON.stringify(object);
    await setDoc(doc(db, "editor", docId), { userId: user.uid, content: data });
  };


  const handleChange = async(newEditorContent) => {
    setEditorState(newEditorContent);
    startTransition(async() => {
      await onSave(newEditorContent.getCurrentContent()); 
    })
 
  };


  return (
    <>
      <div className="flex items-center space-between">
        <div className="flex gap-2 mb-2 ml-auto pr-2">
          <button className={`w-[40px] px-2 py-1 text-gray-200 ${editorState.getCurrentInlineStyle().has('BOLD') ? 'border-[1px] rounded-md border-greyBlue': ""}`} onMouseDown={(e)=>handleFontStyle(e, 'BOLD')}>
            B
          </button>
          <button className={`w-[40px] px-2 py-1 text-gray-200 ${editorState.getCurrentInlineStyle().has('ITALIC') ? 'border-[1px] rounded-md border-greyBlue': ""}`} onMouseDown={(e)=>handleFontStyle(e, 'ITALIC')}>
            I
          </button>
          <button
            className={`w-[40px] px-2 py-1 text-gray-200 ${editorState.getCurrentInlineStyle().has('UNDERLINE') ? 'border-[1px] rounded-md border-greyBlue': ""}`}
            onMouseDown={(e)=>handleFontStyle(e, 'UNDERLINE')}
          >
            U
          </button>
        </div>
      </div>

      <div className="lg:mb-0 mb-4 shadow-custom rounded-xl">
        <div className={`${isPending ? 'cursor-wait' : 'cursor-text'} lg:h-[430px] md:h-[350px] scrollbar bg-black h-[300px] overflow-auto text-xs text-gray-200 p-4`}>
          <DraftEditor
            editorState={editorState}
            onChange={handleChange}
            placeholder=""
      
          />
        </div>
      </div>
    </>
  );
}

export default Editor;
