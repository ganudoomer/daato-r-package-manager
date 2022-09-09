function validator(object) {
  if (object.Description instanceof Array) {
    object.Description = object.Description.join(" ");
  }

  if (typeof object.Author === "string") {
    object.Author = [object.Author];
  }

  return {
    name: object.Package,
    version: object.Version,
    r_version_needed: object.Depends,
    dependencies: object.Imports,
    suggests: object.Suggests,
    date: object["Date/Publication"],
    title: object.title,
    description: object.Description,
    authors: object.Author,
    maintainer: object.Maintainer,
    license: object.License,
  };
}

module.exports = {
  validator,
};
