import React from 'react';
import PropTypes from 'prop-types';

const Header = ( { titulo } ) => {
  return ( 
    <nav>
      <div 
      // https://materializecss.com/getting-started.html
      // Materialice. los colores son de matirial design
      // Primero el color despues la intensidad
        className="nav-wrapper deep-purple">
          {/*warning The href attribute requires a valid value to be accessible. */}
          {/* Agregar ! */}
          <a href="#!" className="brand-logo">{titulo}</a>
      </div>
    </nav>
   );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired
}

export default Header;