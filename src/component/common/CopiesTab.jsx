import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CustomModal from './CustomModal';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { useAuth } from '../../component/context/AuthContext';
import { addBookCopy, updateBookCopy, deleteBookCopy } from '../../service/BookCopyService';
import Notification from '../../component/common/Notification.jsx';
import useNotification from '../../hooks/useNotification.js';

const CopiesTab = ({ bookId, bookCopies, fetchBookDetail }) => {
    const { isUserAuthenticated, isMember, isLibrarian, user } = useAuth();
    const [authenticated, setAuthenticated] = useState(isUserAuthenticated());
    const [member, setMember] = useState(isMember);
    const [librarian, setLibrarian] = useState(isLibrarian);
    const { showError, showSuccess } = useNotification();
    const [submitting, setSubmitting] = useState(false);
    const [selectedCopy, setSelectedCopy] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'edit', 'add', 'delete'

    useEffect(() => {
        setAuthenticated(isUserAuthenticated());
        setMember(isMember);
        setLibrarian(isLibrarian);
    }, [isUserAuthenticated, isMember, isLibrarian]);

    const [formData, setFormData] = useState({
        userId: user.id,
        bookId: bookId,
        barcode: '',
        status: 'AVAILABLE',
    });

    useEffect(() => {
        setFormData({
            userId: user.id,
            bookId: bookId,
            barcode: '',
            status: 'AVAILABLE',
        });
    }, [bookId]);

    const handleAdd = async () => {
        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const response = await addBookCopy(formData);

            await timer;

            if (response.status === 201) {
                fetchBookDetail();
                // showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Thêm mới bản sao thất bại');
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
    };

    const handleEdit = async () => {
        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));


        try {
            const response = await updateBookCopy(selectedCopy.id, formData);

            await timer;

            if (response.status === 200) {
                fetchBookDetail();
                // showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Cập nhật bản sao thất bại');
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));


        try {
            const response = await deleteBookCopy(selectedCopy.id);
            await timer;

            if (response.status === 200) {
                fetchBookDetail();
                // showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Xóa bản sao thất bại');
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
    };

    const handleAction = async () => {
        switch (modalType) {
            case 'add':
                await handleAdd();
                break;
            case 'edit':
                await handleEdit();
                break;
            case 'delete':
                await handleDelete();
                break;
            default:
                break;
        }
    };

    const handleShowModal = (type, copy = null) => {
        setModalType(type);
        setShowModal(true);
        setSelectedCopy(copy);
        if (copy) {
            setFormData({
                userId: user.id,
                bookId: bookId,
                barcode: copy.barcode,
                status: copy.status,
            });
        } else {
            setFormData({
                userId: user.id,
                bookId: bookId,
                barcode: '',
                status: 'AVAILABLE',
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCopy(null);
        setFormData({
            userId: user.id,
            bookId: bookId,
            barcode: '',
            status: 'AVAILABLE',
        });
    };

    const statusOptions = [
        { name: 'Có sẵn', value: 'AVAILABLE' },
        { name: 'Đang được mượn', value: 'BORROWED' },
        { name: 'Hết sách', value: 'OUT_OF_STOCK' },
        { name: 'Hỏng', value: 'DAMAGED' },
        { name: 'Đã mất', value: 'LOST' },
    ];

    console.log('Book copies in copy:', bookCopies);

    return (
        <div style={{ margin: '20px 0' }}>
            <Notification />

            {librarian && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                    <Button
                        style={{
                            fontSize: 'small',
                            backgroundColor: '#F87555',
                            border: 'none',
                        }}
                        onClick={() => handleShowModal('add')}
                    >
                        <i className="bi bi-plus-lg"></i>
                        <span className="m-2">Thêm</span>
                    </Button>
                </div>
            )}

            {bookCopies && bookCopies.length > 0 ? (
                <Table style={{ fontSize: 'small' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã vạch</th>
                            {librarian && <th>Thời gian sửa đổi</th>}
                            {librarian && <th>Người sửa đổi</th>}
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookCopies.map((copy, index) => (
                            copy && (
                                <tr key={index}>
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{copy.barcode}</td>
                                    {librarian && <td className="align-middle">{copy.updatedAt}</td>}
                                    {librarian && <td className="align-middle">{copy.updatedBy}</td>}
                                    <td className="align-middle">{copy.status}</td>
                                    {librarian &&
                                        <td className="align-middle">
                                            <Button
                                                style={{
                                                    fontSize: 'small',
                                                    backgroundColor: '#fff',
                                                    border: 'none',
                                                    color: '#000',
                                                    padding: '0',
                                                }}
                                                onClick={() => handleShowModal('edit', copy)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                                <span className="m-1">Sửa</span>
                                            </Button>
                                            <Button
                                                style={{
                                                    fontSize: 'small',
                                                    backgroundColor: '#fff',
                                                    border: 'none',
                                                    color: '#000',
                                                    marginLeft: '5px',
                                                    padding: '0',
                                                }}
                                                onClick={() => handleShowModal('delete', copy)}
                                            >
                                                <i className="bi bi-trash3"></i>
                                                <span className="m-1">Xóa</span>
                                            </Button>
                                        </td>
                                    }
                                </tr>
                            )
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div style={{ fontSize: 'small' }}>Chưa có bản copy nào</div>
            )}

            {/* Edit, Add, Delete Modal */}
            <CustomModal
                show={showModal}
                handleClose={handleCloseModal}
                title={modalType === 'add' ? 'Thêm mới' : modalType === 'edit' ? 'Cập nhật' : 'Xác nhận'}
                handleSave={handleAction}
                submitting={submitting}
                hasFooter={true}
            >
                {modalType !== 'delete' && (
                    <>
                        <TextInput
                            label="Barcode"
                            name="barcode"
                            value={formData.barcode}
                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                            type="text"
                            placeholder="Nhập Barcode"
                        />
                        <SelectInput
                            label="Trạng thái"
                            name="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            placeholder="Chọn trạng thái"
                            data={statusOptions}
                        />
                    </>
                )}
                {modalType === 'delete' && <p>Bạn có chắc chắn muốn xóa bản copy này?</p>}
            </CustomModal>
        </div>
    );
};

export default CopiesTab;
