import React, { useState} from 'react';
import { Table} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Author = () => {
  const navigate = useNavigate();


  const [authors, setAuthors] = useState([]);


  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors();
        if (response && response.status === 201) {
          const authorList = response.data[0].authorList;
          setAuthors(authorList); 
        } else {
          console.error("API did not return expected data structure:", response);
        }
      } catch (error) {
        console.error(error);
      } 
    };
    fetchAuthors();
  }, []);

  const handleDelete = async (authorID) => {
    if (window.confirm("Bạn chắc chưa?")) {
      try {
        await deleteAuthor(authorID);
        setAuthors(authors.filter(author => author.id !== authorID)); 
      } catch (error) {
        console.error("Error deleting author:", error);
      }
    }
  };

  const handleAdd = () => {
    navigate('author/add');
  };

  const handleEdit = (authorId) => {
    navigate(`author/edit/${authorId}`);
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Tác giả</h5>
        <Link
          className="btn btn-primary"
          to="/admin/author/add"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
          }}
        >
          <i class="bi bi-plus-lg" onClick={() => handleAdd()}></i>
          <span className="m-2">Thêm</span>
        </Link>
      </div>
      {authors.length > 0 ? (
        <Table style={{ fontSize: 'small' }}>
        <thead>
          <tr>
            <th>Tác giả</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>

          {authors.map((author) => (
            <tr key={author.id}>
              <td className="align-middle">{author.name}</td>
              <td className="align-middle">{author.description}</td>
              <td className="align-middle">
                <Link
                  to={`/admin/author/edit/${author.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-pen" onClick={() => handleEdit(author.id)}></i>
                  <span className='m-2'onClick={() => handleEdit(author.id)}>Sửa</span>
                </Link>
                <Link
                  // to={`/admin/author/delete/${author.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                    <i className="bi bi-trash3" onClick={() => handleDelete(author.id)}></i> 
                    <span className='m-2' onClick={() => handleDelete(author.id)}>Xóa</span>
                 
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>) : (
        <p>No authors found.</p>
      )}
    </div>
  );
};

export default Author;