import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CustomModal from './CustomModal';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { useAuth } from '../../component/context/AuthContext';

const CopiesTab = ({ bookCopies }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        barcode: '',
        status: '',
    });
    const [selectedCopy, setSelectedCopy] = useState(null);
    const { isMember, isLibrarian } = useAuth();
    const [member, setMember] = useState(isMember);
    const [librarian, setLibrarian] = useState(isLibrarian);

    useEffect(() => {
        setMember(isMember);
        setLibrarian(isLibrarian);
    }, [isMember, isLibrarian]);

    const handleShowEditModal = (copy) => {
        setSelectedCopy(copy);
        setFormData({
            barcode: copy.barcode,
            status: copy.status,
        });
        setShowEditModal(true);
    };

    const handleShowAddModal = () => {
        setSelectedCopy(null);
        setFormData({
            barcode: '',
            status: '',
        });
        setShowAddModal(true);
    };

    const handleShowDeleteModal = (copy) => {
        setSelectedCopy(copy);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowAddModal(false);
        setShowDeleteModal(false);
    };

    const handleSaveChanges = () => {
        if (selectedCopy) {
            console.log('Saving changes for copy:', selectedCopy, 'with data:', formData);
        } else {
            console.log('Adding new copy with data:', formData);
        }
        handleCloseModal();
    };

    const handleConfirmDelete = () => {
        console.log('Deleting copy:', selectedCopy);
        handleCloseModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const data = [
        { label: 'Có sẵn', value: 'Available' },
        { label: 'Đã mượn', value: 'On Loan' },
        { label: 'Đã mất', value: 'Damaged' },
    ];

    return (
        <div style={{ margin: '20px 0' }}>
            {librarian && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                    <Button
                        style={{
                            fontSize: 'small',
                            backgroundColor: '#F87555',
                            border: 'none',
                        }}
                        onClick={handleShowAddModal}
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
                            <th>Barcode</th>
                            <th>Status</th>
                            <th>Thời gian sửa đổi</th>
                            <th>Người sửa đổi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookCopies.map((copy, index) => (
                            <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{copy.barcode}</td>
                                <td className="align-middle">{copy.status}</td>
                                <td className="align-middle">{copy.updated_at}</td>
                                <td className="align-middle">{copy.updated_by}</td>
                                <td className="align-middle">
                                    <Button
                                        style={{
                                            fontSize: 'small',
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            color: '#000',
                                            padding: '0'
                                        }}
                                        onClick={() => handleShowEditModal(copy)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                        <span className='m-1'>Sửa</span>
                                    </Button>
                                    <Button
                                        style={{
                                            fontSize: 'small',
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            color: '#000',
                                            marginLeft: '5px',
                                            padding: '0'
                                        }}
                                        onClick={() => handleShowDeleteModal(copy)}
                                    >
                                        <i className="bi bi-trash3"></i>
                                        <span className='m-1'>Xóa</span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div style={{ fontSize: 'small' }}>Chưa có bản copy nào</div>
            )}

            {/* Edit Modal */}
            <CustomModal
                show={showEditModal}
                handleClose={handleCloseModal}
                title="Cập nhật"
                handleSave={handleSaveChanges}
                className="custom-modal"
                hasFooter={true}
            >
                <TextInput
                    label="Barcode"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nhập Barcode"
                />

                <SelectInput
                    label="Trạng thái"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Chọn trạng thái"
                    data={data}
                />
            </CustomModal>

            {/* Add Modal */}
            <CustomModal
                show={showAddModal}
                handleClose={handleCloseModal}
                title="Thêm mới"
                handleSave={handleSaveChanges}
                className="custom-modal"
                hasFooter={true}
            >
                <TextInput
                    label="Barcode"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nhập Barcode"
                />
                <SelectInput
                    label="Trạng thái"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Chọn trạng thái"
                    data={data}
                />
            </CustomModal>

            {/* Delete Modal */}
            <CustomModal
                show={showDeleteModal}
                handleClose={handleCloseModal}
                title="Xác nhận"
                handleSave={handleConfirmDelete}
                hasFooter={true}
            >
                <p>Bạn có chắc chắn muốn xóa bản copy này?</p>
            </CustomModal>
        </div>
    );
};

export default CopiesTab;
