'use client';

import React, { useState } from 'react';
import NavBar from './NavBar';
import styles from './MetodoDePago.module.css';

const MetodoDePago: React.FC = () => {
  // Estado para la opción seleccionada: 'none' | 'visa' | 'qr'
  const [opcion, setOpcion] = useState<'none' | 'visa' | 'qr'>('none');
  // Estado para saber si se aceptaron términos
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  return (
    <>
      {/* Barra de navegación */}
      <NavBar />

      {/* Formulario */}
      <div className={styles.container}>
        {/* 1. Título */}
        <h2 className={styles.title}>MEDIO DE PAGO</h2>

        {/* 2. Botones de opción */}
        <div className={styles.opciones}>
          {/* Tarjeta de pago */}
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
              src="/images/vector.png"
              alt="Visa"
              className={styles.icono}
            />
            <span>Tarjeta de pago</span>
          </button>

          {/* QR */}
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

        {/* 3. Campo bloqueado para Visa */}
        {opcion === 'visa' && (
          <div className={styles.campoTarjetaBloqueada}>
            <img
              src="/images/vector.png"
              alt="Visa"
              className={styles.iconoPequeño}
            />
            <input
              className={styles.inputBloqueado}
              type="text"
              placeholder="VISA 4716 .... 5615"
              disabled
            />
          </div>
        )}

        {/* 4. Checkbox de Términos */}
        <label className={styles.labelCheckbox}>
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.currentTarget.checked)}
          />
          <span className={styles.casilla} />
          <span className={styles.textoCheckbox}>
            Acepto los Términos y Condiciones y el Aviso de Privacidad
          </span>
        </label>

        {/* 5. Nombre y Apellido */}
        <div className={styles.formField}>
          <label className={styles.labelField}>Nombre y Apellido</label>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Nombre y Apellido"
          />
        </div>

        {/* 6. Email */}
        <div className={styles.formField}>
          <label className={styles.labelField}>
            Ingresa tu email para la confirmación de la compra
          </label>
          <input
            className={styles.inputField}
            type="email"
            placeholder="ej: ejemplo@ejemplo.com"
          />
        </div>

        {/* 7. Advertencia */}
        <p className={styles.advertencia}>
          LOS BOLETOS SON VÁLIDOS ÚNICAMENTE PARA EL DÍA Y HORARIO SELECCIONADO. NO
          SE REALIZAN REEMBOLSOS NI CAMBIOS DE HORARIOS UNA VEZ REALIZADA LA COMPRA.
        </p>

        {/* 8. Botón RESERVAR */}
        <button
          type="button"
          className={styles.botonReservar}
          disabled={!aceptaTerminos}
        >
          RESERVAR
        </button>
      </div>
    </>
  );
};

export default MetodoDePago;
