import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/style/Home.css';

const books = [
  {
    isbn: '123456789',
    title: 'The Design of Everyday Things',
    image: 'https://th.bing.com/th/id/OIP.9ujQpnC2jq_sCiYI2o3bIwAAAA?rs=1&pid=ImgDetMain/100x150',
    price: '50.000 đ',
    totalPage: 300,
    language: 'Tiếng Anh',
    subject: 'Thiết kế',
    publisher: 'NXB Kim Đồng',
    publicationYear: 1988,
    status: 'Còn hàng',
    stock: 10,
    authors: ['Don Norman'],
    categories: ['Tiểu thuyết', 'Trinh thám']
  },
  {
    isbn: '987654321',
    title: 'Clean Code',
    image: 'https://th.bing.com/th/id/OIP.9ujQpnC2jq_sCiYI2o3bIwAAAA?rs=1&pid=ImgDetMain/100x150',
    price: '70.000 đ',
    totalPage: 400,
    language: 'Tiếng Anh',
    subject: 'Lập trình',
    publisher: 'NXB Trẻ',
    publicationYear: 2008,
    status: 'Còn hàng',
    stock: 5,
    authors: ['Robert C. Martin'],
    categories: ['Công nghệ thông tin']
  },
  {
    isbn: '111222333',
    title: 'The Lean Startup',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51T-4u9x9JL._SX328_BO1,204,203,200_.jpg',
    price: '60.000 đ',
    totalPage: 272,
    language: 'Tiếng Anh',
    subject: 'Khởi nghiệp',
    publisher: 'NXB Thế Giới',
    publicationYear: 2011,
    status: 'Còn hàng',
    stock: 8,
    authors: ['Eric Ries'],
    categories: ['Khởi nghiệp', 'Doanh nghiệp']
  },
  {
    isbn: '444555666',
    title: 'Sapiens: A Brief History of Humankind',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51y5-F4x2JL._SX328_BO1,204,203,200_.jpg',
    price: '80.000 đ',
    totalPage: 464,
    language: 'Tiếng Anh',
    subject: 'Lịch sử',
    publisher: 'NXB Hà Nội',
    publicationYear: 2015,
    status: 'Còn hàng',
    stock: 12,
    authors: ['Yuval Noah Harari'],
    categories: ['Lịch sử', 'Triết học']
  },
  {
    isbn: '777888999',
    title: 'Thinking, Fast and Slow',
    image: 'https://images-na.ssl-images-amazon.com/images/I/514u-G4x9JL._SX328_BO1,204,203,200_.jpg',
    price: '75.000 đ',
    totalPage: 512,
    language: 'Tiếng Anh',
    subject: 'Tâm lý học',
    publisher: 'NXB Đại học Quốc gia Hà Nội',
    publicationYear: 2011,
    status: 'Còn hàng',
    stock: 7,
    authors: ['Daniel Kahneman'],
    categories: ['Tâm lý học', 'Khoa học hành vi']
  },
  {
    isbn: '222333444',
    title: 'The 7 Habits of Highly Effective People',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51z7-6y19JL._SX328_BO1,204,203,200_.jpg',
    price: '65.000 đ',
    totalPage: 384,
    language: 'Tiếng Anh',
    subject: 'Tự phát triển',
    publisher: 'NXB Văn hóa - Văn nghệ',
    publicationYear: 1989,
    status: 'Còn hàng',
    stock: 9,
    authors: ['Stephen R. Covey'],
    categories: ['Tự phát triển', 'Kỹ năng sống']
  },
  {
    isbn: '555666777',
    title: 'The Power of Habit',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51uQ-qM3oVL._SX328_BO1,204,203,200_.jpg',
    price: '55.000 đ',
    totalPage: 320,
    language: 'Tiếng Anh',
    subject: 'Hành vi',
    publisher: 'NXB Lao động',
    publicationYear: 2012,
    status: 'Còn hàng',
    stock: 11,
    authors: ['Charles Duhigg'],
    categories: ['Hành vi', 'Khoa học hành vi']
  },
  {
    isbn: '888999000',
    title: 'Atomic Habits',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51yJ-4oX40L._SX328_BO1,204,203,200_.jpg',
    price: '60.000 đ',
    totalPage: 320,
    language: 'Tiếng Anh',
    subject: 'Thói quen',
    publisher: 'NXB Giáo dục',
    publicationYear: 2018,
    status: 'Còn hàng',
    stock: 15,
    authors: ['James Clear'],
    categories: ['Thói quen', 'Tự phát triển']
  },
  {
    isbn: '333444555',
    title: 'The Innovators Dilemma',
    image: 'https://images-na.ssl-images-amazon.com/images/I/519J-17p3TL._SX328_BO1,204,203,200_.jpg',
    price: '70.000 đ',
    totalPage: 272,
    language: 'Tiếng Anh',
    subject: 'Sáng tạo',
    publisher: 'NXB Khoa học và Kỹ thuật',
    publicationYear: 1997,
    status: 'Còn hàng',
    stock: 6,
    authors: ['Clayton M. Christensen'],
    categories: ['Sáng tạo', 'Doanh nghiệp']
  },
  {
    isbn: '666777888',
    title: 'The 4-Hour Workweek',
    image: 'https://images-na.ssl-images-amazon.com/images/I/516K-729bSL._SX328_BO1,204,203,200_.jpg',
    price: '55.000 đ',
    totalPage: 352,
    language: 'Tiếng Anh',
    subject: 'Làm việc',
    publisher: 'NXB Thanh niên',
    publicationYear: 2007,
    status: 'Còn hàng',
    stock: 10,
    authors: ['Timothy Ferriss'],
    categories: ['Làm việc', 'Tự do tài chính']
  }
];

const Home = () => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (book) => {
    setHoveredBook(book);
  };

  const handleMouseLeave = () => {
    setHoveredBook(null);
  };

  const handleClick = (book) => {
    navigate(`/book/${book.isbn}`);
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div
          key={book.isbn}
          className="book-item"
          onMouseEnter={() => handleMouseEnter(book)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(book)}
        >
          <img src={book.image} alt={book.title} className="book-image" />
          <div className="book-price">{book.price}</div>
          <div className="book-title">{book.title}</div>
          {hoveredBook && hoveredBook.isbn === book.isbn && (
            <div className="book-info">
              <img src={hoveredBook.image} alt={hoveredBook.title} className="book-info-image" />
              <div className="book-info-details">
                <div className="book-info-title">{hoveredBook.title}</div>
                <div>{hoveredBook.authors.join(', ')}, {hoveredBook.publicationYear}</div>
                <div>{hoveredBook.publisher}</div>
                <div>Thể loại: {hoveredBook.categories.join(', ')}</div>
                <div>Ngôn ngữ: {hoveredBook.language}</div>
                <div className="book-info-price">{hoveredBook.price}</div>
                <button className="read-now-button" onClick={() => handleClick(hoveredBook)}>Đọc ngay</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;