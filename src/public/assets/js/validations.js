// Autor => Daniel Quesada Arias

const validations = {
    required: (value) => value.trim() !== '' || 'Campo Requerido.',
    email: (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || 'Correo no valido.',
    minLength: (min) => (value) => value.length >= min || `Debe tener minimo ${min} caracteres.`,
    maxLength: (max) => (value) => value.length <= max || `Debe tener maximo ${max} caracteres.`,
    numericOnly: (value) => /^\d+$/.test(value) || 'Introduce solo numeros.',
    passwordStrength: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || 'La Contrasena debe incluir mayuscula, minuscula, numeros y tener almenos 8 caracteres.',
    phoneNumber: (value) => /^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value) || 'Telefono no valido.',
    url: (value) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value) || 'URL no valida.',
  };

  export default validations