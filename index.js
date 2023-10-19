let inputArr = []


const inputBtn = document.getElementById("input-btn")
const inputField = document.getElementById("input-field")
const outputElement = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const deleteRecentBtn = document.getElementById("delete-input")
const saveTab = document.getElementById("tab-btn")

// These codes are so that when we refresh the page, the values stayed displayed on screen
// without these values, when we refresh page, the values are gone
// they still exist in localStorage though, just not on page
// so these are so we head into local storage and retrieve values from them to display back on page

const valueFromLocalStorage = JSON.parse( localStorage.getItem("inputArr")) //grab the strings from LocalStorage,(remember that they're now String)
// after being turned into String by Stringify, turn them back into arrays

if (valueFromLocalStorage) { // if they're NOT empty, save them into outside inputArr and display them
  inputArr = valueFromLocalStorage
  render(inputArr)
}

//

saveTab.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      inputArr.push(tabs[0].url) // save the tab link into the array
      localStorage.setItem("inputArr", JSON.stringify(inputArr) ) // push it into local storage
      render(inputArr) //display 
  })
})


function render(array) {
    // Create a string to store the list items
    let listItems = "";
  
    for (let i = 0; i < array.length; i++) {
      // Build each list item as a string and add it to the listItems string
      // each list item will contain array[0], array[1], and so on...
      listItems += `
        <li>
          <a target='_blank' href='${array[i]}'>
            ${array[i]}
          </a>
        </li>
      `;
    }
  
    // Set the innerHTML of the outputElement to the listItems string
    outputElement.innerHTML = listItems;
  }

inputBtn.addEventListener("click", function(){
   
    const value = inputField.value 
    inputArr.push(value)
    inputField.value = "" // clear input field
    localStorage.setItem("inputArr", JSON.stringify(inputArr)) //save the input in local storage, 
                                                              //we have to stringify it because JSON only takes in String and not arrays
    render(inputArr)
   
})

deleteBtn.addEventListener("click", function(){
    inputArr = []
    render(inputArr)
    localStorage.clear()
})

deleteRecentBtn.addEventListener("click", function() {
    
    if (inputArr.length > 0) {
        inputArr.pop(); // Remove the last element
        localStorage.setItem("inputArr", JSON.stringify(inputArr)); //set local storage to new array with removed element
        render(inputArr); // display on screen
      }
  });

 