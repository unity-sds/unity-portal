export const formatRoute = (str:string) => {

  let cleanedStr = str.toLowerCase();
  const charReplacements = {
    " ": "-",
    "_": "-"
  };

  for( const [key, value] of Object.entries(charReplacements) ) {
    cleanedStr = cleanedStr.replace(key,value);
  }

  return cleanedStr;

}