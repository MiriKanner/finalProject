import React, { useState, useContext } from "react";
import Select from 'react-select'
import { UserContext } from "../../App";
import { getReq } from "../../serverquests";

function SearchAndSortAlbum(props) {
  const [searchType, setSearchType] = useState();
  const albums = props.albums;
  const [options, setOptions] = useState([])
  const user = useContext(UserContext).user;

  function selectSearchType(event) {
    let foundsArr;
    if (event.target.value == "childName" && options.length < 1) {
      const req = {
        route: `children/myChildren/${user.username}`,
      };
      let tempOption = []
      getReq(req).then((response) => response.json()).then((responseJson) => {
        responseJson.map((childItem) => tempOption.push({ label: childItem.nickname, value: childItem.childName }))
        setOptions(tempOption)
      }).catch((err) =>
        notify(err.errorCode, err.errorText)
      )
    }
    if (event.target.value == "all") {
      foundsArr = props.originalAlbums.map((t, i) => {
        if (t != null) return { ...t, originalIndex: i };
      });
      props.setalbums(foundsArr.filter((t) => t != null));
      setSearchType();
    } else setSearchType(event.target.value);
  }

  function searchalbums(event) {
    let foundsArr;
    const { name, value } = searchType == "childName" ? { name: 'childName', value: event.value } : event.target;
    foundsArr = props.originalAlbums.map((t, i) => {
      if (t != null && t[name].toString().includes(value))
        return { ...t, originalIndex: i };
    });
    props.setalbums(foundsArr.filter((t) => t != null));
  }

  function sortalbums(event) {
    event.preventDefault();
    let sortArr = albums.slice();
    switch (event.target.value) {
      case "creation date":
        props.setalbums(sortArr.sort((a, b) => new Date(a.creationdate) - new Date(b.creationdate)));
        break;
      case "alphabet":
        props.setalbums(sortArr.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
        break;
      case "random":
        props.setalbums(sortArr.sort(() => (Math.random() > 0.5 ? -1 : 1)));
        break;
    }
  }
  
  return (
    <div className="search-sort">
      <div className="sort">
        <label htmlFor="sort">order by</label>
        <select onChange={sortalbums} name="sort">
          <option value="all"> </option>
          <option value="creation date">creation date</option>
          <option value="alphabet">alphabet</option>
          <option value="random">random</option>
        </select>
        <br />
      </div>
      <div className="search">
        <label htmlFor="search">search by</label>
        <select onChange={selectSearchType} name="search">
          <option value="all"></option>
          <option value="name">title</option>
          <option value="childName">child name</option>
        </select>
        <div className="input-con" >
          {searchType ? (
            searchType == "childName" ?
              <Select id='child' options={options} onChange={(choise) => searchalbums(choise)} />
              : <input
                type="text"
                name={searchType}
                onChange={(event) => searchalbums(event)}
              />)
            : <></>
          }
        </div>
      </div>
    </div>
  );
}
export default SearchAndSortAlbum;
