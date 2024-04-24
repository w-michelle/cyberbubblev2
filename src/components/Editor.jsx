/* eslint-disable no-unused-vars */

import {
  Editor as DraftEditor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
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

  const handleBold = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const handleItalic = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderline = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const save = async (data) => {
    await setDoc(doc(db, "editor", docId), { userId: user.uid, content: data });
  };
  const onSave = async (contentState) => {
    const object = convertToRaw(contentState);
    const data = JSON.stringify(object);
    await save(data);
  };
  const handleChange = async (editorState) => {
    setEditorState(editorState);
    await onSave(editorState.getCurrentContent());
  };

  const getContent = async () => {
    const q = query(collection(db, "editor"), where("userId", "==", user.uid));
    let data = await getDocs(q);
    let arr = data.docs.map((doc) => ({ ...doc.data() }));
    if (arr.length !== 0) {
      let content = arr[0].content;
      try {
        let parsedContent = JSON.parse(content);
        const object = convertFromRaw(parsedContent);
        setEditorState(EditorState.createWithContent(object));
      } catch (error) {
        console.error("Error parsing JSON content:", error);
      }
    }
  };

  const initializeEditDoc = async () => {
    const collectionRef = collection(db, "editor");
    const q = query(collectionRef, where("userId", "==", user.uid));
    //check for doc id
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = snapshot.docs.map((doc) =>
        doc.id ? { ...doc.data(), id: doc.id } : ""
      );
      //if there is doc id, set it if not create a new doc to create an id
      if (arr.length === 0) {
        addDoc(collectionRef, {
          userId: user.uid,
          content: "",
        });
      } else {
        setDocId(arr[0].id);
      }
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (user) {
      initializeEditDoc();
      getContent();
    }
  }, [user]);

  return (
    <>
      <div className="flex items-center space-between">
        <div className="flex gap-4 mb-2 ml-auto pr-2">
          <button className="text-gray-200" onMouseDown={handleBold}>
            B
          </button>
          <button className="text-gray-200 italic" onMouseDown={handleItalic}>
            I
          </button>
          <button
            className="text-gray-200 underline"
            onMouseDown={handleUnderline}
          >
            U
          </button>
        </div>
      </div>

      <div className="lg:mb-0 mb-4 shadow-custom rounded-xl">
        <div className="lg:h-[430px] md:h-[350px] scrollbar bg-black h-[300px] overflow-auto text-xs text-gray-200 p-4">
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
