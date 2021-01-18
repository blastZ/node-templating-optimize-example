import nico from '@blastz/nico';
import render from 'koa-ejs';
import path from 'path';
import CleanCSS from 'clean-css';
import fs from 'fs';
import PurgeCSS from 'purgecss';

(async () => {
  render(nico, {
    root: path.resolve(process.cwd(), './src/view'),
    layout: false,
    viewExt: 'ejs',
  });

  nico.init({
    routes: {
      'GET /': {
        controller: async (ctx) => {
          return ctx.render('index', {
            content: 'Templating',
          });
        },
      },
    },
    serve: {
      root: path.resolve(process.cwd(), './dist/assets'),
    },
  });

  const purgeCSSResults = await new PurgeCSS().purge({
    content: ['src/view/index.ejs'],
    css: ['src/assets/view/css/*.css'],
  });

  purgeCSSResults.map((o) => {
    o.file && fs.writeFileSync(o.file, o.css);
  });

  const output = new CleanCSS({ level: 2 }).minify([
    path.resolve(process.cwd(), './src/assets/view/css/main.css'),
    path.resolve(process.cwd(), './src/assets/view/css/sub.css'),
  ]);

  fs.writeFileSync(path.resolve(process.cwd(), './dist/assets/view/css/main.css'), output.styles);

  nico.start(1415);
})();
