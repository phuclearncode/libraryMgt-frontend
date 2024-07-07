import React, { useState, useEffect } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import Rating from 'react-rating';
import { Form, Button, ListGroup } from 'react-bootstrap';
import TextArea from './TextArea';
import { useAuth } from '../../component/context/AuthContext';

const ReviewsTab = ({ reviews }) => {
    const [expanded, setExpanded] = useState(false);
    const { isMember, isLibrarian } = useAuth();
    const [member, setMember] = useState(isMember);
    const [librarian, setLibrarian] = useState(isLibrarian);

    useEffect(() => {
        setMember(isMember);
        setLibrarian(isLibrarian);
    }, [isMember, isLibrarian]);

    const [formData, setFormData] = useState({
        rating: 0,
        feedback: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formData);
    };

    const toggleExpand = (authorId) => {
        setExpanded(prevState => ({
            ...prevState,
            [authorId]: !prevState[authorId]
        }));
    }


    return (
        <div style={{ margin: '20px 0' }}>
            {!librarian && (
                <>
                    <h6 style={{ marginBottom: '20px' }}>Viết đánh giá</h6>
                    <Form onSubmit={handleSubmit}>
                        <TextArea
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            placeholder="Viết feedback của bạn..."
                            rows={6}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Form.Group>
                                <Rating
                                    initialRating={formData.rating}
                                    onChange={(value) => setFormData({ ...formData, rating: value })}
                                    fullSymbol={<BsStarFill style={{ color: 'gold', marginRight: '5px' }} />}
                                    emptySymbol={<BsStar style={{ color: 'lightgray', marginRight: '5px' }} />}
                                    halfSymbol={<BsStarHalf style={{ color: 'gold', marginRight: '5px' }} />}
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                style={{
                                    fontSize: 'small',
                                    backgroundColor: '#F87555',
                                    border: 'none'
                                }}>
                                Gửi
                            </Button>
                        </div>
                    </Form>
                </>
            )}


            <h6 style={{ margin: '20px 0' }}>Đánh giá (20)</h6>
            {reviews && reviews.length > 0 ? (
                <ListGroup>
                    {reviews.map((review) => (
                        <ListGroup.Item key={review.id} style={{ border: 'none', padding: '0', margin: '10px 0' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ marginRight: '10px', fontSize: 'small', fontWeight: 'bold' }}>{review.reviewer}</span>
                                        <Rating
                                            initialRating={review.rating}
                                            readonly
                                            fullSymbol={<BsStarFill style={{ color: 'gold', marginRight: '3px' }} />}
                                            emptySymbol={<BsStar style={{ color: 'lightgray', marginRight: '3px' }} />}
                                            halfSymbol={<BsStarHalf style={{ color: 'gold', marginRight: '3px' }} />}
                                        />
                                    </div>
                                    <div style={{ fontSize: 'small' }}>{review.created_at}</div>
                                </div>
                            </div>
                            <p style={{ textAlign: 'justify', fontSize: 'small' }}>

                                {expanded[review.id] ? review.feedback : `${review.feedback.slice(0, 200)}...`}
                                {review.feedback.length > 200 && (
                                    <span
                                        style={{ color: '#F87555', cursor: 'pointer', marginLeft: '5px' }}
                                        onClick={() => toggleExpand(review.id)}
                                    >
                                        {expanded[review.id] ? 'Thu gọn' : 'Xem thêm'}
                                    </span>
                                )}
                            </p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div style={{ fontSize: 'small' }}>Chưa có đánh giá nào</div>
            )}
        </div>
    );
};

export default ReviewsTab;
