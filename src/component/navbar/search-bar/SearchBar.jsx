import { useState, useEffect } from "react";
import { Form, useSubmit } from "react-router-dom";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const submit = useSubmit();

  useEffect(() => {
    submit(searchInput, { method: "get", action: "/search" });
  }, [submit, searchInput]);

  function handleInputChange(event) {
    const { value } = event.target;
    setSearchInput(value);
  }

  return (
    <Form method="get" action="/search">
      <input
        type="search"
        name="Search"
        value={searchInput}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </Form>
  );
}
export default Search;
