import React from "react";

const Footer = () => {
  return (
    <footer className="grid">
      <div className="bg-red-500 text-white py-6 px-10 flex justify-between">
        <div className="flex flex-col space-y-2">
          <a href="">Facebook</a>
          <a href="">Instagram</a>
          <a href="">Tik Tok</a>
          <a href="">WhatsApp</a>
        </div>
        <div className="flex flex-col items-end justify-center">
          <p className="text-sm text-right">
            © 2025 Bolicine. Todos los derechos reservados.
          </p>
          <p className="text-xs mt-2">Desarrollado por NovaCode</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
