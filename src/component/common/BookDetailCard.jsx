import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.js';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import Rating from 'react-rating';

const BookDetailCard = ({ title, authors, publisher, publishedYear, isbn, language, pages, rating, description, numReviews }) => {
    const { isUserAuthenticated, isMember, isLibrarian } = useAuth();
    const [authenticated, setAuthenticated] = useState(isUserAuthenticated());
    const [member, setMember] = useState(isMember);
    const [librarian, setLibrarian] = useState(isLibrarian);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setAuthenticated(isUserAuthenticated());
        setMember(isMember);
        setLibrarian(isLibrarian);
    }, [isUserAuthenticated, isMember, isLibrarian]);

    const formatAuthors = (authors) => {
        return authors.map(author => author.name).join(', ');
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
            <Card style={{ width: '100%', padding: '16px', borderRadius: '5px', border: 'none', padding: '0' }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{title}</Card.Title>
                    <Card.Text>
                        <p style={{ fontSize: 'small' }}>{formatAuthors(authors)}</p>
                        <p style={{ fontSize: 'small' }}>
                            <Rating
                                initialRating={rating}
                                readonly
                                fullSymbol={<BsStarFill style={{ color: 'gold', marginRight: '5px' }} />}
                                emptySymbol={<BsStar style={{ color: 'lightgray', marginRight: '5px' }} />}
                                halfSymbol={<BsStarHalf style={{ color: 'gold', marginRight: '5px' }} />}
                            />
                            <span style={{ marginLeft: '10px' }}>{numReviews} đánh giá</span>
                        </p>
                        <p style={{ fontSize: 'small', marginBottom: '10px', textAlign: 'justify' }}>
                            {expanded ? description : `${description.slice(0, 200)}...`}
                            <span style={{ color: '#F87555', cursor: 'pointer', marginLeft: '5px' }} onClick={toggleExpand}>
                                {expanded ? 'Thu gọn' : 'Xem thêm'}
                            </span>
                        </p>
                        <p style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Nhà xuất bản: </strong>{publisher}</p>
                        <p style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Ngày xuất bản: </strong>{publishedYear}</p>
                        <p style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>ISBN: </strong>{isbn}</p>
                        <p style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Ngôn ngữ: </strong>{language}</p>
                        <p style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Số trang: </strong>{pages}</p>

                        <div className="d-flex flex-start mt-3">
                            {librarian && (
                                <Button
                                    type="submit"
                                    style={{
                                        fontSize: 'small',
                                        backgroundColor: '#F87555',
                                        border: 'none',
                                    }}>
                                    Mượn sách
                                </Button>
                            )}
                            {librarian && (
                                <Button
                                    type="button"
                                    style={{
                                        fontSize: 'small',
                                        backgroundColor: 'transparent',
                                        color: '#4D4D4D',
                                        border: '1px solid #ABABAB',
                                        marginLeft: '10px'
                                    }}>
                                    Đọc thử
                                </Button>
                            )}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookDetailCard;
