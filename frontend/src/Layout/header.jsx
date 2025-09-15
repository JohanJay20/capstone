

const Header = ({ user }) => {

   const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/welcomepage";
  };

  return (
     <div className="header">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                  
                </div>
                <ul className="navbar-nav header-right main-notification">
                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link bell dz-fullscreen" href="#">
                      <svg id="icon-full" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" style={{strokeDasharray: "37, 57", strokeDashoffset: 0}}></path>
                      </svg>
                      <svg id="icon-minimize" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minimize">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" style={{strokeDasharray: "37, 57", strokeDashoffset: 0}}></path>
                      </svg>
                    </a>
                  </li>

                  <li className="nav-item dropdown header-profile">
                    <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                      <img src={user?.image} width="20" alt=""/>
                      <div className="header-info">
                        <span>{user?.givenName}</span>
                        <small>Super Admin</small>
                      </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a href="/profile" className="dropdown-item ai-icon">
                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className="ml-2">Profile </span>
                      </a>
                      
                      <a href="#" onClick={handleLogout} className="dropdown-item ai-icon">
                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span className="ml-2" >Logout </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
  );
};

export default Header;

