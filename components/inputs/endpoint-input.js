import { useEffect, useMemo, useRef, useState } from "react";
import { isValidUrl } from "../../lib/utils";
import { CrossIcon, MagnifyingGlassIcon } from "../icons";
import Input from "./input";

export default function EndpointInput({ callback }) {
  const inputRef = useRef(null);
  const [endpoint, setEndpoint] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const isValidEndpoint = useMemo(() => isValidUrl(endpoint), [endpoint]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isValidEndpoint && !isTyping) {
        if(callback) callback.call(this, endpoint);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [callback, endpoint, isTyping, isValidEndpoint]);

  return (
    <>
      <Input
        ref={inputRef}
        value={endpoint}
        placeholder="What is the destination?"
        onChange={({ target: { value } }) => setEndpoint(value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        IconLeft={() => <MagnifyingGlassIcon className="w-6 h-6 text-black" />}
        onKeyPress={() => setIsTyping(true)}
        onKeyUp={() => setIsTyping(false)}
        IconRight={() =>
          endpoint.length > 0 && (
            <button onMouseDown={() => setEndpoint("")} title="Reset">
              <CrossIcon className="w-6 h-6 text-black" />
            </button>
          )
        }
      />
    </>
  );
}
