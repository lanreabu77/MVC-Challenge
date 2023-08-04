// navbar 
window.onscroll = () => {
    const nav = document.querySelector('.navbar');
    if(this.scrollY <= 10) nav.className = 'navbar'; else nav.className = 'navbar scrolled';
  };
  