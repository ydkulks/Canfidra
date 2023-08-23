import { IcRoundSend } from "./icons";
import { useState } from "react";

interface MessageProps {
  message: boolean;
}

const Chat: React.FC<MessageProps> = ({ message }) => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      setSubmittedValue(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      {message ? (
        <div className="absolute right-2 left-auto top-16 h-5/6 w-80">
          <div className="bg-zinc-800 min-w-10 max-w-20 min-h-full p-5 rounded-lg">
            {submittedValue && (
              <div className="grid justify-end">
                <div className="flex my-1 justify-end">
                  <p className="dark:text-slate-400">You</p>
                </div>
                <div className="dark:bg-green-900 w-fit max-w-[25ch] px-3 py-1 rounded-md overflow-hidden">
                  <p className="break-words whitespace-pre-wrap">
                    {submittedValue}
                  </p>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 right-2 flex">
              <form onSubmit={handleSubmit} className="flex my-2">
                <input
                  className="focus:outline-none dark:bg-slate-600 rounded-l-md h-10 p-3 ml-1 items-center"
                  type="text"
                  placeholder="Send a message"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button
                  className="text-green-500 bg-slate-600 hover:text-green-600 mr-1 rounded-r-md pr-2 pl-2"
                  type="submit"
                >
                  <IcRoundSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
