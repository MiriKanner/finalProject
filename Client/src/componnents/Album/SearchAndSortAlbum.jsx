import React, {  useState } from "react";

function SearchAndSortAlbum(props) {
    const [searchType, setSearchType] = useState();
    const albums=props.albums
    
    function selectSearchType(event) {
        let foundsArr;
        if (event.target.value == "all") {
          foundsArr = props.originalAlbums.map((t, i) => {
            if (t != null) return { ...t, originalIndex: i, editable: false };
          });
          props.setalbums(foundsArr.filter((t) => t != null));
          setSearchType();
        } else setSearchType(event.target.value);
      }
      function searchalbums(event) {
        let foundsArr, foundIndex;
        const { name, value } = event.target;
        foundsArr = props.originalAlbums.map((t, i) => {
          if (t != null && t[name].includes(value))
            return { ...t, originalIndex: i, editable: false };
        });
        props.setalbums(foundsArr.filter((t) => t != null));
      }
      function sortalbums(event) {
        event.preventDefault();
        let sortArr = albums.slice();
        switch (event.target.value) {
          case "id":
            props.setalbums(sortArr.sort((a, b) => a.albumId - b.albumId));
            break;
          case "alphabet":
            props.setalbums(sortArr.sort((a, b) => (a.name > b.name ? 1 : -1)));
            break;
          case "random":
            props.setalbums(sortArr.sort(() => (Math.random() > 0.5 ? -1 : 1)));
            break;
        }
      }    
  return (
    <>
      <br />
      <label htmlFor="sort">order by</label>
      <select onChange={sortalbums} name="sort">
        <option value="all"> </option>
        <option value="id">id</option>
        <option value="alphabet">alphabet</option>
        <option value="random">random</option>
      </select>

      <label htmlFor="search">search by</label>
      <select onChange={selectSearchType} name="search">
        <option value="all"></option>
        <option value="albumId">id</option>
        <option value="name">title</option>
        <option value="childName">child name</option>
      </select>
      <br />

      {searchType ? (
        searchType == "id" ? (
          <>
            <label htmlFor="id">id</label>
            <input
              type="text"
              name="id"
              onChange={(event) => searchalbums(event)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name={searchType}
              onChange={(event) => searchalbums(event)}
            />
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
}
export default SearchAndSortAlbum;
