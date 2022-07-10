export function getAllThisUsersPlans(userToken){
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Basic ' + userToken, 'Content-Type': 'application/json' }
  };
  return fetch("https://trep-backend-mf5ry.ondigitalocean.app/api/show-all-plans", requestOptions)
    .then(response => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}
