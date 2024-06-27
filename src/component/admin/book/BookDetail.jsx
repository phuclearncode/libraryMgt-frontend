import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Card, Button } from 'react-bootstrap';
import BookCard from '../../common/BookCard';
import BookDetailCard from '../../common/BookDetailCard';
import BookDetailTabs from '../../common/BookDetailTabs';

const BookDetail = () => {

    const bookDetail = {
        title: 'JavaScript: The Good Parts',
        authors: [
            { id: 1, name: 'Tác giả A', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quam ratione expedita suscipit perferendis similique, architecto eligendi consequuntur. Repellat, modi iure beatae repudiandae qui sint, doloremque quidem vero animi corporis itaque quo distinctio quaerat blanditiis sit consequuntur. Dolorum expedita ea vero animi error. Facere laborum maxime dolor quisquam totam reiciendis, eaque minima hic ipsa optio quas debitis possimus rerum dicta sunt voluptatum! Harum commodi ducimus quo. Voluptates aliquam atque qui ab? Iste, esse ipsa. Non, facilis assumenda possimus nesciunt, impedit quaerat libero modi mollitia vitae odit earum porro ratione dolorum alias odio quas laudantium sequi illum saepe error id quibusdam!' },
            { id: 2, name: 'Tác giả B', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quam ratione expedita suscipit perferendis similique, architecto eligendi consequuntur. Repellat, modi iure beatae repudiandae qui sint, doloremque quidem vero animi corporis itaque quo distinctio quaerat blanditiis sit consequuntur.' }
        ],
        publisher: 'NXB A',
        publishedYear: 2023,
        isbn: '123456789',
        language: 'Tiếng Việt',
        pages: 300,
        rating: 4.0,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quam ratione expedita suscipit perferendis similique, architecto eligendi consequuntur. Repellat, modi iure beatae repudiandae qui sint, doloremque quidem vero animi corporis itaque quo distinctio quaerat blanditiis sit consequuntur. Dolorum expedita ea vero animi error. Facere laborum maxime dolor quisquam totam reiciendis, eaque minima hic ipsa optio quas debitis possimus rerum dicta sunt voluptatum! Harum commodi ducimus quo. Voluptates aliquam atque qui ab? Iste, esse ipsa. Non, facilis assumenda possimus nesciunt, impedit quaerat libero modi mollitia vitae odit earum porro ratione dolorum alias odio quas laudantium sequi illum saepe error id quibusdam!',
        numReviews: 1000,
        copies: [
            {
                id: 1,
                book_id: 1,
                barcode: 'BC123456',
                status: 'Available',
                created_by: 'Admin',
                updated_by: 'Librarian',
                created_at: '2024-06-25 10:00:00',
                updated_at: '2024-06-26 15:30:00'
            },
            {
                id: 2,
                book_id: 1,
                barcode: 'BC789012',
                status: 'On Loan',
                created_by: 'Librarian',
                updated_by: 'User',
                created_at: '2024-06-25 11:30:00',
                updated_at: '2024-06-26 12:45:00'
            }
        ],
        reviews: [
            {
                id: 1,
                reviewer: 'Dien Nguyen',
                rating: 4.5,
                feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quam ratione expedita suscipit perferendis similique, architecto eligendi consequuntur. Repellat, modi iure beatae repudiandae qui sint, doloremque quidem vero animi corporis itaque quo distinctio quaerat blanditiis sit consequuntur. Dolorum expedita ea vero animi error. Facere laborum maxime dolor quisquam totam reiciendis, eaque minima hic ipsa optio quas debitis possimus rerum dicta sunt voluptatum! Harum commodi ducimus quo. Voluptates aliquam atque qui ab? Iste, esse ipsa. Non, facilis assumenda possimus nesciunt, impedit quaerat libero modi mollitia vitae odit earum porro ratione dolorum alias odio quas laudantium sequi illum saepe error id quibusdam!',
                created_at: '2024-06-26 10:30:00'
            },
            {
                id: 2,
                reviewer: 'Phuc Nguyen',
                rating: 3.5,
                feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quam ratione expedita suscipit perferendis similique, architecto eligendi consequuntur. Repellat, modi iure beatae repudiandae qui sint, doloremque quidem vero animi corporis itaque quo distinctio quaerat blanditiis sit consequuntur. Dolorum expedita ea vero animi error. Facere laborum maxime dolor quisquam totam reiciendis, eaque minima hic ipsa optio quas debitis possimus rerum dicta sunt voluptatum! Harum commodi ducimus quo. Voluptates aliquam atque qui ab? Iste, esse ipsa. Non, facilis assumenda possimus nesciunt, impedit quaerat libero modi mollitia vitae odit earum porro ratione dolorum alias odio quas laudantium sequi illum saepe error id quibusdam!',
                created_at: '2024-06-25 14:45:00'
            }
        ]
    };
    



    return (
        <div style={{ margin: '0 200px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h5>Chi tiết sách</h5>
            </div>
            <div style={{ padding: '0 16px 0 16px', marginBottom: '16px' }}>
                <Row style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
                    <Col md={4} style={{ display: 'flex', padding: '0' }}>
                        <BookCard
                            imageUrl="https://m.media-amazon.com/images/I/61ztlXgCmpL._SL1500_.jpg"
                            mode="buttons"
                            cardWidth="18rem"
                            cardPadding="16px"
                        />
                    </Col>
                    <Col md={8} style={{ display: 'flex', padding: '0' }}>
                        <BookDetailCard
                            title={bookDetail.title}
                            authors={bookDetail.authors}
                            publisher={bookDetail.publisher}
                            publishedYear={bookDetail.publishedYear}
                            isbn={bookDetail.isbn}
                            language={bookDetail.language}
                            pages={bookDetail.pages}
                            rating={bookDetail.rating}
                            description={bookDetail.description}
                            numReviews={bookDetail.numReviews}
                        />
                    </Col>
                </Row>

                <Row style={{ backgroundColor: '#fff' }}>
                    <Col>
                        <BookDetailTabs bookDetail={bookDetail} />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default BookDetail