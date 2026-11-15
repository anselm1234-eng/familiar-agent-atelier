// A hash-based router so the browser back button works on mobile
type RouteHandler = (route: string) => void;
let currentRoute = 'hearth';
let onRouteChange: RouteHandler | null = null;

export const router = {
  init(handler: RouteHandler) {
    onRouteChange = handler;
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.replace('#', '') || 'hearth';
      currentRoute = route;
      if (onRouteChange) onRouteChange(route);
    });
    
    // Initial load
    const initial = window.location.hash.replace('#', '') || 'hearth';
    currentRoute = initial;
    if (onRouteChange) onRouteChange(initial);
  },
  
  navigate(route: string) {
    if (route === currentRoute) return;
    window.location.hash = route;
  },
  
  current() {
    return currentRoute;
  }
};
