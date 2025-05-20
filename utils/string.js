//mise au format standard pour la recherche de trips
const firstLetterCapital = (string) =>
  string.slice(0, 1).toUpperCase() + string.slice(1);

//vérification que les points d'entrée du user ne sont pas nulles ou inutilisables avant de rechercher dans la db
const checkBody = (obj, keys) => {
  return keys.every((key) => !!obj[key]);
};

//vérification que l'email est au format correct avant toute recherche dans la db
const checkEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = { firstLetterCapital, checkBody, checkEmail };
