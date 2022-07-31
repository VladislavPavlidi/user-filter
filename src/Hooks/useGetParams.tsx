import { parse } from "query-string";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useGetParams() {
  const { search } = useLocation();
  const firstMount = useRef(true);

  function toObject(string: string) {
    return parse(string, {
      arrayFormat: "bracket",
      parseNumbers: false,
      parseBooleans: true,
    });
  }

  const params = useMemo(() => {
    return toObject(search);
  }, [search]);

  const [state, setState] = useState(params);

  useEffect(() => {
    if (!firstMount.current) {
      setState(params);
    }
  }, [params]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return state;
}
