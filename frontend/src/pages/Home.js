import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import './Home.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const [imageCode, setImageCode] = useState('');
  const [images, setImages] = useState([]);
  const [width, setWidth] = useState(150); // Default width
  const [height, setHeight] = useState(130); // Default height
  const [savedLists, setSavedLists] = useState(() => {
    const saved = localStorage.getItem('savedLists');
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
  }, [savedLists]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = `${window.location.origin}/products`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  const handleInputChange = (e) => {
    setImageCode(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (imageCode) {
      const matchedImages = [];
      const searchPatterns = imageCode.split('').map((char) => (char === 'x' ? '\\d' : char)).join('');
      const regexPattern = new RegExp(`^${searchPatterns}`);
      
      for (let i = 100; i < 600; i++) {
        const codeStr = i.toString();
        if (regexPattern.test(codeStr)) {
          const url = `https://http.dog/${codeStr}.jpg`;
          try {
            const response = await fetch(url);
            if (response.ok) {
              matchedImages.push(url);
            } else {
              console.error(`Failed to fetch image for code: ${codeStr}`);
            }
          } catch (error) {
            console.error(`Error fetching image for code: ${codeStr}`, error);
          }
        }
      }
      setImages(matchedImages);
    }
  };

  const handleSave = () => {
    const listName = prompt("Enter a name for your list:");
    if (listName) {
      const newList = {
        name: listName,
        date: new Date().toLocaleDateString(),
        codes: images.map(img => img.match(/\d+/)[0]),
        images: images
      };
      setSavedLists([...savedLists, newList]);
    }
  };

  const handleViewLists = () => {
    navigate('/listing');
  };

  return (
    <div className='header'>
      <h1>Welcome to Dogs World......</h1>
      <button  onClick={handleLogout}>Logout</button>
      <div>
        {products && products.map((item, index) => (
          <ul key={index}>
            <span>{item.name} : {item.price}</span>
          </ul>
        ))}
      </div>
      <div className="home-container">
        <div className="search-container">
          <h1>Search for Images</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter response code..."
              value={imageCode}
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
          <button onClick={handleSave} disabled={images.length === 0}>Save List</button>
        </div>
        <div className="image-display">
          {images.length > 0 ? (
            images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Response code ${index}`}
                style={{ width: `${width}px`, height: `${height}px` }}
              />
            ))
          ) : (
            <p>No images found.</p>
          )}
          <div className="resize-controls">
            <label>
              Width:
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </label>
          </div>
        </div>
        <button onClick={handleViewLists}>View Saved Lists</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
