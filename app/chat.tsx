import { IcRoundAccountCircle, IcRoundSend } from "./icons";
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
        <div className="absolute right-0 left-auto top-0 h-full">
          <div className="bg-gray-800 min-w-10 max-w-20 min-h-full p-5">
            <div className="">
              {submittedValue && (
                <div>
                  <IcRoundAccountCircle />
                  <p className="dark:text-slate-400">User name</p>
                  <div className="dark:bg-slate-600 w-fit px-3 py-1 rounded-md">
                    <p>{submittedValue}</p>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex my-2">
              <input
                className="dark:bg-slate-600 rounded-l-md h-10 p-3 ml-1 items-center"
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
      ) : null}
    </div>
  );
};

export default Chat;
