"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { handleGetRecommend } from "./helpers/recommendSize";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [recommendation, setRecommendation] = useState(null); // Initialize with null

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecommendation(null); // Clear recommendation on close
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "weight") setWeight(value);
    if (name === "height") setHeight(value);
    if (name === "age") setAge(value);
  };

  const onSubmitModal = async (e) => {
    e.preventDefault();
    const formData = { weight, height, age };
    console.log("Form Data on Submit:", formData);

    try {
      const response = await handleGetRecommend(formData);
      const size = response.data.size; // Ambil nilai size dari response
      let sizeLabel;
      if (size === 1) {
        sizeLabel = "XS";
      } else if (size === 2) {
        sizeLabel = "S";
      } else if (size === 3) {
        sizeLabel = "M";
      } else if (size === 4) {
        sizeLabel = "L";
      } else if (size === 5) {
        sizeLabel = "XL";
      } else if (size === 6) {
        sizeLabel = "XXL";
      } else {
        sizeLabel = "XXL"; // Jika nilai size tidak sesuai dengan kondisi di atas
      }

      setRecommendation(sizeLabel);
    } catch (error) {
      console.error("Error fetching recommendation:", error.message);
      setRecommendation(null); // Reset recommendation state on error
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          NEXT-GEN<span>-FIT</span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#collection">Collection</a>
            </li>
            <li>
              <a href="#styles">Styles</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Let's Fit</h1>
          <button onClick={openModal} id="recommendationButton" className="recommendation-btn">
            Get Size Recommendation
          </button>
        </div>
      </section>

      <section id="collection" className="featured">
        <h2>Our Featured Collection</h2>
        <div className="featured-items">
          <div className="item">
            <Image src={"/gambar1.png"} width={500} height={500} alt="Fashion Item 1" />
            <p>Stylish Muslimah Outfit</p>
          </div>
          <div className="item">
            <Image src={"/gambar2.png"} width={500} height={500} alt="Fashion Item 2" />
            <p>Elegant Muslimah Outfit</p>
          </div>
        </div>
      </section>

      <section id="styles" className="product-grid">
        <h2>Featured Hijabi Styles</h2>
        <div className="grid-items">
          <div className="grid-item">
            <Image src={"/gambar3.png"} width={500} height={500} alt="Product 1" />
            <p>Fashionable Hijab</p>
          </div>
          <div className="grid-item">
            <Image src={"/gambar4.png"} width={500} height={500} alt="Product 2" />
            <p>Casual Hijab Style</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="links">
            <a href="#">Home</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Input Your Details</h2>
            <form id="sizeForm" onSubmit={onSubmitModal}>
              <label htmlFor="height">Height (cm):</label>
              <input type="number" id="height" name="height" value={height} onChange={handleChange} required />
              <label htmlFor="weight">Weight (kg):</label>
              <input type="number" id="weight" name="weight" value={weight} onChange={handleChange} required />
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" value={age} onChange={handleChange} required />
              <button type="submit">Get Recommendation</button>
            </form>
            {recommendation !== null && <p id="recommendationResult">Recommended size: {recommendation}</p>}
          </div>
        </div>
      )}
    </>
  );
}
