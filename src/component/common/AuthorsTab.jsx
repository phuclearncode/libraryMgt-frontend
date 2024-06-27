import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const AuthorsTab = ({ authors }) => {
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (authorId) => {
        setExpanded(prevState => ({
            ...prevState,
            [authorId]: !prevState[authorId]
        }));
    }

    return (
        <div style={{ margin: '10px 0' }}>
            <ListGroup>
                {authors.map((author) => (
                    <ListGroup.Item key={author.id} style={{ border: 'none', padding: '0', margin: '10px 0' }}>
                        <h6 style={{ marginBottom: '20px' }}>{author.name}</h6>

                        <p style={{ textAlign: 'justify', fontSize: 'small' }}>
                            {expanded[author.id] ? author.description : `${author.description.slice(0, 200)}...`}
                            {author.description.length > 200 && (
                                <span
                                    style={{ color: '#F87555', cursor: 'pointer', marginLeft: '5px' }}
                                    onClick={() => toggleExpand(author.id)}
                                >
                                    {expanded[author.id] ? 'Thu gọn' : 'Xem thêm'}
                                </span>
                            )}
                        </p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default AuthorsTab;
