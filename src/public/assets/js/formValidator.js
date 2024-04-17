// Autor => Daniel Quesada Arias
 
 export default function validateForm(formId,validationRules) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      let isFormValid = true;
  
      Object.keys(validationRules).forEach(fieldName => {
        console.log(fieldName)
        const input = form.querySelector(`[name="${fieldName}"]`);
        const value = input.value;
        const rules = validationRules[fieldName];
        let errorMessage = '';
  
        for (let rule of rules) {
          const result = rule(value);
          if (result !== true) {
            errorMessage = result;
            break;
          }
        }
  
        const errorLabel = form.querySelector(`#error-${fieldName}`);
        if (errorMessage) {
          isFormValid = false;
          input
          if (errorLabel) {
            errorLabel.textContent = errorMessage;
          } else {
            const label = document.createElement('label');
            label.id = `error-${fieldName}`;
            label.textContent = errorMessage;
            label.style.color = 'yellow';
            input.parentNode.insertBefore(label, input.nextSibling);
          }
        } else if (errorLabel) {
          errorLabel.remove();
        }
      });
  
      if (isFormValid) {
        // form.submit(); // Se envian los datos.
        console.log('No hay errores!');
      }
    });
  }
  