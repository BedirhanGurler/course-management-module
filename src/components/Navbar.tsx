import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div 
            className="d-flex align-items-center justify-content-center me-2"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <span style={{ fontSize: '20px' }}>📚</span>
          </div>
          <span className="fw-bold" style={{ 
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ders Yönetim Modülü
          </span>
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-1">
          <li className="nav-item">
            <Link 
              className="nav-link px-3 py-2 rounded-3 position-relative"
              to="/course"
              style={{
                color: isActive('/course') ? '#667eea' : '#6c757d',
                fontWeight: isActive('/course') ? '600' : '500',
                transition: 'all 0.3s ease',
                backgroundColor: isActive('/course') ? '#f0f2ff' : 'transparent'
              }}
            >
              📖 Dersler
              {isActive('/course') && (
                <span 
                  className="position-absolute bottom-0 start-50 translate-middle-x"
                  style={{
                    width: '30px',
                    height: '3px',
                    backgroundColor: '#667eea',
                    borderRadius: '3px 3px 0 0'
                  }}
                />
              )}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link px-3 py-2 rounded-3 position-relative"
              to="/category"
              style={{
                color: isActive('/category') ? '#667eea' : '#6c757d',
                fontWeight: isActive('/category') ? '600' : '500',
                transition: 'all 0.3s ease',
                backgroundColor: isActive('/category') ? '#f0f2ff' : 'transparent'
              }}
            >
              🏷️ Kategoriler
              {isActive('/category') && (
                <span 
                  className="position-absolute bottom-0 start-50 translate-middle-x"
                  style={{
                    width: '30px',
                    height: '3px',
                    backgroundColor: '#667eea',
                    borderRadius: '3px 3px 0 0'
                  }}
                />
              )}
            </Link>
          </li>
          <li className="nav-item ms-2">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                alt="Profile"
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '50%',
                  border: '2px solid white'
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;