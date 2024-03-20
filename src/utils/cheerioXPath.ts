import * as cheerio from 'cheerio';

export default ($: cheerio.CheerioAPI, el: any): string => {
  const xpaths: string[] = [];
  const parents = $(el).parents();
  parents.each(function () {
    const nodeName = $(this).prop('nodeName');
    if (!['body', 'html'].includes(nodeName.toLowerCase())) {
      xpaths.push(nodeName);
    }
  });
  xpaths.reverse();
  let cssSelector = '';
  const elId = $(el).attr('id');
  if (elId) {
    cssSelector = '#' + elId;
  } else {
    const classes = $(el).attr('class');
    if (classes) {
      cssSelector = '.' + classes.split(' ').join('.');
    }
  }
  return xpaths.join(' > ') + ' > ' + $(el).prop('nodeName') + cssSelector;
}
