
// load category data from server 
const loadCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const newsCategories = data.data.news_category;
    displayCategory(newsCategories);
}

// display category name by function 
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((category) => {
        // console.log(category.category_id);
        const tabElement = document.createElement('h1');
        tabElement.addEventListener('click', () => {
            handlenews(`${category.category_id}`)
        });;
        tabElement.classList = 'flex-1 transition-all duration-500 border-r-2 hover:bg-black hover:text-white p-2';
        tabElement.innerHTML = `
            <span>${category.category_name}</span>
        `;
        categoryContainer.appendChild(tabElement);
    });
    categoryContainer.lastChild.classList.remove('border-r-2');
}

// load news by category id 
//=======================================
const handlenews = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    const newsDataArray = data.data;
    // console.log(newsDataArray[0]);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    // loop is start here 
    newsDataArray.forEach((newsData) => {
        // console.log(newsData);
        const cardElement = document.createElement('div');
        cardElement.classList = 'card bg-base-100 shadow-xl rounded-lg';
        cardElement.innerHTML = `
        <figure><img src="${newsData?.image_url}" alt="news thumbnail" /></figure>
        <div class="card-body">
            <div class="flex flex-row justify-between">
                <h2 class="card-title mb-4">${newsData?.title?.slice(0, 40) + '...'}</h2>
                <button class="btn btn-secondary btn-sm">${newsData.rating?.badge}</button>
            </div>
            <p >We fing news verous way. We help poeple to provide verious news.</p>
            <p class="mb-4 -mt-2 "><span class="font-medium">Total views:</span> ${newsData.total_view ? newsData.total_view : 'no views'}</p>
            <div class="card-actions">
                <div class="flex flex-row justify-between w-full">
                    <div class="user flex flex-row basis-1/2 ">
                        <div class="user-image  w-4/12 mr-2 relative">
                            <img class="rounded-full" src="${newsData?.author?.img}" alt="">
                            <div class="badge bg-green-700 badge-sm absolute top-0 right-0"></div>
                        </div>
                        <div>
                            <h4 class="user-name font-medium">${newsData?.author?.name ? newsData.author.name : 'No name'}</h4>
                            <small class="date">${newsData.author?.published_date?.slice(0, 11)}</small>
                        </div>
                    </div>
                    <button onclick="handleModal('${newsData._id}')" class="btn bg-gray-500 btn-md text-white">Details</button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardElement);
    });
}
/////
// handle modal function 
const handleModal = async (newsId) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    const modalDetails = data.data[0];
    console.log(modalDetails);

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
    const modal = document.createElement('div');
    modal.innerHTML = `
    <dialog id="modal-id" class="modal">
        <form method="dialog" class="modal-box">
            <button class="btn btn-sm btn-circle bg-red-500 absolute right-2 top-2">✕</button>      
            <img class="mt-2" src="${modalDetails.image_url}">
            <h3 class="font-bold text-lg">${modalDetails.title}</h3>
            <div class="flex flex-row justify-between w-full mt-1">
            <p> <span class="font-medium underline">Total views:</span> ${modalDetails.total_view}</p>
            <p> <span class="font-medium">Rating:</span> ${modalDetails.rating.number}</p>
            </div>
            <p class="py-4">${modalDetails.details}</p>
        </form>
    </dialog>
    `;
    modalContainer.appendChild(modal);

    const modalId = document.getElementById('modal-id');
    modalId.showModal();

}

loadCatagory();

handlenews('01');