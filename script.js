let website=document.getElementById("website");
let username=document.getElementById("username");
let password=document.getElementById("password");

//for masking the password
function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        //The Window. navigator property refers to a Navigator object that contains information about the web browser as a whole, such as the version and a list of the data formats it can display. 

        //clipboard.writetext() returns a promis which should be dealt with using then catch cases
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"; //HTML DOM Element style
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000); //The setTimeout() is executed only once.

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed"); //The alert() method displays an alert box with a message and an OK button.
        },
      );
      //Two arguments are given to the then() first which excutes if promise goes well, second if not
  }

const deletePassword = (website)=>{
    let data = localStorage.getItem("passwords");//The getItem() method of the Storage interface, when passed a key name, will return that key's value, or null if the key does not exist, in the given Storage object.

    //sessionStorage maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores).
    //localStorage does the same thing, but persists even when the browser is closed and reopened.

    //We need to note that Web Storage API stores storage objcets as key-value pairs and everything is stored as strings. Integers are automatically converted into strings.

    let arr = JSON.parse(data);
    //A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string.Parse the data with JSON.parse(), and the data becomes a JavaScript object.

    arrUpdated = arr.filter((e)=>{ // arrupdated is the new filtered array
        //The filter() method creates a new array filled with elements that pass a test provided by a function.
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    //Here, again we have to set the given item in localstorage but for that we need to convert everything to strings
    alert(`Successfully deleted ${website}'s password`)
    //The dollar sign followed by curly braces ${} is used to evaluate and embed expressions dynamically in template literals
    showPasswords();
}

// Logic to fill the table
const showPasswords = () => {
    //In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever.

    //With arrow functions the this keyword always represents the object that defined the arrow function.

    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0)//important to parse here
     {
        tb.innerHTML = "No Data To Show"; // to set the innerhtml of that element
    }
    else {
        tb.innerHTML =  `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr> ` //use of backticks

    //Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.

        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str

    }
    website.value = ""
    username.value = ""
    password.value = ""
}

console.log("Working");

showPasswords();

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault(); //This is essential here as otherwise a submission would be made immediately
    //Also here ince in the index.html file we have mentioned required for all three fields the by default action of popping "required field" is also not done.
    console.log("Clicked...");
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords);
    if (passwords == null) {
        let json = [];
        json.push({website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(passwords);
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords();
});
