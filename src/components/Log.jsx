
import { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineTipsAndUpdates } from "react-icons/md";



import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { formatLogDate, formatMsgTime } from "../utils/formatTime";

function Log() {
  const navigate = useNavigate()

  const messageEndRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [user, loading] = useAuthState(auth);


  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
        unsubscribe = await loadMessages();
    })();
    return () => {
        unsubscribe(); 
    };
}, [user, loading]);


  const handleInput = (e) => {
    setMessageText(e.target.value);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveMessage = async (e) => {
    if (e.keyCode === 13 && messageText.length > 0) {
      try {
        const collectionRef = collection(db, "mylog");
        await addDoc(collectionRef, {
          name: user.displayName,
          message: messageText,
          timestamp: serverTimestamp(),
          popup: false,
          userId: user.uid,
        });
        setMessageText("");
        await loadMessages(); // wait for loadMessages to complete before setting the state
      } catch (error) {
        console.log("Error writing new message to database", error);
      }
    }
  };

  const loadMessages = () => {
    if (loading) return () => {};
    if (!user) {
      navigate('/')
      return () => {}
    }
    const collectionRef = collection(db, "mylog");
    const q = query(collectionRef, where("userId", "==", user.uid));
   return onSnapshot(q, (snapshot) => {
      let arr = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let order = arr
        .map((item) => ({
          ...item,
          timestamp: item.timestamp ? item.timestamp.toDate() : null,
        }))
        .sort((a, b) => a.timestamp - b.timestamp);

      setAllMessages(order);
    });
    
  };

  const deleteMessage = async (id) => {
    const docRef = doc(db, "mylog", id);
    await deleteDoc(docRef);
  };
  const showPopup = (id) => {
    let updatemsg = allMessages.map((item) => {
      return item.id === id ? { ...item, popup: !item.popup } : item;
    });

    setAllMessages(updatemsg);
  };


  return (
    <>
      <div className="w-10/12 mx-auto">
        <div className="my-4 flex items-center">
          <MdOutlineTipsAndUpdates className="tips text-white/10 hover:text-white hover:cursor-pointer text-[22px]" />
          <p className="tipstext ml-2 text-sm opacity-0 text-white/50">
            Click on the message to toggle the delete button.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="lg:w-2/5 md:w-1/2 sm:w-3/5 w-11/12 h-[500px] mt-6 scrollbar bg-black shadow-custom rounded-md text-xs overflow-auto p-4">
          <ul>
            {allMessages.map((msg, index) => (
              <li key={msg.id} id="message-bubble" className="mb-3">
                {msg && msg.timestamp && (
                  <>
                    <p id="time" className="tracking-wider text-grey">
                      {formatLogDate(msg.timestamp)}
                    </p>

                    <p
                      onClick={() => showPopup(msg.id)}
                      className="p-3 bg-darkgrey text-gray-200 rounded-lg mt-2 mb-1"
                    >
                      {msg.message}
                    </p>
                    <div className="flex">
                      <p className="ml-3 text-grey text-xxs tracking-wider">
                        {formatMsgTime(msg.timestamp)}
                      </p>
                      {allMessages[index].popup && (
                        <button
                          className="bg-red ml-auto mr-2 p-1 rounded-md"
                          onClick={() => deleteMessage(msg.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
            <div ref={messageEndRef} />
          </ul>
        </div>
        <div className="lg:w-2/5 md:w-1/2 sm:w-3/5 w-11/12">
          <textarea
            onChange={handleInput}
            value={messageText}
            onKeyDown={saveMessage}
            className="lg:h-28 placeholder-lightgrey px-3 py-2 h-20 mt-2 w-full text-gray-200 rounded-md text-xs outline-none bg-black shadow-custom overflow-auto resize-none"
            type="text"
            placeholder="Brain dump . . ."
            cols="22"
          />
        </div>
      </div>
    </>
  );
}

export default Log;
