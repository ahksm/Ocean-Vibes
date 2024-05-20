// VIDEO PAUSE

const btn = document.querySelector('#btn');
const video = document.querySelector('#video');

btn.addEventListener('click', function () {
    if (!btn.classList.contains('fa-play')) {
        btn.classList.add('fa-play')
        video.pause();
    } else if (btn.classList.contains('fa-play')) {
        btn.classList.remove('fa-play')
        video.play();
    }
});

// VIDEO RESIZE

function setVideoSize() {
    const vidWidth = 1280;
    const vidHeight = 720;
    const maxVidHeight = 400;
    const videoContainer = document.querySelector('.video-container');
    let windowWidth = window.innerWidth;
    let newVidWidth = windowWidth;
    let newVidHeight = windowWidth * vidHeight / vidWidth;
    let marginLeft = 0;
    let marginTop = 0;

    if (newVidHeight < maxVidHeight) {
        newVidHeight = maxVidHeight;
        newVidWidth = newVidHeight * vidWidth / vidHeight;
    }

    if (newVidWidth > windowWidth) {
        marginLeft = -((newVidWidth - windowWidth) / 2);
    }

    if (newVidHeight > maxVidHeight) {
        marginTop = -((newVidHeight - videoContainer.getBoundingClientRect().height) / 2);
    }

    const video = document.getElementById('video');

    video.style.width = `${newVidWidth}px`;
    video.style.height = `${newVidHeight}px`;
    video.style.marginLeft = `${marginLeft}px`;
    video.style.marginTop = `${marginTop}px`;
}

setVideoSize();

let timeout;
window.onresize = function () {
    clearTimeout(timeout);
    timeout = setTimeout(setVideoSize, 100);

    adjustIntroImg();
};

const introImg = document.querySelector('.lightbox-content__img');

function adjustIntroImg() {
    var img = 'img/';

    if(window.innerWidth > 650) {
        img += 'intro.jpg';
    } else {
        img += 'intro-big.jpg';
    }
    
    introImg.setAttribute('src', img)
}

// OPEN/CLOSE MODAL

// const btns = document.querySelectorAll('.item');

// btns.forEach(function (btn) {
//     btn.addEventListener('click', function (e) {
//         const closeBtn = e.currentTarget.nextElementSibling.children[0];
//         const lightbox = e.currentTarget.nextElementSibling;
//         const bg = e.currentTarget.previousElementSibling;

//         function closeEverything(lightbox, closeBtn) {
//             if (lightbox.classList.contains('hidden')) {
//                 lightbox.classList.remove('hidden')
//                 bg.classList.remove('hidden')
//             }

//             closeBtn.addEventListener('click', function () {
//                 close(lightbox);
//             });

//             bg.addEventListener('click', function () {
//                 close(lightbox);
//             });

//             addEventListener('keyup', function keyPress(e) {
//                 if (e.key === 'Escape') {
//                     close(lightbox)
//                 }
//             })
//         }

//         closeEverything(lightbox, closeBtn)

//         // SWITCHING MODALS

//         const nextBtn = document.querySelector('.next-btn');
//         const contactUs = document.querySelector('.contact_us');
//         const contactUsAbout = document.querySelector('.contact_us-about');
//         const intro = document.getElementById('introduction');
//         const gallery = document.getElementById('gallery');
//         const galleryBtn = document.querySelector('.gallery-btn');
//         const contactBtn = document.querySelector('.contact-btn');
//         const testimonials = document.getElementById('testimonials');
//         const about = document.getElementById('about');
//         const contact = document.getElementById('contact');

//         function switchModal(madalFrom, modalTo, btn) {
//             modalTo.classList.remove('hidden')
//             bg.classList.remove('hidden')

//             closeEverything(madalFrom, btn)
//             closeEverything(modalTo, btn)
//         }

//         nextBtn.addEventListener('click', function () {
//             switchModal(intro, gallery, galleryBtn)
//         });

//         contactUs.addEventListener('click', function () {
//             switchModal(testimonials, contact, contactBtn)
//         });

//         contactUsAbout.addEventListener('click', function () {
//             switchModal(about, contact, contactBtn)
//         });

//         function close(lightbox) {
//             lightbox.classList.add('hidden')
//             bg.classList.add('hidden')
//         }
//     });
// });

const intro = document.getElementById('introduction');
const gallery = document.getElementById('gallery');
const testimonials = document.getElementById('testimonials');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const modals = document.querySelectorAll('.lightbox');
const closeBtns = document.querySelectorAll('.close-btn');
const bgs = document.querySelectorAll('.bg');
const showModals = document.querySelectorAll('.item');
const nextBtnIntro = document.querySelector('.next-btn.intro');
const nextBtnTestim = document.querySelector('.next-btn.testim');
const nextBtnAbout = document.querySelector('.next-btn.about');

showModals.forEach(function (showModal) {
    function activateModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function disactivateModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showModal.addEventListener('click', function (e) {
        const currentModalID = e.currentTarget.dataset.id
        if (currentModalID == 'introduction') {
            activateModal(intro)
        } else if (currentModalID == 'gallery') {
            activateModal(gallery)
        } else if (currentModalID == 'testimonials') {
            activateModal(testimonials)
        } else if (currentModalID == 'about') {
            activateModal(about)
        } else if (currentModalID == 'contact') {
            activateModal(contact)
        }

        nextBtnIntro.addEventListener('click', function () {
            disactivateModal(intro)
            activateModal(gallery)
        });

        nextBtnTestim.addEventListener('click', function () {
            disactivateModal(testimonials)
            activateModal(contact)
        });

        nextBtnAbout.addEventListener('click', function () {
            disactivateModal(about)
            activateModal(contact)
        });
    });

    closeBtns.forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            const closingModal = e.currentTarget.parentElement.parentElement.parentElement;
            closingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function (e) {
            const closingModalBg = e.target.parentElement
            if (e.target.classList == 'bg') {
                closingModalBg.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        addEventListener('keyup', function (e) {
            if (e.key == 'Escape') {
                modals.forEach(function (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        });
    });
});

// FILTER

const cards = [{
        id: 1,
        category: "portrait",
        img: "img/gallery/portrait-01.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 2,
        category: "nature",
        img: "img/gallery/nature-01.jpg",
        desc: "templatemo is the best website for free css templates."
    },
    {
        id: 3,
        category: "animal",
        img: "img/gallery/animal-01.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 4,
        category: "building",
        img: "img/gallery/building-01.jpg",
        desc: "templatemo is the best website for free css templates."
    },
    {
        id: 5,
        category: "portrait",
        img: "img/gallery/portrait-02.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 6,
        category: "nature",
        img: "img/gallery/nature-02.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 7,
        category: "animal",
        img: "img/gallery/animal-02.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 8,
        category: "building",
        img: "img/gallery/building-02.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 9,
        category: "portrait",
        img: "img/gallery/portrait-03.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 10,
        category: "animal",
        img: "img/gallery/animal-03.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 11,
        category: "building",
        img: "img/gallery/building-03.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 12,
        category: "portrait",
        img: "img/gallery/portrait-04.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 13,
        category: "animal",
        img: "img/gallery/animal-04.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 14,
        category: "building",
        img: "img/gallery/building-04.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 15,
        category: "portrait",
        img: "img/gallery/portrait-05.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 16,
        category: "animal",
        img: "img/gallery/animal-05.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 17,
        category: "building",
        img: "img/gallery/building-05.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 18,
        category: "portrait",
        img: "img/gallery/portrait-06.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 19,
        category: "animal",
        img: "img/gallery/animal-06.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 20,
        category: "building",
        img: "img/gallery/building-06.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 21,
        category: "portrait",
        img: "img/gallery/portrait-07.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 22,
        category: "animal",
        img: "img/gallery/animal-07.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 23,
        category: "building",
        img: "img/gallery/building-07.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 24,
        category: "portrait",
        img: "img/gallery/portrait-08.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 25,
        category: "nature",
        img: "img/gallery/nature-03.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 26,
        category: "nature",
        img: "img/gallery/nature-04.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 27,
        category: "nature",
        img: "img/gallery/nature-05.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 28,
        category: "nature",
        img: "img/gallery/nature-06.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 29,
        category: "nature",
        img: "img/gallery/nature-07.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 30,
        category: "nature",
        img: "img/gallery/nature-08.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 31,
        category: "animal",
        img: "img/gallery/animal-08.jpg",
        desc: "chico's main fear was missing the morning bus."
    },
    {
        id: 32,
        category: "building",
        img: "img/gallery/building-08.jpg",
        desc: "templatemo is the best website for free css templates."
    },
];

const gelleryContainer = document.querySelector('.gallery-container');
const container = document.querySelector('.btn-container');

window.addEventListener('DOMContentLoaded', function () {
    displayCardItems(cards);
    displayCardButtons();
});

// 8 ITEM GROUPS

function displayCardItems(cards) {
    let displayCards = cards.map(function (item) {
        return `<img src="${item.img}" alt="Image"><span><p>${item.desc}</p></span>`
    });

    const list_element = document.getElementById('list');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 8;

    function DisplayList(items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);
        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];

            let item_element = document.createElement('div');
            item_element.className = 'gallery-container__item'
            item_element.innerHTML = item;


            wrapper.appendChild(item_element);
        }
    }

    // TAB

    function SetupPagination(items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";

        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(i, items);
            wrapper.appendChild(btn)
        }
    }

    // PAGINATION BUTTON

    function PaginationButton(page, items) {
        let button = document.createElement('button');
        button.innerText = page;

        if (current_page == page) button.classList.add('active');

        button.addEventListener('click', function () {
            current_page = page;
            DisplayList(items, list_element, rows, current_page);

            let current_btn = document.querySelector('.gallery-pagination button.active');
            current_btn.classList.remove('active');

            button.classList.add('active');
        })

        return button;
    }

    DisplayList(displayCards, list_element, rows, current_page);
    SetupPagination(displayCards, pagination_element, rows)
}

function displayCardButtons() {

    // CATEGORY BUTTON

    const categories = cards.reduce(function (values, item) {
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values
    }, ["all"]);
    const categoryBtns = categories.map(function (category) {
        return `<a href="#" class="btn-link" data-id="${category}">${category}</a>`;
    }).join("");
    container.innerHTML = categoryBtns;

    const filterBtns = container.querySelectorAll('.btn-link');
    filterBtns.forEach(function (btn) {

        // CATEGORY BUTTON ICON

        if (btn.innerHTML == 'all') {
            btn.classList.add('active')
            btn.innerHTML = '<i class="fas fa-layer-group"></i> All'
        } else if (btn.dataset.id == 'portrait') {
            btn.innerHTML = '<i class="fas fa-portrait"></i> Portraits'
        } else if (btn.dataset.id == 'nature') {
            btn.innerHTML = '<i class="fas fa-leaf"></i> Nature'
        } else if (btn.dataset.id == 'animal') {
            btn.innerHTML = '<i class="fas fa-paw"></i> Animals'
        } else if (btn.dataset.id == 'building') {
            btn.innerHTML = '<i class="far fa-building"></i> Buildings'
        }
        btn.addEventListener('click', function (e) {
            const category = e.currentTarget.dataset.id;

            // ACTIVE BUTTON

            container.addEventListener('click', function (e) {
                const id = e.target.dataset.id;
                if (id) {
                    filterBtns.forEach(function (btn) {
                        btn.classList.remove('active');
                        e.target.classList.add('active');
                    });
                }
            });

            // SORTING BY CATEGORIES, PAGINATION VISIBILITY

            const cardsCategory = cards.filter(function (cardsItem) {
                if (cardsItem.category === category) {
                    return cardsItem;
                }
            });
            const pagination = document.querySelector('.gallery-pagination');
            if (category === 'all') {
                displayCardItems(cards)
                pagination.style.display = 'block'
            } else {
                if (cardsCategory.length <= 8) {
                    pagination.style.display = 'none'
                } else {
                    pagination.style.display = 'block'
                }
                displayCardItems(cardsCategory)
            }
        });
    });
}
