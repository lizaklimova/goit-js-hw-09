const formRef = document.querySelector('.form');

let counter;
formRef.addEventListener('submit', createPromise);
formRef.addEventListener('submit', preventDefault);

function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;

  const delayValue = formRef.elements.delay.value;
  const stepValue = formRef.elements.delay.step;
  const amountValue = formRef.elements.delay.amount;

  const id = setInterval(() => {
    
    if (position === amountValue) {
      clearInterval(id);
    }

   
    if (shouldResolve) {
      return Promise.resolve({ position, delay });
    } else {
      return Promise.reject({ position, delay });
    }
  }, (delay - stepValue) += stepValue);

  return id;
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

function preventDefault(event) {
  event.preventDefault();
}
