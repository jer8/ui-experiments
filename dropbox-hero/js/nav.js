window.addEventListener('load', function() {

  var burger = document.getElementsByClassName('burger-helper')[0];
  var burgerMenu = document.getElementsByClassName('burger-menu')[0];

  function toggleClass() {

    if (burger.className.includes("burger-helper--active")) {
      burger.className = 'burger-helper';
      burgerMenu.className = 'burger-menu';
    } else {
      burger.className += " burger-helper--active";
      burgerMenu.className = 'burger-menu burger-menu--show';
    }
  }

  burger.addEventListener('click', toggleClass);

}, false);
