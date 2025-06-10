import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Container from "./Container";
import { useEffect, useRef, useState } from "react";
import { mergeClassName } from "../utils/utils";
import { IoIosSearch } from "react-icons/io";

const MENU_CLASS = `
  py-1
  px-1.5
  hover:bg-[#423F71]
  rounded-md
  max-[768px]:px-6
`;

const MENU_CLASS_ACTIVE = `
  bg-[#423F71]
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  const [params, _] = useSearchParams();
  const navigate = useNavigate();
  const pathnameRef = useRef("");
  const defaultKeyword = useRef("");

  const [keyword, setKeyword] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword;
      navigate(`/search?q=${keyword}`);
      setSearchFocus(false);
      searchRef.current?.blur();
    }
  };

  const initKeyword = () => {
    if (pathnameRef.current === "/search") {
      setKeyword(defaultKeyword.current);
    } else {
      setKeyword("");
    }
  };

  const onWindowClick = () => {
    setSearchFocus(false);
    initKeyword();
  };

  const getMenuClass = (path: String) => {
    if (path === pathname) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE);
    }
    return mergeClassName(MENU_CLASS, "");
  };

  useEffect(() => {
    setPathname(location?.pathname);
  }, [location?.pathname]);

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, []);

  return (
    <div className="bg-[rgb(41,40,65)] sticky top-0 z-[99] text-white">
      <Container classname="flex items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold">
            {" "}
            <Link to={"/"} /> MovieStream{" "}
          </h1>
          <div
            className="
            pt-1.5
            flex 
            items-center 
            gap-1.5
            max-[768px]:fixed
            max-[768px]:bottom-0
            max-[768px]:left-0
            max-[768px]:right-0
            max-[768px]:justify-center
            max-[768px]:py-3
            max-[768px]:bg-header
            max-[768px]:gap-6
            "
          >
            <Link to={"/movies"} className={getMenuClass("/movies")}>
              Movies
            </Link>
            <Link to={"/tv"} className={getMenuClass("/tv")}>
              TV
            </Link>
          </div>
        </div>
        <div
          className="
          border-b-[1.5px] 
          border-white
          flex
          items-center
          p-1
          flex-[0.5]
          focus-within:border-[#423F71]
          relative
        "
        >
          <input
            onClick={(e) => {
              e.stopPropagation();
              setSearchFocus(true);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 flex-1"
            placeholder="search..."
          />
          <IoIosSearch size={18}></IoIosSearch>
          {/* tmp results */}
          {/* {isSearchFocus && keyword ? (
            <SearchResult
              keyword={keyword}
              goToSearchPage={goToSearchPage}
            ></SearchResult>
          ) : (
            ""
          )} */}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
