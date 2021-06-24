const APIURL = "http://api.github.com/users/";

const main = document.getElementById('main');

const form = document.querySelector('#form');
const search = document.querySelector('#search')


async function  getUser(username){
    try{
        const { data } = await axios(APIURL + username)
       
    
        createUserCard(data)
        getRepos(username)
    }catch(err){
        if(err.response.status == 404){
            createErrorCard('No Profile With This Username')
        }          
    }
}

async function getRepos(username){
    try{
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)
    } catch(err){
        createErrorCard('Problem fetching in Repos')
    }
}


//creating user card when founded

function createUserCard(user){
    const cardHTML = ` 
    <div class="card">
    <div>
        <img src=${user.avatar_url} alt="${user.avatar}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
    
        <div id="repos"> </div>
    </div>
    
</div>
`
main.innerHTML = cardHTML

}

//Giving the error , when no github user name is found

function createErrorCard(msg){
    const cardHTML = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = cardHTML
}


//Adding repos card

function addReposToCard(repos){
    const reposEL = document.getElementById('repos')

    repos
          .slice(0,10)
          .forEach(repo => {
              const repoEL = document.createElement('a')
              repoEL.classList.add('repo')
              repoEL.href = repo.html_url
              repoEL.target = '_blank'
              repoEL.innerText = repo.name

              reposEL.appendChild(repoEL)
          })
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

   const user = search.value
   
   if(user){
       getUser(user)

       search.value = '';
   }
})