import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap';
import BookCard from '../../common/BookCard';
import BookDetailCard from '../../common/BookDetailCard';
import BookDetailTabs from '../../common/BookDetailTabs';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification.js';
import { getBookById, getBookImage } from '../../../service/BookService';

const BookDetail = () => {
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const { showError } = useNotification();


    const fetchBookDetail = async () => {
        try {
            const response = await getBookById(id);
            if (response.status === 200) {
                const book = response.data;

                try {
                    const imageResponse = await getBookImage(id);
                    if (imageResponse.status === 200) {

                        const contentDisposition = imageResponse.headers['content-disposition'];
                        let fileName = 'unknown';
                        if (contentDisposition) {
                            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                            if (fileNameMatch.length === 2) {
                                fileName = fileNameMatch[1];
                            }
                        }

                        const file = new File([imageResponse.data], fileName, { type: imageResponse.data.type });
                        const imageUrl = URL.createObjectURL(file);
                        setBookDetail({ ...book, imageUrl });
                    } else {
                        showError(imageResponse.message);
                        setBookDetail({ ...book, imageUrl: null });
                    }
                } catch (error) {
                    console.error("Lỗi lấy ảnh sách:", error);
                    setBookDetail({ ...book, imageUrl: null });
                }
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error("Error fetching book:", error);

        }
    };

    useEffect(() => {
        fetchBookDetail();
    }, [id]);

    console.log("Book Detail: ", bookDetail);

    return (
        <div style={{ margin: '0 200px' }}>
            <Notification />
            <div style={{ marginBottom: '20px' }}>
                <h5>Chi tiết sách</h5>
            </div>
            <div style={{ padding: '0 16px 0 16px', marginBottom: '16px', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                <Row style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
                    <Col md={4} style={{ display: 'flex', padding: '0' }}>
                        <BookCard
                            imageUrl={bookDetail.imageUrl}
                            mode="buttons"
                            cardWidth="18rem"
                            cardPadding="16px"
                        />
                    </Col>
                    <Col md={8} style={{ display: 'flex', padding: '0' }}>
                        <BookDetailCard bookDetail={bookDetail} />
                    </Col>
                </Row>

                <Row style={{ backgroundColor: '#fff' }}>
                    <Col>
                        <BookDetailTabs bookDetail={bookDetail} fetchBookDetail={fetchBookDetail}  />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default BookDetail