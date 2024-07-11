import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.js';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import Rating from 'react-rating';
import CustomModal from './CustomModal.jsx';
import Notification from './Notification';
import useNotification from '../../hooks/useNotification.js';
import TextInput from './TextInput.jsx';
import TextArea from './TextArea.jsx';
import SelectInput from './SelectInput.jsx';
import { useNavigate } from 'react-router-dom';

const BookDetailCard = ({ bookDetail }) => {
    const { isbn, title, authors, description, publisher, publicationYear, language, totalPage, rating, sampleBookImages } = bookDetail;

    const [expanded, setExpanded] = useState(false);
    const [showBorrowBookModal, setShowBorrowBookModal] = useState(false);
    const [showBookSampleModal, setShowBookSampleModal] = useState(false);
    const [submittingBorrow, setSubmittingBorrow] = useState(false);
    const { showSuccess, showError } = useNotification();
    const navigate = useNavigate();
    const { isMember, isLibrarian, isUserAuthenticated } = useAuth();
    const [member, setMember] = useState(isMember);
    const [librarian, setLibrarian] = useState(isLibrarian);
    const [authenticated, setAuthenticated] = useState(isUserAuthenticated);

    useEffect(() => {
        setMember(isMember);
        setLibrarian(isLibrarian);
        setAuthenticated(isUserAuthenticated);
    }, [isMember, isLibrarian, isUserAuthenticated]);

    console.log("authors: ", authors)



    const formatAuthors = (authors) => {
        if (!authors || authors.length === 0) {
            return '';
        }
        return authors.map(author => author.name).join(', ');
    };

    const formatDescription = (description) => {
        return description ? (expanded ? description : description.slice(0, 200) + '...') : '';
    };


    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const barcodes = [
        { label: 'BC123456', value: 'BC123456' },
        { label: 'BC123457', value: 'BC123457' }
    ];

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const [borrowBook, setBorrowBook] = useState({
        borrowAt: getCurrentDate(),
        returnAt: getCurrentDate(),
        barcode: '',
        description: ''
    });


    const handleShowBorrowBookModal = () => {
        setShowBorrowBookModal(true);
    };

    const handleCloseBorrowBookModal = () => {
        setShowBorrowBookModal(false);
    };

    const handleShowBookSampleModal = () => {
        setShowBookSampleModal(true);
    };

    const handleCloseBookSampleModal = () => {
        setShowBookSampleModal(false);
    };


    const validateDates = (name, value) => {
        const currentDate = new Date(getCurrentDate());
        const borrowDate = name === 'borrowAt' ? new Date(value) : new Date(borrowBook.borrowAt);
        const returnDate = name === 'returnAt' ? new Date(value) : new Date(borrowBook.returnAt);

        if (name === 'borrowAt' && borrowDate < currentDate) {
            showError('Ngày mượn không thể nhỏ hơn ngày hiện tại.');
            return false;
        }

        if (name === 'returnAt' && returnDate < currentDate) {
            showError('Ngày trả không thể nhỏ hơn ngày hiện tại.');
            return false;
        } else if (name === 'returnAt' && returnDate < borrowDate) {
            showError('Ngày trả không thể nhỏ hơn ngày mượn.');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'borrowAt') {
            if (validateDates(name, value)) {
                setBorrowBook((prevState) => ({
                    ...prevState,
                    borrowAt: value,
                    returnAt: value
                }));
            }
        } else if (name === 'returnAt') {
            if (validateDates(name, value)) {
                setBorrowBook((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            }
        } else {
            setBorrowBook((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleBorrowBookSubmit = async () => {

        setSubmittingBorrow(true);

        try {
            navigate('/admin/book', { state: { success: 'Mượn sách thành công' } })
        } catch (error) {
            console.error("Lỗi khi mượn sách:", error);
            showError('Lỗi khi mượn sách');
        } finally {
            setSubmittingBorrow(false);
            handleCloseBookSampleModal();
        }
    };

    console.log("Borrow book: ", borrowBook);
    console.log("Sample book images: ", sampleBookImages);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
            <Notification />
            <Card style={{ width: '100%', padding: '16px', borderRadius: '5px', border: 'none', padding: '0' }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{title}</Card.Title>
                    <Card.Text>
                        <div style={{ fontSize: 'small' }}>{formatAuthors(authors)}</div>
                        <div style={{ fontSize: 'small', margin: '10px 0' }}>
                            <Rating
                                initialRating={rating}
                                readonly
                                fullSymbol={<BsStarFill style={{ color: 'gold', marginRight: '5px' }} />}
                                emptySymbol={<BsStar style={{ color: 'lightgray', marginRight: '5px' }} />}
                                halfSymbol={<BsStarHalf style={{ color: 'gold', marginRight: '5px' }} />}
                            />
                            <span style={{ marginLeft: '5px' }}>(100)</span>
                        </div>
                        <div style={{ fontSize: 'small', marginBottom: '10px', textAlign: 'justify' }}>
                            {formatDescription(description)}
                            {formatDescription(description) && (
                                <span style={{ color: '#F87555', cursor: 'pointer', marginLeft: '5px' }} onClick={toggleExpand}>
                                    {expanded ? 'Thu gọn' : 'Xem thêm'}
                                </span>
                            )}
                        </div>
                        <div style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Nhà xuất bản: </strong>{publisher}</div>
                        <div style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Năm xuất bản: </strong>{publicationYear}</div>
                        <div style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>ISBN: </strong>{isbn}</div>
                        <div style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Ngôn ngữ: </strong>{language}</div>
                        <div style={{ fontSize: 'small', margin: '0 0 5px 0' }}><strong>Số trang: </strong>{totalPage}</div>

                        <div className="d-flex flex-start mt-3">
                            {(member || !authenticated) && (
                                <Button
                                    type="submit"
                                    style={{
                                        fontSize: 'small',
                                        backgroundColor: '#F87555',
                                        border: 'none',
                                        marginRight: '10px'
                                    }}
                                    onClick={handleShowBorrowBookModal}
                                >
                                    Mượn sách
                                </Button>
                            )}
                            {(librarian || member || !authenticated) && (
                                <Button
                                    type="button"
                                    style={{
                                        fontSize: 'small',
                                        backgroundColor: 'transparent',
                                        color: '#4D4D4D',
                                        border: '1px solid #ABABAB'
                                    }}
                                    onClick={handleShowBookSampleModal}
                                >

                                    Đọc thử
                                </Button>
                            )}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Borrow Book Modal */}
            <CustomModal
                show={showBorrowBookModal}
                handleClose={handleCloseBorrowBookModal}
                title="Mượn sách"
                handleSave={handleBorrowBookSubmit}
                submitting={submittingBorrow}
                size="md"
                hasFooter={true}

            >
                <TextInput
                    label="Ngày mượn"
                    type="date"
                    name="borrowAt"
                    value={borrowBook.borrowAt}
                    onChange={handleChange}
                />

                <TextInput
                    label="Ngày trả"
                    type="date"
                    name="returnAt"
                    value={borrowBook.returnAt}
                    onChange={handleChange}
                />


                <SelectInput
                    label="Mã vạch"
                    name="barcode"
                    value={borrowBook.barcode}
                    onChange={handleChange}
                    data={barcodes}
                />

                <TextArea
                    label="Mô tả"
                    name="description"
                    value={borrowBook.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả"
                />
            </CustomModal>

            {/* Book Sample Modal */}
            <CustomModal
                show={showBookSampleModal}
                handleClose={handleCloseBookSampleModal}
                title={title}
                size="xl"
                hasFooter={false}
            >
                {sampleBookImages && sampleBookImages.length > 0 ? (
                    sampleBookImages.map((imageUrl, index) => (
                        <div key={index} className="p-2" style={{ maxWidth: '100%', textAlign: 'center' }}>
                            <img
                                src={imageUrl.url}
                                alt={imageUrl.name}
                                className="img-fluid mx-auto d-block"
                                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                            />
                        </div>
                    ))
                ) : (
                    <p>Không có hình ảnh mẫu sách.</p>
                )}

            </CustomModal>

        </div>
    );
};

export default BookDetailCard;
