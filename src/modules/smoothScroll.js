// 'use strict';

// const smoothScroll = (buttonAttribute, blockId) => {
//     // button = document.querySelector('[href = "#service-block"]');
//     // block = document.getElementById('service-block');
//     const button = document.querySelector(buttonAttribute);
//     const block = document.getElementById(blockId);

//     console.log(button);

//     // window.scroll({
//     //     left: 0,
//     //     top: block.offsetTop,
//     //     behavior: 'smooth'

//     // });

//     const scrollTo = () => {
//         console.log(block);

//         window.scroll({
//             left: 0,
//             top: block.offsetTop,
//             behavior: 'smooth'

//         });
//     };

//     button.addEventListener('click', (e) => {
//         e.preventDefault();
//         console.log(block);

//         scrollTo();
//     });
// };

// export default smoothScroll;








'use strict';

const smoothScroll = (buttonAttribute, blockId) => {
    // button = document.querySelector('[href = "#service-block"]');
    // block = document.getElementById('service-block');
    const button = document.querySelector(buttonAttribute);
    const block = document.getElementById(blockId);

    console.log(button);

    // window.scroll({
    //     left: 0,
    //     top: block.offsetTop,
    //     behavior: 'smooth'

    // });

    const scrollTo = () => {
        console.log(block);

        block.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    };

    button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(block);

        scrollTo();
    });
};

export default smoothScroll;