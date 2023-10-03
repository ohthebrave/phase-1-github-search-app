
function renderUsers(user) {
    // console.log(user)
    let userList = document.querySelector('#user-list')
    userList.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.login}" />
    <div class="link">
    <a href="${user.html_url}" target="_blank">${user.login}</a>
    </div>
    `;
    userList.addEventListener('click', () => {
        let userName = user.login
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(repo => {
                document.querySelector('#repos-list').innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                `
            })
        })

    })
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