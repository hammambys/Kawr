import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses("profile")} to={"/account"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        My profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        My bookings
      </Link>
      <Link className={linkClasses("games")} to={"/account/games"}>
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 68.421 68.422"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Page-1_11_">
              {" "}
              <path
                id="Fill-11"
                d="M41.519,7.706C41.519,3.45,44.967,0,49.224,0c4.254,0,7.705,3.45,7.705,7.706 c0,4.255-3.451,7.705-7.705,7.705C44.967,15.411,41.519,11.961,41.519,7.706L41.519,7.706z M59.066,54.498 c-3.694,0-6.688,2.994-6.688,6.688s2.994,6.688,6.688,6.688c3.692,0,6.687-2.994,6.687-6.688S62.758,54.498,59.066,54.498 L59.066,54.498z M55.081,38.697c0.692-1.327,0.178-2.963-1.147-3.655l-5.055-2.637l-2.529-10.84 c-0.127-1.669-1.016-3.259-2.549-4.207c-0.966-0.597-2.046-0.853-3.101-0.803c-0.197-0.014-0.399-0.01-0.603,0.021l-20.739,3.233 c-1.478,0.23-2.49,1.616-2.259,3.094c0.208,1.336,1.361,2.292,2.673,2.292c0.139,0,0.279-0.011,0.421-0.033l13.734-2.141 l-8.236,13.316c-0.117,0.19-0.218,0.386-0.309,0.584l-8.476,13.851H5.378c-1.496,0-2.709,1.213-2.709,2.709 s1.213,2.709,2.709,2.709h13.047c0.943,0,1.818-0.49,2.31-1.295l6.774-11.069c0.074,0.045,0.151,0.079,0.226,0.118l9.043,11.834 v9.936c0,1.496,1.214,2.709,2.709,2.709c1.496,0,2.709-1.213,2.709-2.709V54.861c0-0.596-0.195-1.174-0.557-1.646l-7.676-10.043 c0.356-0.328,0.676-0.706,0.941-1.137l7.738-12.508l1.241,5.32c0.179,0.769,0.685,1.42,1.384,1.785l6.156,3.212 c0.401,0.209,0.829,0.308,1.251,0.308C53.654,40.152,54.597,39.623,55.081,38.697L55.081,38.697z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
        My games
      </Link>
    </nav>
  );
}
