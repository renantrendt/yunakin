// analytics.js
import ReactGA from 'react-ga'

const GA_ENABLED = () => {
  return process.env.GOOGLE_ANALYTICS_ID && process.env.GOOGLE_ANALYTICS_ENABLED
}
export const initGA = (): void => {
  if (!GA_ENABLED()) {
    return
  }
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID!) // Replace with your tracking ID
}

export const logPageView = (): void => {
  if (!GA_ENABLED()) {
    return
  }
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
