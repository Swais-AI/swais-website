"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function MediaAssetsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("socialMedia");
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    "/photos/photo1.jpg",
    "/photos/photo2.jpg",
    "/photos/photo3.jpg",
    "/photos/photo4.jpg",
    "/photos/photo5.jpg",
    "/photos/photo6.jpg",
    "/photos/photo7.jpg",
    "/photos/photo8.jpg",
  ];

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "print" || tab === "socialMedia") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((item) => item.classList.add("visible"));
  }, [activeTab]);

  const showPreviousImage = () => {
    const currentIndex = galleryImages.indexOf(selectedImage);

    const previousIndex =
      currentIndex === 0
        ? galleryImages.length - 1
        : currentIndex - 1;

    setSelectedImage(galleryImages[previousIndex]);
  };

  const showNextImage = () => {
    const currentIndex = galleryImages.indexOf(selectedImage);

    const nextIndex =
      currentIndex === galleryImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(galleryImages[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (e.key === "ArrowRight") {
        showNextImage();
      }

      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <>
      <style jsx global>{`
        body {
          background: #f9f1e1;
          margin: 0;
          padding: 0;
        }

        .media-page {
          font-family: "Cormorant Garamond", serif;
          color: #1a120a;
          background: #f9f1e1;
          min-height: 100vh;
          padding-top: 90px;
        }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 5vw 4rem;
          text-align: center;
        }

        .hero-eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b07d1a;
          margin-bottom: 0.5rem;
        }

        .hero h1 {
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          color: #1a120a;
          margin-bottom: 1rem;
        }

        .hero h1 em,
        .section-title em {
          color: #c8860a;
        }

        .hero-sub {
          font-size: 1rem;
          color: rgba(26, 18, 10, 0.65);
          max-width: 620px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .tab-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          border: 1.5px solid rgba(180, 130, 20, 0.3);
          border-radius: 8px;
          overflow: hidden;
        }

        .tab-btn {
          padding: 0.8rem 1.7rem;
          border: none;
          background: transparent;
          color: rgba(26, 18, 10, 0.55);
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s ease;
          font-size: 0.95rem;
        }

        .tab-btn:hover {
          background: rgba(200, 134, 10, 0.1);
        }

        .tab-btn.active {
          background: #c8860a;
          color: white;
        }

        section {
          padding: 1.5rem 5vw 5rem;
        }

        .section-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b07d1a;
          margin-bottom: 0.8rem;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300;
          margin-bottom: 1rem;
        }

        .section-sub {
          max-width: 560px;
          color: rgba(26, 18, 10, 0.6);
          line-height: 1.7;
        }

        .cards-grid,
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .gallery-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid rgba(180, 130, 20, 0.22);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: white;
        }

        .gallery-image:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .image-popup {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .popup-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-image {
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 14px;
          object-fit: contain;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 25px;
          background: white;
          color: black;
          border: none;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          font-weight: bold;
          z-index: 10001;
        }

        .prev-btn {
          left: 20px;
        }

        .next-btn {
          right: 20px;
        }

        .card {
          background: rgba(255, 248, 225, 0.85);
          border: 1px solid rgba(180, 130, 20, 0.22);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(100, 70, 10, 0.08);
        }

        .badge {
          display: inline-block;
          background: rgba(200, 134, 10, 0.12);
          color: #b07d1a;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          font-size: 0.7rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: #1a120a;
        }

        .card p {
          color: rgba(26, 18, 10, 0.62);
          line-height: 1.7;
          font-size: 0.92rem;
        }

        .social-link {
          display: inline-block;
          margin-top: 1rem;
          color: #c8860a;
          font-weight: 700;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .social-link:hover {
          color: #8a5b00;
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .cards-grid,
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .hero h1 {
            font-size: 3rem;
          }

          .popup-image {
            max-width: 80vw;
          }

          .nav-btn {
            width: 42px;
            height: 42px;
            font-size: 22px;
          }
        }
      `}</style>

      <main className="media-page">
        <section className="hero">
          <div className="hero-eyebrow">
            Press · Publications · Gallery
          </div>

          <h1>
            Media <em>Assets</em>
          </h1>

          <p className="hero-sub">
            News coverage, visual stories, social updates, and memorable moments
            from the SWAIS journey.
          </p>

          <div className="tab-bar">
            <button
              className={`tab-btn ${
                activeTab === "socialMedia" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("socialMedia");
                router.push("/mediaassets?tab=socialMedia");
              }}
            >
              📱 Social Media
            </button>

            <button
              className={`tab-btn ${activeTab === "print" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("print");
                router.push("/mediaassets?tab=print");
              }}
            >
              🖼️ Print Media
            </button>
          </div>
        </section>

        {activeTab === "socialMedia" && (
          <section>
            <div className="section-eyebrow">Social Media</div>

            <h2 className="section-title">
              Follow SWAIS <em>updates</em>
            </h2>

            <p className="section-sub">
              Stay connected through LinkedIn and more.
            </p>

            <div className="cards-grid">
              <div className="card">
                <div className="card-content">
                  <span className="badge">LinkedIn</span>

                  <h3>SWAIS Official LinkedIn</h3>

                  <p>
                    SWAIS shares company updates, AI innovations, training
                    programs, educational initiatives, project milestones,
                    workshops, student success stories, and industry
                    collaborations.
                  </p>

                  <a
                    href="https://www.linkedin.com/company/swais/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    Visit LinkedIn Page →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "print" && (
          <section>
            <div className="section-eyebrow">Print Media</div>

            <h2 className="section-title">
              Moments that <em>matter</em>
            </h2>

            <p className="section-sub">
              Events, awards, launches, workshops, and team memories.
            </p>

            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="gallery-image"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            {selectedImage && (
              <div
                className="image-popup"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  ✕
                </button>

                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="nav-btn prev-btn"
                    onClick={showPreviousImage}
                  >
                    ❮
                  </button>

                  <img
                    src={selectedImage}
                    alt="Opened gallery"
                    className="popup-image"
                  />

                  <button
                    className="nav-btn next-btn"
                    onClick={showNextImage}
                  >
                    ❯
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default function MediaAssetsPage() {
  return (
    <Suspense>
      <MediaAssetsContent />
    </Suspense>
  );
}
