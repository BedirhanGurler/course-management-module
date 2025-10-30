import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}
    >
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <div
          className="d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <span style={{ fontSize: '40px' }}>🎓</span>
        </div>

        <h1
          className="fw-bold mb-3"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          }}
        >
          Ders Yönetim Paneline Hoş Geldiniz!
        </h1>

        <p
          className="text-secondary mb-4"
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight: '1.6',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          Bu panel sayesinde dersleri ve kategorileri kolayca oluşturabilir,
          düzenleyebilir ve yönetebilirsiniz.
        </p>

        <div className="row g-3 mt-2 justify-content-center" style={{ margin: '0 auto', maxWidth: '600px' }}>
          <div className="col-sm-6">
            <Link to="/course" className="text-decoration-none">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="card-body p-4 text-center">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>📖</span>
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: '#667eea', fontSize: '1.1rem' }}>
                    Dersler
                  </h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                    Yeni ders ekleyin ve yönetin
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-sm-6">
            <Link to="/category" className="text-decoration-none">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(118, 75, 162, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="card-body p-4 text-center">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      boxShadow: '0 4px 12px rgba(118, 75, 162, 0.3)',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>🏷️</span>
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: '#764ba2', fontSize: '1.1rem' }}>
                    Kategoriler
                  </h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                    Kategori oluşturun ve düzenleyin
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 1.25rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default HomePage;
