(function () {
  'use strict'

  const section = document.querySelectorAll('.section')
  const sections = {}
  let i = 0

  Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop
  })

  window.onscroll = function () {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelector('.active').setAttribute('class', ' ')
        document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active')
      }
    }
  }
})()
