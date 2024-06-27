import React from 'react';
import { Card } from 'react-bootstrap';
import IconButton from './IconButton';

const BookCard = ({ imageUrl, mode, title, authors, publishedYear, rating, cardWidth, cardPadding }) => {
    const truncateValue = (value, maxLength) => {
        if (value.length > maxLength) {
            return value.substring(0, maxLength) + '...';
        }
        return value;
    };

    const formatAuthorsAndYear = (authors, publishedYear) => {
        const authorString = authors.join(', ');
        return `${authorString}, ${publishedYear}`;
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: '#fff',
                padding: cardPadding,
                borderRadius: '5px',
                width: cardWidth,
                height: '100%'
            }}
        >
            <Card
                style={{
                    border: 'none',
                    borderRadius: 'none'
                }}
            >
                <Card.Img
                    variant="top"
                    src={imageUrl}
                    style={{ borderRadius: '5px' }}
                />

                {mode === 'info' && (
                    <Card.Body className="text-left" style={{padding: '10px 0 0 0'}}>
                    <Card.Text className="text-left">
                        <p style={{ fontSize: 'small', margin: '0' }}>{truncateValue(title, 20)}</p>
                        <p style={{ fontSize: 'x-small', margin: '0' }}>{truncateValue(formatAuthorsAndYear(authors, publishedYear), 25)}</p>
                        <p style={{ fontSize: 'x-small', margin: '0' }}>{rating}/5</p>
                    </Card.Text>
                </Card.Body>
                )}

            </Card>
        </div>
    );
};

export default BookCard;
