'use client';

import React, { useState } from 'react';
import NavBar from './NavBar';
import styles from './MetodoDePago.module.css';

const MetodoDePago: React.FC = () => {
  const [opcion, setOpcion] = useState<'none' | 'visa' | 'qr'>('none');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  return (
    <div className={styles.container}>
      <NavBar />
      <h2 className={styles.title}>MEDIO DE PAGO</h2>

      {/*Botones de opción */}
      <div className={styles.opciones}>
        <button
          type="button"
          className={
            opcion === 'visa'
              ? styles.botonOpcionActivo
              : styles.botonOpcionInactivo
          }
          onClick={() => setOpcion('visa')}
        >
          <img
            src="/images/visa.png"
            alt="Visa"
            className={styles.iconoPequeño}
          />
          <span>Tarjeta de pago</span>
        </button>

        <button
          type="button"
          className={
            opcion === 'qr'
              ? styles.botonOpcionActivo
              : styles.botonOpcionInactivo
          }
          onClick={() => setOpcion('qr')}
        >
          <img src="/images/qr.png" alt="QR" className={styles.icono} />
          <span>QR</span>
        </button>
      </div>

      {opcion === 'visa' && (
        <div className={styles.campoTarjetaBloqueada}>
          <img
            src="/images/visa.png"
            alt="Visa"
            className={styles.iconoPequeño}
          />
          <input
            className={styles.inputBloqueado}
            type="text"
            placeholder="VISA 4716 .... .... 5615"
            disabled
          />
        </div>
      )}

      <label className={styles.labelCheckbox}>
        <input
          type="checkbox"
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.currentTarget.checked)}
        />
        <span className={styles.casilla} />
        <span className={styles.textoCheckbox}>
          Acepto los <a href="#">Términos y Condiciones</a> y el <a href="#">Aviso de Privacidad</a>
        </span>
      </label>

      <div className={styles.formField}>
        <label className={styles.labelField}>Nombre y Apellido</label>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Nombre y Apellido"
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.labelField}>
          Ingresa tu email para la confirmacion de la compra
        </label>
        <input
          className={styles.inputField}
          type="email"
          placeholder="ej: ejemplo@ejemplo.com"
        />
      </div>

      <p className={styles.advertencia}>
        Los boletos son validos unicamente para el dia y horario seleccionado. No se realizan reembolsos ni cambios de horario una vez realizada la compra.
      </p>

      <button
        type="button"
        className={styles.botonReservar}
        disabled={!aceptaTerminos}
      >
        RESERVAR
      </button>
    </div>
  );
};

export default MetodoDePago;
