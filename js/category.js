//------------------------Timeformating----------------------------

function getTimeString(time){
  const hour = parseInt(time/3600);
  let remainingSecond= time % 3600;
  const minute = parseInt (remainingSecond / 60);
  remainingSecond=remainingSecond % 60; 
return `${hour} hour ${minute} minute ${remainingSecond} second ago`;

}
//-------------------------Timeformating-----------------------------

const removeActiveClass = ()=>{
const buttons = document.getElementsByClassName('category-btn')
for(let btn of buttons){
  btn.classList.remove('active')
}
}

// 1- fetch, load and show categories
// create loadCategories
const loadCategories = () =>{
// fetch data
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(Response=>Response.json())
.then(data=>displayCatagories(data.categories))
// .catch((error) => console.log(error));
}
//---------------------------------videocategory start------------------------------------------------------


//---------------- carddemo-----------
const cardDemo = {
    "category_id": "1001",
      "video_id": "aaaa",
      "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
      "title": "Shape of You",
      "authors": [
        {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
        }
      ],
      "others": {
        "views": "100K",
        "posted_date": "16278"
      },
      "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    };
//---------------- carddemo-----------




// creat videocategories
const loadVideos = () =>{
    // fetch data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(Response=>Response.json())
    .then(data=>displayVideos(data.videos))
    // .catch((error) => console.log(error));
    }
 
    const loadCategoriesVideos=(id)=>{
      // alert(id);
      fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(Response=>Response.json())
    .then((data)=>{
      // remove active button
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`)
      activeBtn.classList.add('active');
      displayVideos(data.category);
    });
       
      
    }
    // .catch((error) => console.log(error));
      
    
    

 const displayVideos = (videos)=>{
    const videoContainer = document.getElementById('videos'); 
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML="";
    if(videos.length===0){
      videoContainer.innerHTML = `
      <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
      <img src="assets/Icon.png"/> 
      <h2 class= "text-center text-2xl font-bold">No content here in this Category</h2>
      </div>
      `
      videos.
      return;
    }else{
      videoContainer.classList.add('grid');
    }
    videos.forEach(video=>{
        console.log(video); 
        const card = document.createElement('div');
        card.classList = 'card  '
        card.innerHTML=
        `
        <figure class="h-[200px] relative">
        <img
          src=${video.thumbnail}
          class="h-full w-full object-cover"
          alt="Shoes" />
          ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 text-white">${getTimeString(video.others.posted_date)}</span>`

          }
          
      </figure>
      <div class="px-0 py-2 flex gap-2">
        <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}""/>
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class='flex items-center gap-2'>
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${video.authors[0].verified===true? `<img class='w-5' src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`: ""}
        
        </div>
        </div>
      </div>
        `;
        videoContainer.append(card);
        
       
    })
 }
 //---------------------------------videocategory end------------------------------------------------------

// create displayCategories

const displayCatagories = (categories) =>{
const categoryContainer = document.getElementById('categories')    
    categories.forEach((item) =>{
        // console.log(item)
        // creat a button

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML=
        `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `
        
        // add button to caegory container
        categoryContainer.append(buttonContainer);
    });

}

loadCategories();
loadVideos();

