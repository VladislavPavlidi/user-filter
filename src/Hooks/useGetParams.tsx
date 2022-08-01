import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toObject } from "../Utilities/params";

export default function useGetParams() {
  const { search } = useLocation();
  const firstMount = useRef(true);

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
