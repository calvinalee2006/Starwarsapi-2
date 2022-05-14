import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash"; //lookup lodash
import Table from "react-bootstrap/Table";

const pageSize = 10;
export default function Posts() {
  const [_posts, set_posts] = useState();
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/").then((res) => {
      console.log(res.data.results);
      set_posts(res.data.results);
      setPaginatedPosts(_(res.data.results).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = _posts ? Math.ceil(_posts.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPosts = _(_posts).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPosts);
  };
  return (
    <div>
      {!paginatedPosts ? (
        "No data found"
      ) : (
        <Table striped bordered hover className="project--table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Year</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Species</th>
              <th>Home World</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((_post, index) => (
              <tr key={index}>
                <td>{_post.name}</td>
                <td>{_post.birth_year}</td>
                <td>{_post.height}</td>
                <td>{_post.mass}</td>
                <td>{_post.species}</td>
                <td>{_post.home_world}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
