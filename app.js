let display=document.querySelector('#results')
async function getRandomMeal(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const meal = data.meals[0];
 // console.log(meal)
   displayMeals(meal)
}

function displayMeals(meal){
const name = document.getElementById('name')
const image = document.getElementById('image')
image.setAttribute('src', `${meal.strMealThumb}`)
name.innerText = `${meal.strMeal}`;
}

let button = document.getElementById('button');
let container = document.querySelector('.searched-meal-container')
let text = document.getElementById('text')
 

var getresults ='';
button.addEventListener('click', () =>{
    if((text.value)!=""){
        getresults = text.value;
        text.value="";
        container.innerHTML="";
        searchedFood(getresults);
    }
})


async function searchedFood(e){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`)
    .then((datas) =>datas.json())
    .then((result) =>{
        let res = result.meals;
        console.log(res);
        let arr =[];

    // console.log(res[0].strMealThumb)
    // console.log(res[0].strMeal)
    // console.log(res[0].idMeal)

        res.forEach((element) =>{
           container.innerHTML+=`<div id="${element.idMeal}" class='card'>
           <img src='${element.strMealThumb}' class ='mealimage'>
           <h3 class ='mealname'>${element.strMeal}</h3>
           
           </div>`
           arr.push(`${element.idMeal}`);
        });
      let card = document.querySelectorAll('.card')
      card.forEach((ele)=>{
        ele.addEventListener("click",()=>{
            let id=ele.getAttribute('id');
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response=>response.json())
            .then((response)=>{
                let results=response.meals[0];
                console.log(results)
        let ingrd=[]
        for(let i=1; i<=20; i++){
            let str="strIngredient"+i;
            let a= results[str]
            console.log(a)
            if(a&&a!=""){
                ingrd.push(a)
            }
        }
           let list = document.querySelector('#ingredients')
         list.innerHTML="";
         console.log(ingrd)
         ingrd.forEach((e)=>{
            list.innerHTML+=`
            <ul>
            <li> ${e}</li>
            </ul>;`
         })
         document.getElementById('list').style.display='flex'
         document.getElementById('list').onclick = ()=>{
            document.getElementById('list').style.display='none'
         }

            }).catch(()=>{
                console.log("invalid API")
            })
        })
      })
    }).catch(()=>{
        display.innerHTML=`Results for your search: <br> sorry, we can't find any item`
    })
}
//     fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//     .then((r)=>r.json())
//     .then((r)=>{
//         let results=response.meals[0];
//         console.log(results)
// let ingrd=[]
// for(let i=1; i<=20; i++){
//     let str="strIngredient"+i;
//     let a= results[str]
//     console.log(a)
//     if(a&&a!=""){
//         ingrd.push(a)
//     }
// }
//    let list = document.querySelector('#ingredients')
//  list.innerHTML="";
//  console.log(ingrd)
//  ingrd.forEach((e)=>{
//     list.innerHTML+=`
//     <ul>
//     <li> ${e}</li>
//     </ul>;`
//  })
//  document.getElementById('list').style.display='flex'
//  document.getElementById('list').onclick = ()=>{
//     document.getElementById('list').style.display='none'
//  }

//     }).catch(()=>{
//         console.log("invalid API")
//     })
getRandomMeal()