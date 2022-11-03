import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Posts() {
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    getCharacters("https://swapi.dev/api/people/");
  }, []);

  const getCharacters = (url) => {
    axios.get(url).then((response) => {
      let characters = response.data.results;
      console.log("characters:", characters);

      characters = Promise.all(
        characters.map(async (character) => {
          character.homeworld = await getHomeworld(character.homeworld);
          if (!character.species[0]) {
            character.species = "Human";
          } else character.species = await getSpecies(character.species);
          return character;
        })
      );
      characters.then((characters) => {
        console.log(characters);
        setCharacterList(characters);
      });
    });
  };

  // function showDetail(data) {
  //   for (i = 0; i < data.results.length; i++) {
  //     console.log(data.results.name);
  //   }
  // }

  //helper functions
  const getHomeworld = async (homeworldURL) => {
    const response = await axios.get(homeworldURL);
    return response.data.name;
  };

  const getSpecies = async (speciesURL) => {
    const response = await axios.get(speciesURL);
    return response.data.name;
  };

  return (
    <>
      <Table stripped bordered hover className="project--table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {characterList.map((character) => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.birth_year}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.homeworld}</td>
              <td>{character.species}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

// useEffect(() => {
//   axios
//     .get("https://swapi.dev/api/people/")
//     .then((res) => {
//       console.log(res);
//       setCharacterData(res.data.results);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

//let promise = fetch ("https://swapi.dev/api/people/");
//.then(response => response.json())
//.then(json => createP(json.word))
//.catch(err => console.log(err));

// for ( i = 0; i < data.results.length, i++) {
//   names = names + data.results[i].name
// }

// function handleclick(e) => {

// }
