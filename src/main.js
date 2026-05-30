import './style.css'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

Swiper.use([Autoplay])

document.addEventListener('DOMContentLoaded', () => {
  // swiper projects
  const projectsSwiper = new Swiper('.mySwiper', {
    modules: [Autoplay],
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    speed: 400,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  })

  const projectsSwiperEl = document.querySelector('.mySwiper')

  if (projectsSwiperEl) {
    projectsSwiperEl.addEventListener('mouseenter', () => {
      projectsSwiper.autoplay.stop()
    })

    projectsSwiperEl.addEventListener('mouseleave', () => {
      projectsSwiper.autoplay.start()
    })
  }

  // swiper caseStudies
  const caseStudiesSwiper = new Swiper('.case-studies-swiper', {
    modules: [Autoplay],
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    speed: 400,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
    },
  })

  const caseStudiesSwiperEl = document.querySelector('.case-studies-swiper')

  if (caseStudiesSwiperEl) {
    caseStudiesSwiperEl.addEventListener('mouseenter', () => {
      caseStudiesSwiper.autoplay.stop()
    })

    caseStudiesSwiperEl.addEventListener('mouseleave', () => {
      caseStudiesSwiper.autoplay.start()
    })
  }

  // scroll
  let scrollTimeout

  window.addEventListener('scroll', () => {
    if (projectsSwiper.autoplay.running) {
      projectsSwiper.autoplay.stop()
    }

    if (caseStudiesSwiper.autoplay.running) {
      caseStudiesSwiper.autoplay.stop()
    }

    clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
      if (projectsSwiperEl && !projectsSwiperEl.matches(':hover')) {
        projectsSwiper.autoplay.start()
      }

      if (caseStudiesSwiperEl && !caseStudiesSwiperEl.matches(':hover')) {
        caseStudiesSwiper.autoplay.start()
      }
    }, 500)
  })

  // navbar
  const initNavbar = () => {
    const headerBackground = document.getElementById('headerBackground')
    const mainHeader = document.getElementById('mainHeader')
    const hamburgerButton = document.getElementById('hamburgerBtn')
    const menu = document.getElementById('navbar-default')
    const links = document.querySelectorAll('.link-scroll-color')

    if (!headerBackground || !mainHeader || !hamburgerButton || !menu) return

    let isOpen = false

    const updateNavbar = () => {
      const hasScrolled = window.scrollY > 100

      if (isOpen || hasScrolled) {
        headerBackground.classList.add('bg-black/20', 'backdrop-blur-sm')
        headerBackground.classList.remove('bg-transparent')
        headerBackground.classList.add('rounded-full', 'mt-4')

        mainHeader.classList.add('fixed', 'top-0', 'left-0')
        mainHeader.classList.remove('absolute')
      } else {
        headerBackground.classList.remove('bg-black/20', 'backdrop-blur-sm')
        headerBackground.classList.add('bg-transparent')
        headerBackground.classList.remove('rounded-full', 'mt-4')

        mainHeader.classList.remove('fixed', 'top-0', 'left-0')
        mainHeader.classList.add('absolute')
      }
    }

    hamburgerButton.addEventListener('click', () => {
      isOpen = !isOpen
      menu.classList.toggle('hidden')
      hamburgerButton.setAttribute('aria-expanded', isOpen)
      updateNavbar()
    })

    links.forEach((link) => {
      link.addEventListener('click', () => {
        if (isOpen) {
          isOpen = false
          menu.classList.add('hidden')
          hamburgerButton.setAttribute('aria-expanded', false)
          updateNavbar()
        }
      })
    })

    window.addEventListener('scroll', updateNavbar)
    updateNavbar()
  }

  initNavbar()
})