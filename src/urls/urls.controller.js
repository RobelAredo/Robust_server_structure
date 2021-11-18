const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

const list = (req, res) => {
  res.json({ data: urls });
}

const urlExists = (req, res, next) => {
  const { urlId } = req.params;
  const url = urls.find(({id}) => id === Number(urlId));
  res.locals.url = url;

  return url ? next()
    : next({ 
      status: 404,
      message: `User id not found: ${urlId}`
    });
}

const read = (req, res) => {
  const urlId = Number(req.params.urlId);
  const  id  = uses.length + 1;
  uses.push({ id, urlId, time: Date.now() });

  const { url } = res.locals;
  res.json({ data: url })
}

const hasHrefProperty = (req, res, next) => {
  const { href } = req.body.data;
  return href 
    ? next()
    : next({
      status: 400,
      message: "href property is missing"
    })
}

const create = (req, res) => {
  const { href } = req.body.data;
  const id = urls.length + 1
  const newUrl = { id, href }
  urls.push(newUrl);

  res.status(201).json({ data: newUrl })
}

const update = (req, res) => {
  const { href } = req.body.data;
  const { url } = res.locals;
  console.log(url)
  url.href = href;
  console.log(url)

  res.json({ data: url })
}

module.exports = {
  list,
  read : [ urlExists, read ],
  create: [ hasHrefProperty, create ],
  update : [ urlExists,  hasHrefProperty, update ],
  urlExists,
}