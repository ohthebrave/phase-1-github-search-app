
function renderUsers(user) {
    document.querySelector('#user-list').innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}" />
              <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
}
let formInput = document.querySelector('#github-form');
formInput.addEventListener('submit', getUsers)



// use Fetch() to get data from the server api
function getUsers(e) {
    let searchName = document.querySelector('#search').value;
    // console.log(searchName)
   fetch(`https://api.github.com/search/users?q=${searchName}`)
   .then(res => res.json())
   .then(data => {
       const users = data.items;
       users.forEach((user) => renderUsers(user))
   })
   .catch(error => console.log(error))
   e.preventDefault()
   formInput.reset()
}