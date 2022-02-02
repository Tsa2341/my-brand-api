

export function createArticleError(error) {

  console.log("error = ",error)
  
  let newError = error.message.replaceAll("Path", "").replaceAll("`","").replaceAll(".","").split(":").splice(2,).map((error) => {
    return error.split(",")[0].trim();
  });

  console.log("newError = ", newError)

  return new Error(newError.join(", "));

}
