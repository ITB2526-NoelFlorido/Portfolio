document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.has-children');

    menuItems.forEach(item => {
        const title = item.querySelector('.menu-title');

        title.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('open');
        });
    });
});