import "./Filter.scss";
import { statuses } from "../Popups/AddModal";
import { useEffect, useState } from "react";

const Filter = ({ setItems, items }) => {
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  console.log(status);

  useEffect(() => {
    const result = items
      .filter(item => item.title.toLowerCase().includes(title.toLowerCase()))
      .filter(item => item.author.toLowerCase().includes(author.toLowerCase()))
      .filter(item => !status || item.status.toLowerCase() === status.toLowerCase());

    setItems(result);
  }, [author, items, setItems, status, title]);

  return (
    <div className="filter-wrapper">
      <p>Filters:</p>

      <input type="text" className="filter-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <select className="filter-input" value={status} onChange={e => setStatus(e.target.value)} defaultValue={'Set a status'}>
        <option value="" selected>No status</option>

        {Object.keys(statuses).map(item => {
					return <option value={item} key={item}>{item}</option>
				})}
      </select>

      <input type="text" className="filter-input" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
    </div>
  );
};

export default Filter;