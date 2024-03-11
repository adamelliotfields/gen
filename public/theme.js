;((window, document) => {
  const THEMES = ['dark', 'light', 'system']
  const DARK = THEMES[0]
  const LIGHT = THEMES[1]
  const SYSTEM = THEMES[2]

  const el = document.documentElement
  const storage = window.localStorage
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // 1. if dark is strictly "true" in local storage, use "dark"
  // 2. if dark is strictly "false", use "light"
  // 3. otherwise, use "system"
  const updateTheme = (...args) => {
    const dark = JSON.parse(storage.getItem(DARK))
    const theme = args[0] ?? (dark ? DARK : dark === false ? LIGHT : SYSTEM)
    const transition = args[1] ?? true
    const classes = [DARK, '[&_*]:!transition-none']

    if (theme === DARK || (theme === SYSTEM && mediaQuery.matches)) {
      el.classList.add(classes[0])
    } else {
      el.classList.remove(classes[0])
    }

    // disable transitions for 1 tick
    if (!transition) {
      el.classList.add(classes[1])
      setTimeout(() => el.classList.remove(classes[1]), 0)
    }

    return theme
  }

  const initializeTheme = () => {
    // call without args to get the current theme
    const theme = updateTheme()
    el.setAttribute('data-theme', theme)

    // observe changes to the `data-theme` attribute
    const observer = new MutationObserver((mutations) => {
      const { target, oldValue } = mutations[0]
      const newValue = target.getAttribute('data-theme')

      if (newValue !== oldValue) {
        if (!THEMES.includes(newValue)) return target.setAttribute('data-theme', SYSTEM)

        if (newValue === SYSTEM) {
          storage.removeItem(DARK)
        } else {
          storage.setItem(DARK, newValue === DARK)
        }

        // pass `false` to prevent transitions
        updateTheme(newValue, false)
      }
    })
    observer.observe(el, {
      attributeFilter: ['data-theme'],
      attributeOldValue: true
    })

    // listen for changes to the `prefers-color-scheme` media query
    mediaQuery.addEventListener('change', () => updateTheme(undefined, false))
  }

  initializeTheme()
})(window, document)
