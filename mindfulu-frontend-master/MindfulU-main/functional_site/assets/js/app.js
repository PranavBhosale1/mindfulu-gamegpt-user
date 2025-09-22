// Simple client-side router and shared behaviors
(function() {
  const routes = {
    landing: 'pages/wonderkids.html',
    dashboard: 'pages/student_dashboard.html',
    assessment: 'pages/assessment_flow.html',
    results: 'pages/assessment_results.html',
    admin: 'pages/admin_dashboard.html',
  };

  function navigate(to) {
    const target = routes[to] || routes.landing;
    window.location.href = `/${window.location.pathname.split('/').slice(1,-1).join('/')}/` + target;
  }

  window.MindfulU = { navigate };
})();

