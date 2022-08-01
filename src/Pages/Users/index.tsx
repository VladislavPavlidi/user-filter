import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUsers, usersAsync } from "../../Features/Users/usersSlice";
import Cards from "./Cards";
import Filter from "./Filter";

export default function Users() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!users.length) dispatch(usersAsync());
  }, []);

  return (
    <>
      <Filter />
      {users.length > 0 && <Cards />}
    </>
  );
}
