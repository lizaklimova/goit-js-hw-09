//
//~   Якщо імейл і пароль користувача збігаються, при сабмите зберігай дані з форми
//~   у локальне сховище і змінюй кнопку login на logout і роби поля введення
//~   Недоступними для зміни.
//
// ~  При перезавантаженні сторінки, якщо користувач залогінений, ми повинні бачити logout-кнопку
//~   та недоступні для зміни поля з даними користувача.
//~   Клік по кнопці logout повертає все в початковий вигляд і видаляє дані користувача
//~   З локального сховища.
//
//~   Якщо введені дані не збігаються з потрібними даними, викликати аlert і
//~   повідомляти про помилку.
//
//       <form id="login-form">
//         <input type="email" name="email" />
//         <input type="password" name="password" />
//         <button name="button" type="submit">Login</button>
//     </form>
//

const KEY_LC = 'user-data';

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const formRef = document.querySelector('#login-form');
const btnRef = document.querySelector('#login-form button');

formRef.addEventListener('submit', onSubmitHandler);

function onSubmitHandler(event) {
  event.preventDefault();

  const obj = Object.fromEntries(new FormData(event.currentTarget));

  if (btnRef.textContent === 'Logout') {
    removeLC(KEY_LC);
    btnRef.textContent = 'Login';
    event.currentTarget.reset();
    disableFormInputs(formRef, false);
  } else if (
    USER_DATA.email === obj.email &&
    USER_DATA.password === obj.password
  ) {
    setLC(obj);
    btnRef.textContent = 'Logout';
    disableFormInputs(formRef, !false);
  } else {
    alert('error! wrong password or email!');
  }
}

function setLC(data) {
  localStorage.setItem(KEY_LC, JSON.stringify(data));
}

function removeLC(key) {
  localStorage.removeItem(key);
}

function disableFormInputs(form, value) {
  [...form.elements].forEach(el => {
    if (el.tagName.toUpperCase() !== 'BUTTON') {
      el.disabled = value;
    }
  });
}
