const uses = require("../data/uses-data");
const urls = require("../data/urls-data");

const list = (req, res) => {
  const urlId = Number(req.params.urlId);
  const usesList = urlId 
  ? uses.filter( use => use.urlId === urlId)
  : uses;
  console.log(usesList)
  res.json({ data: usesList });
}

const useExists = (req, res, next) => {
  const useId = Number(req.params.useId);
  const urlId = Number(req.params.urlId);
  const use = urlId 
    ? uses.find(use => use.id === useId && use.urlId === urlId)
    : uses.find(({id}) => id === useId);
  
  const message = urlId
    ? `Use id ${useId} is not associated with the url id ${urlId}`
    : `Use id not found: ${useId}`;

  res.locals.use = use;
  return use ? next()
    : next({
      status: 404,
      message,
    });
}

const read = (req, res) => {
  const { use } = res.locals;
  res.json({ data: use });
}

const destroy = (req, res) => {
  const index = uses.indexOf(use => use.id === Number(useId));
  uses.slice(index, 1);

  res.sendStatus(204);
}

module.exports = {
  list,
  read: [ useExists, read ],
  delete: [ useExists, destroy ],
}