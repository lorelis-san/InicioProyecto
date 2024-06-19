async function fetchDogImages() {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random/30`);
      if (!response.ok) {
        throw new Error('Failed to fetch dog images');
      }
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching dog images:', error.message);
      return []; // Manejar el error devolviendo un arreglo vacío
    }
  }
  
  async function createGrid(container, gridsCount, columnsCount, itemsCount) {
    const dogImages = await fetchDogImages(); // Obtener las imágenes de perros de la API
    let imageIndex = 0;
  
    for (let g = 0; g < gridsCount; g++) {
      const grid = document.createElement('div');
      grid.className = 'grid';
  
      for (let c = 0; c < columnsCount; c++) {
        const column = document.createElement('div');
        column.className = 'column animate-before';
  
        for (let i = 0; i < itemsCount; i++) {
          const item = document.createElement('div');
          item.className = 'item';
  
          if (imageIndex >= dogImages.length) {
            imageIndex = 0; // Reiniciar al inicio de las imágenes cuando se llegue al final
          }
  
          const img = document.createElement('img');
          img.src = dogImages[imageIndex];
          img.alt = 'Random Dog Image';
          img.style.width = '100%'; // Ajustar tamaño según necesidad
          img.style.height = '100%'; // Ajustar tamaño según necesidad
          img.style.objectFit = 'cover'; // Asegurar que la imagen se ajuste dentro del cuadro
  
          img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            item.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          };
  
          item.appendChild(img);
          column.appendChild(item);
  
          imageIndex++;
        }
  
        grid.appendChild(column);
      }
  
      container.appendChild(grid);
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('grid-container');
    await createGrid(container, 4, 7, 5);
  
    const grids = document.querySelectorAll('.grid');
    const headings = document.querySelectorAll('.heading .wrapper .text');
  
    function enterScreen(index) {
      const grid = grids[index];
      const heading = headings[index];
      const gridColumns = grid.querySelectorAll('.column');
  
      grid.classList.add('active');
  
      gridColumns.forEach(element => {
        element.classList.remove('animate-before', 'animate-after');
      });
  
      heading.classList.remove('animate-before', 'animate-after');
    }
  
    function exitScreen(index, exitDelay) {
      const grid = grids[index];
      const heading = headings[index];
      const gridColumns = grid.querySelectorAll('.column');
  
      gridColumns.forEach(element => {
        element.classList.add('animate-after');
      });
  
      heading.classList.add('animate-after');
  
      setTimeout(() => {
        grid.classList.remove('active');
      }, exitDelay);
    }
  
    function setupAnimationCycle({ timePerScreen, exitDelay }) {
      const cycleTime = timePerScreen + exitDelay;
      let nextIndex = 0;
  
      function nextCycle() {
        const currentIndex = nextIndex;
  
        enterScreen(currentIndex);
  
        setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen);
  
        nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
      }
  
      nextCycle();
  
      setInterval(nextCycle, cycleTime);
    }
  
    setupAnimationCycle({
      timePerScreen: 2000, // ms
      exitDelay: 200 * 7 // ms
    });
  });
  
  //Login
  const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});