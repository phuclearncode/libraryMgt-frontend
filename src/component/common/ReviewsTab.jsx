import React, { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Rating from "react-rating";
import { Form, Button, ListGroup, Dropdown } from "react-bootstrap";
import TextArea from "./TextArea";
import { useAuth } from "../../component/context/AuthContext";
import {
  addReview,
  updateReview,
  deleteReview,
} from "../../service/ReviewService";
import useNotification from "../../hooks/useNotification";
import Notification from "./Notification";

const ReviewsTab = ({ bookId, reviews, fetchBookDetail, totalReviews }) => {
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { showError, showSuccess } = useNotification();
  const { isLibrarian, user } = useAuth();

  const [librarian, setLibrarian] = useState(isLibrarian);

  useEffect(() => {
    setLibrarian(isLibrarian);
  }, [isLibrarian]);

  const [formData, setFormData] = useState({
    rating: 0,
    feedback: "",
  });
  const [formEditData, setFormEditData] = useState({
    rating: 0,
    feedback: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setFormEditData({ ...formEditData, [name]: value });
  };
  const handleSubmit = async (event) => {
    // Adjust if user add review
    event.preventDefault();
    if (!ValidateForm()) {
      showError("Vui lòng chọn số sao đánh giá");
      return;
    }
    try {
      const newReview = {
        ...formData,
        bookId: bookId,
        userId: user.id,
      };
      console.log(newReview);
      const addedReview = await addReview(newReview);

      setFormData({ feedback: "", rating: 0 });
      fetchBookDetail();
    } catch (error) {
      console.error("Error adding review:", error);
    }
    console.log(formData);
    setEditingReviewId(null);
  };

  const ValidateForm = () => {
    return formData.rating > 0 || formEditData.rating > 0;
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!ValidateForm()) {
      showError("Vui lòng chọn số sao đánh giá");
      return;
    }
    try {
      const updatedReview = {
        ...formEditData,
        bookId: bookId,
        userId: user.id,
      };
      console.log(updatedReview);
      const addedReview = await updateReview(editingReviewId, updatedReview);
      setFormData({ feedback: "", rating: 0 });
      fetchBookDetail();
    } catch (error) {
      console.error("Error adding review:", error);
    }
    console.log(formEditData);
    setEditingReviewId(null);
  };
  const toggleExpand = (authorId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [authorId]: !prevState[authorId],
    }));
  };

  const renderDropdown = (reviewId) => (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        id={`dropdown-${reviewId}`}
        style={{ fontSize: "small", color: "#000" }}
      >
        <i className="bi bi-three-dots"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleEdit(reviewId)}>Sửa</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(reviewId)}>
          Xóa
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const handleEdit = (reviewId) => {
    setEditingReviewId(reviewId);

    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    setFormEditData({
      rating: reviewToEdit.rating,
      feedback: reviewToEdit.feedback,
    });
  };

  const handleCancel = () => {
    setEditingReviewId(null);
  };

  const handleDelete = async (reviewId) => {
    const isConfirmed = window.confirm(
      "Bản cách xóa bán đánh giá nếu bắn có muốn xóa bán đánh giá này"
    );
    if (isConfirmed) {
      try {
        await deleteReview(reviewId);
        fetchBookDetail();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Notification />
      {!librarian && (
        <>
          <h6 style={{ marginBottom: "20px" }}>Viết đánh giá</h6>
          <Form onSubmit={handleSubmit}>
            <TextArea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Viết feedback của bạn..."
              rows={6}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Form.Group>
                <Rating
                  initialRating={formData.rating}
                  onChange={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                  fullSymbol={
                    <BsStarFill style={{ color: "gold", marginRight: "5px" }} />
                  }
                  emptySymbol={
                    <BsStar
                      style={{ color: "lightgray", marginRight: "5px" }}
                    />
                  }
                  halfSymbol={
                    <BsStarHalf style={{ color: "gold", marginRight: "5px" }} />
                  }
                />
              </Form.Group>

              <Button
                type="submit"
                style={{
                  fontSize: "small",
                  backgroundColor: "#F87555",
                  border: "none",
                }}
              >
                Gửi
              </Button>
            </div>
          </Form>
        </>
      )}

      <h6 style={{ margin: "20px 0" }}>Đánh giá ({totalReviews})</h6>
      {reviews && reviews.length > 0 ? (
        <ListGroup>
          {reviews.map((review) => (
            <ListGroup.Item
              key={review.id}
              style={{ border: "none", padding: "0", margin: "10px 0" }}
            >
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <span
                      style={{
                        marginRight: "10px",
                        fontSize: "small",
                        fontWeight: "bold",
                      }}
                    >
                      {review.memberName}
                    </span>
                    {editingReviewId === review.id ? (
                      <Rating
                        initialRating={formEditData.rating}
                        onChange={(value) =>
                          setFormEditData({ ...formEditData, rating: value })
                        }
                        fullSymbol={
                          <BsStarFill
                            style={{ color: "gold", marginRight: "5px" }}
                          />
                        }
                        emptySymbol={
                          <BsStar
                            style={{ color: "lightgray", marginRight: "5px" }}
                          />
                        }
                        halfSymbol={
                          <BsStarHalf
                            style={{ color: "gold", marginRight: "5px" }}
                          />
                        }
                      />
                    ) : (
                      <Rating
                        initialRating={review.rating}
                        readonly
                        fullSymbol={
                          <BsStarFill
                            style={{ color: "gold", marginRight: "3px" }}
                          />
                        }
                        emptySymbol={
                          <BsStar
                            style={{ color: "lightgray", marginRight: "3px" }}
                          />
                        }
                        halfSymbol={
                          <BsStarHalf
                            style={{ color: "gold", marginRight: "3px" }}
                          />
                        }
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "small",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginLeft: "10px" }}>
                      {review.updatedAt}
                    </span>
                    {editingReviewId === review.id ? (
                      <div>
                        <Button
                          onClick={handleCancel}
                          style={{
                            fontSize: "small",
                            backgroundColor: "transparent",
                            border: "1px solid #ABABAB",
                            marginLeft: "10px",
                            color: "#ABABAB",
                          }}
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={handleEditSubmit}
                          style={{
                            fontSize: "small",
                            backgroundColor: "#F87555",
                            border: "none",
                            marginLeft: "10px",
                          }}
                        >
                          Lưu
                        </Button>
                      </div>
                    ) : (
                      renderDropdown(review.id)
                    )}
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "justify", fontSize: "small" }}>
                {editingReviewId === review.id ? (
                  <TextArea
                    name="feedback"
                    value={formEditData.feedback}
                    onChange={handleEditChange}
                    placeholder="Viết feedback của bạn..."
                    rows={6}
                  />
                ) : (
                  <span>
                    {review.feedback.length > 200
                      ? `${review.feedback.slice(0, 200)}...`
                      : review.feedback}
                    {review.feedback.length > 200 && (
                      <span
                        style={{
                          color: "#F87555",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toggleExpand(review.id)}
                      >
                        {expanded[review.id] ? "Thu gọn" : "Xem thêm"}
                      </span>
                    )}
                  </span>
                )}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div style={{ fontSize: "small" }}>Chưa có đánh giá nào</div>
      )}
    </div>
  );
};

export default ReviewsTab;
