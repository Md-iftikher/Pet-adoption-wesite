console.log("connected");
// general function
//function to active btn
function removeClass() {
  const button = document.getElementsByClassName("catagory-btn");
  for (let btn of button) {
    btn.classList.remove("activebtn");
  }
}

//liked pets
const likedpets = (petname) => {
  const likedpetcontainer = document.getElementById("liked-pets-contianer");
  const liked = document.getElementById("liked");

  const likepetimg = document.getElementById(`likedPet-${petname}`);
  const likedpet = document.createElement("div");
  likedpet.className = "rounded-lg w-[130px] h-[100px]";
  const img = document.createElement("img");
  img.src = likepetimg.src;
  img.className = "w-full h-full object-cover rounded-[5px]";
  likedpet.appendChild(img);
  likedpetcontainer.appendChild(likedpet);
};

// Function to load pets of a specific category by ID
const loadDetailsOfPet = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayPetDetails(data.petData);
    })
    .catch((error) => console.log("Error:", error));
};

//diplay pet with modal

const displayPetDetails = (pet) => {
  const DetailsContainer = document.getElementById("modal-content");
  console.log(pet);

  DetailsContainer.innerHTML = `
        <img src="${pet.image}" alt=" " />
        <h2 class="font-bold text-2xl mt-6">${pet.pet_name || "Unkown Pet"}</h2>

            <div class="card-actions flex flex-col gap-1 mt-2">
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                        class="w-5 object-cover" src="./images/breed.png" alt="">Breed: ${
                          pet.breed || "Not specified"
                        }
                 </div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                                    class="w-5 object-cover" src="./images/birth.png" alt="">Birth: ${
                                      pet.date_of_birth || "Not specified"
                                    }</div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                                    class="w-5 object-cover" src="./images/gender.png" alt="">Gender: ${
                                      pet.gender || "Not specified"
                                    }</div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                                    class="w-5 object-cover" src="./images/gender.png" alt="">Vaccinated Status: ${
                                      pet.vaccinated_status || "Not specified"
                                    }</div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                class="w-5 object-cover" src="./images/doller.png" alt="">Price : ${
                  pet.price || "Not Given"
                } $</div>

            </div>
            <div class="divider"></div>
            <h2 class="text-xl font-bold">Details Information</h2>
            <p class=" mt-2"> 
            ${pet.pet_details}
            </p>
            

    `;

  const showModal = document.getElementById("showModalData");
  if (showModal) showModal.click();
};

// diplay adopt modal
const showAdoptModal = (petId) => {
  const adoptmodal = document.getElementById("adopt-modal-content");
  const adoptBtn = document.getElementById(`adopt-${petId}`);
  console.log(petId);

  adoptmodal.innerHTML = `
        <img class="w-20 h-20" src="./images/handshake.png" alt=" " />
        <h2 class="text-3xl font-bold">Congrats</h2>
        <p class="font-bold">Adoptation Process Start For Your Pet</p>
        <div class="text-6xl my-4 font-extrabold"><span id="countdown">3</span></div>
    `;
  adoptBtn.innerText = "Adopted";
  adoptBtn.className = "bg-slate-200 btn btn-sm px-5 ";
  adoptBtn.disabled = true;
  const showModal = document.getElementById("showadopt");
  if (showModal) showModal.click();

  let countdown = 3;
  const countdownElement = document.getElementById("countdown");

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      document.getElementById("my_modal").close();
    }
  }, 1000);
};

// Function to load all pet categories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      displayPetCatagories(data.categories);
    })
    .catch((error) => console.log(error));
};

// Function to load pets by category name
const loadPetbyCatagoryname = (name) => {
  const spinnerContainer = document.getElementById("spinner-container");
  const cardcontainer = document.getElementById("all-pets-container");
  const likespetcontainer = document.getElementById("liked");

  spinnerContainer.classList.remove("hidden");
  cardcontainer.classList.add("hidden");
  likespetcontainer.classList.add("hidden");

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        spinnerContainer.classList.add("hidden");
        cardcontainer.classList.remove("hidden");
        likespetcontainer.classList.remove("hidden");

        allPetsDataarr = data.data;
        displayAllPets(allPetsDataarr);

        console.log(data);
      }, 2000);
    })
    .catch((error) => {
      spinnerContainer.classList.add("hidden");
      console.log("Error:", error);
    });
};
// Function to display all pet categories
const displayPetCatagories = (catagories) => {
  const PetcatagoryContainer = document.getElementById(
    "pet-catagory-container"
  );

  catagories.forEach((item) => {
    // creating btn
    const btncontainer = document.createElement("button");
    btncontainer.innerHTML = `
        <button id="btn-${item.id}" onclick="loadPetbyCatagoryname('${item.category}')" class="btn lg:btn-lg lg:px-16 lg: flex justify-center items-center font-bold lg:text-xl catagory-btn ">
          <img class="w-4 lg:w-9" src='${item.category_icon}' alt="">
          ${item.category}
      </button>
    `;
    PetcatagoryContainer.appendChild(btncontainer);

    //activation of catagory btn
    const button = document.getElementById(`btn-${item.id}`);
    button.addEventListener("click", () => {
      removeClass();
      button.classList.add("activebtn");
      loadPetbyCatagoryname(item.category);
    });
  });
};

// function to load all pets
const loadPets = () => {
  const spinnerContainer = document.getElementById("spinner-container");
  const cardcontainer = document.getElementById("all-pets-container");
  const likespetcontainer = document.getElementById("liked");

  spinnerContainer.classList.remove("hidden");
  cardcontainer.classList.add("hidden");
  likespetcontainer.classList.add("hidden");

  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        spinnerContainer.classList.add("hidden");
        cardcontainer.classList.remove("hidden");
        likespetcontainer.classList.remove("hidden");
        allPetsDataarr = data.pets;
        displayAllPets(allPetsDataarr);

        console.log(data);
      }, 1000);
    })
    .catch((error) => {
      spinnerContainer.classList.add("hidden");
      console.log("Error:", error);
    });
};

const displayAllPets = (pets) => {
  console.log(pets);
  const allPetsContainer = document.getElementById("all-pets-container");
  allPetsContainer.innerHTML = " ";

  if (pets.length == 0) {
    allPetsContainer.classList.remove("grid");
    allPetsContainer.innerHTML = `
        <div class="bg-[#3f3c3c08] p-14 rounded-lg">
           
            <div class="flex flex-col justify-center items-center mb-5">
                <img src="./images/error.webp" />
            </div>
            <h2 class="text-center text-3xl font-bold mb-5">No Information Available</h2>
            <P class="px-2 lg:px-40 text-xl font bold text-[#524f4fa0] text-center mb-5"> We're sorry, but there is currently no information available for this pet category. Please check back later as we update our listings regularly. In the meantime, 
            feel free to explore other categories. Thank you for your understanding!</P>
        </div>
    `;
    return;
  } else {
    allPetsContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    // creating card
    const card = document.createElement("div");
    card.className = "p-4 border rounded-lg min-h-[450px] max-w-[350px]";
    card.innerHTML = `
        <div class="card">
            <figure class="rounded-lg">
                <img id="likedPet-${
                  pet.pet_name
                }" class="w-[260px] h-[175px] object-cover" src="${pet.image}"
                    alt="Shoes" />"
            </figure>
            <h2 class="font-bold text-2xl mt-6">${
              pet.pet_name || "Unkown Pet"
            }</h2>

            <div class="card-actions flex flex-col gap-1 mt-2 md:text-[14px]">
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                        class="w-5 object-cover" src="./images/breed.png" alt="">Breed: ${
                          pet.breed || "Not Given"
                        }
                 </div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                                    class="w-5 object-cover" src="./images/birth.png" alt="">Birth: ${
                                      pet.date_of_birth || "Not Given"
                                    }</div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                                    class="w-5 object-cover" src="./images/gender.png" alt="">Gender: ${
                                      pet.gender || "Not Given"
                                    }</div>
                <div class="flex gap-2 justify-center items-center text-[#131313B3]"><img
                class="w-5 object-cover" src="./images/doller.png" alt="">Price : ${
                  pet.price || "Not Given"
                } $</div>

            </div>
            <div class="divider"></div>
             <!-- like and adopt section -->
            <div class="flex gap-2 md:gap-1 lg:gap-0 lg:justify-between">
                <!-- like BTN -->
                <button id="" onclick="likedpets('${
                  pet.pet_name
                }')" class="btn btn-sm"><img class="w-5 bg-[]" src="./images/like.png" alt=""></button>
                <!-- adopt BTN -->
                <button id="adopt-${pet.petId}" onclick="showAdoptModal(${
      pet.petId
    })" class="btn btn-sm lg:px-5 text-[#0E7A81]">Adopt</button>

                <button onclick="loadDetailsOfPet(${
                  pet.petId
                })" class="btn btn-sm lg:px-5 text-[#0E7A81]">Details</button>

            </div>
        </div>

    `;
    allPetsContainer.appendChild(card);
  });
};

// function call
loadCatagories();
loadPets();
