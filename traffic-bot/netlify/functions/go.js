const ROUTES = {
  accueil: "https://cedric-rancier.fr/",
  marko: "https://cedric-rancier.fr/marko-drazic/",
  tabou: "https://cedric-rancier.fr/marko-drazic/tabou-a-baltimore/",
  injustice: "https://cedric-rancier.fr/marko-drazic/in-justice-a-baltimore/"
};

function appendParams(url, params) {
  const destination = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    if (value) destination.searchParams.set(key, value);
  }
  return destination.toString();
}

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  const slug = (q.slug || "accueil").toLowerCase().trim();
  const destination = ROUTES[slug];

  if (!destination) {
    return {
      statusCode: 302,
      headers: {
        Location: appendParams(ROUTES.accueil, {
          utm_source: q.source || "redirect-bot",
          utm_medium: q.medium || "social",
          utm_campaign: q.campaign || "unknown-route"
        }),
        "Cache-Control": "no-store"
      },
      body: ""
    };
  }

  const finalUrl = appendParams(destination, {
    utm_source: q.source || "redirect-bot",
    utm_medium: q.medium || "social",
    utm_campaign: q.campaign || slug,
    utm_content: q.content || undefined
  });

  console.log(JSON.stringify({
    type: "traffic_redirect",
    route: slug,
    source: q.source || "redirect-bot",
    medium: q.medium || "social",
    campaign: q.campaign || slug,
    content: q.content || null,
    userAgent: event.headers?.["user-agent"] || null,
    timestamp: new Date().toISOString()
  }));

  return {
    statusCode: 302,
    headers: {
      Location: finalUrl,
      "Cache-Control": "no-store",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body: ""
  };
};
