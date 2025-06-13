import React from 'react';

const Brands = () => {
  const containerStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    background: 'linear-gradient(to right, #ffffff, #f0f4f8)',
    padding: '40px 0',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    marginTop: '3rem',
  };

  const trackStyle = {
    display: 'inline-flex',
    animation: 'scroll 35s linear infinite',
    alignItems: 'center',
  };

  const imgStyle = {
    width: '100px',
    height: '100px',
    margin: '0 25px',
    objectFit: 'contain',
    filter: 'grayscale(0.3)',
    transition: 'transform 0.3s ease, filter 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
    e.currentTarget.style.filter = 'grayscale(0)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.filter = 'grayscale(0.3)';
  };

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2019/02/Accenture-Logo.png",
    "https://www.gartner.com/imagesrv/peer-insights/vendors/logos/sutherland-global-services.png",
    "https://etimg.etb2bimg.com/photo/102797309.cms",
    "https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500",
    "https://assets.upstox.com/content/assets/images/cms/202451/Amazon%20logo.png",
    "https://www.businessoffood.in/wp-content/uploads/2024/10/Swiggy-Banner-3-scaled-1.jpg",
    "https://play-lh.googleusercontent.com/ixPkPHkzd8VD0HbmCL1n5PKYi3tWn8hGpRjeP6lutuFWZ6VpXUePGa9ZHcP6f_99bDA=s256-rw",
    "https://yt3.googleusercontent.com/gCHepjodxvjcAXhiHzvNa5l_h7Xn5ghVeKGE6rTBy_XcyXDe-yEhyAK74HolUOmh-jVdp-NaeVE=s900-c-k-c0x00ffffff-no-rj",
    "https://www.consultancy.in/profile/media/cgi-spotlight-2024-04-08-113801292.png",
  ];

  return (
    <div style={containerStyle}>
      <h2
        className="text-center fw-bold mb-4"
        style={{
          background: 'linear-gradient(to right, #4caf50, #ff9800, #f44336)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem',
        }}
      >
        Top Companies Trust Us 🤝
      </h2>

      <div style={trackStyle}>
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo-${index}`}
            style={imgStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      {/* Keyframes for animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Brands;
