const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");

const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();

  // console.log(data);
  const card = `
  <div class="card">
  <div>
          <img
            src="${data.avatar_url}"
            alt="Florin Pop"
            class="avatar" 
          />
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>${data.bio}</p>

          <ul class="info">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
          </ul>

          <div id="repos">
            
          </div>
        </div>
  </div>
  `;
  main.innerHTML = card;

  getRepos(username);
};

// initial call
getUser("deepak98100");

const getRepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(APIURL + username + "/repos");
  const data = await response.json();
  data.forEach((item) => {
    const elm = document.createElement("a");
    elm.classList.add("repo");
    elm.href = item.html_url;
    elm.innerText = item.name;
    elm.target = "_blank";
    repos.appendChild(elm);
  });
};

const formSubmit = () => {
  if (searchBox.value != "") {
    getUser(searchBox.value);
    searchBox.value = "";
  }
  return false;
};

searchBox.addEventListener("focusout", function () {
  formSubmit();
});

searchBox.addEventListener("keydown", function (event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.keyCode === 13) {
    event.preventDefault();
    // Call your function here
    formSubmit();
  }
});
