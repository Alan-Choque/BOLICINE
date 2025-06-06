'use client'
import React, { useState } from 'react';
import styles from './MetodoDePago.module.css';

const MetodoDePago: React.FC = () => {
  const [opcion, setOpcion] = useState<'none' | 'visa' | 'qr'>('none');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  return (
    <div className={styles.container}>
      {/* 1. Título */}
      <h2 className={styles.title}>MEDIO DE PAGO</h2>

      {/* 2. Botones de opción: Tarjeta de pago / QR */}
      <div className={styles.opciones}>
        {/* Botón Tarjeta de pago */}
        <button
          className={
            opcion === 'visa'
              ? styles.botonOpcionActivo
              : styles.botonOpcionInactivo
          }
          onClick={() => setOpcion('visa')}
          type="button"
        >
          <img
            src="/images/visa-icon.png"
            alt="Visa"
            className={styles.icono}
          />
          <span>Tarjeta de pago</span>
        </button>

        {/* Botón QR */}
        <button
          className={
            opcion === 'qr'
              ? styles.botonOpcionActivo
              : styles.botonOpcionInactivo
          }
          onClick={() => setOpcion('qr')}
          type="button"
        >
          <img
            src="/images/qr-icon.png"
            alt="QR"
            className={styles.icono}
          />
          <span>QR</span>
        </button>
      </div>

      {/* 3. Si seleccionó “Visa”, mostramos el campo con la tarjeta bloqueada */}
      {opcion === 'visa' && (
        <div className={styles.campoTarjetaBloqueada}>
          <img
            src="/images/visa-icon.png"
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

      {/* 4. Checkbox de Términos y Condiciones */}
      <label className={styles.labelCheckbox}>
        <input
          type="checkbox"
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.target.checked)}
        />
        <span className={styles.casilla}></span>
        <span className={styles.textoCheckbox}>
          Acepto los Términos y Condiciones y el Aviso de Privacidad
        </span>
      </label>

      {/* 5. Campo “Nombre y Apellido” */}
      <div className={styles.formField}>
        <label className={styles.labelField}>Nombre y Apellido</label>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Nombre y Apellido"
        />
      </div>

      {/* 6. Campo “Email” */}
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

      {/* 7. Texto de advertencia en fondo amarillo */}
      <p className={styles.advertencia}>
        LOS BOLETOS SON VÁLIDOS ÚNICAMENTE PARA EL DÍA Y HORARIO SELECCIONADO. NO
        SE REALIZAN REEMBOLSOS NI CAMBIOS DE HORARIOS UNA VEZ REALIZADA LA COMPRA.
      </p>

      {/* 8. Botón RESERVAR (solo habilitado si aceptó términos) */}
      <button
        className={styles.botonReservar}
        type="button"
        disabled={!aceptaTerminos}
      >
        RESERVAR
      </button>
    </div>
  );
};

export default MetodoDePago;
