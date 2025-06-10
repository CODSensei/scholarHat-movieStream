import React, { useEffect, useRef, useState } from "react";
import type { Film } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  keyword: string;
  goToSearchPage: Function;
}

const SearchResult: React.FC = (props: Props) => {
  const [items, setItems] = useState<Film[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const searchTimeout = useRef<any>("");

  const navigate = useNavigate();

  const fetch = async () => {
    if (!props.keyword) return;

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      //   const res = await search(props.keyword);
      //   setTotalItem(res.totalPages);
      //   setItems(res.films);
    }, 120);
  };

  useEffect(() => {
    fetch();
  }, [props.keyword]);

  return (
    <div
      className="
            absolute
            top-[48px]
            left-0
            right-0
            rounded-md
            bg-header
            shadow-lg
        "
    ></div>
  );
};
export default SearchResult;
