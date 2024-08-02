import React from 'react';
import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container"> 
        <Link href="/">
          <a className="navbar-brand">Loja Next</a> 
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav"> 
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link" >
                  Home 
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroLista">
                <a className="nav-link"> 
                  Catálogo
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroDados">
                <a className="nav-link" >
                  Novo
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;