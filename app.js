const Prismic = require('prismic-javascript');
const { RichText, Link } = require('prismic-dom');
const app = require('./config');
const config = require('./prismic-configuration');
const PORT = app.get('port');
const Cookies = require('cookies');

app.listen(PORT, () => {
  console.log(`Go to browser: http://localhost:${PORT}`);
});

//Middleware catch all request, query Prismic API and configure everything for it
app.use((req, res, next) => {
  //init prismic context
  res.locals.ctx = {
    endpoint: config.apiEndpoint,
    linkResolver: config.linkResolver
  };
  //put RichText Helper from Prismic DOM to simplify convert RichText from json to html
  res.locals.RichText = RichText;
  //put Link helper from Prismic DOM to simplify getting url from link
  res.locals.Link = Link;

  Prismic.api(config.apiEndpoint, {
    accessToken: config.accessToken,
    req
  })
  .then((api) => {
    req.prismic = { api };
    //continue spreading request
    next();
  })
  .catch((error) => {
    //next with params handle error natively in express
    next(error.message);
  });
});


//preview
app.get('/preview', (req, res) => {
  const token = req.query.token;
  if (token) {
    req.prismic.api.previewSession(token, config.linkResolver, '/')
    .then((url) => {
      const cookies = new Cookies(req, res);
      cookies.set(Prismic.previewCookie, token, { maxAge: 30 * 60 * 1000, path: '/', httpOnly: false });
      res.redirect(302, url);
    }).catch((err) => {
      res.status(500).send(`Error 500 in preview: ${err.message}`);
    });
  } else {
    res.send(400, 'Missing token from querystring');
  }
});

//redirect / to default language from i18n.json
app.get('/', (req, res, next) => {
  
  req.prismic.api.getSingle("homepage",
    { 'fetchLinks' : ['article.image', 'article.titre_home', 'article.chapo_home'] }
  )
  .then((document) => {
    //console.log(JSON.stringify(document, null, 4));
    if(!document) res.status(404).send('page not found');
    else res.render('homepage', { document });
  })
  .catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
  
  //res.redirect('/news/depuis-2009-le-centre-national-de-laudiovisuel-cna');
});

// Route for pages
app.get('/news/:uid', (req, res, next) => {
  const uid = req.params.uid;
  
  req.prismic.api.getByUID("article", uid,
//    { 'fetchLinks' : ['game.name', 'game.image'] }
  )
  .then((document) => {
    //console.log(JSON.stringify(document, null, 4));
    if(!document) res.status(404).send('page not found');
    else res.render('article', { document });
  })
  .catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
});