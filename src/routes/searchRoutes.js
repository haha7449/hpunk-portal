import SearchResult from "../pages/search/searchResult";

const SearchRoutes = [
  {
    key: "SearchResult",
    path: "/searchResult/:keyword?",
    component: SearchResult,
    exact: true,
  },
];

export default SearchRoutes;
