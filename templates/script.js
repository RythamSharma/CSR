let ids=0;

const refresh = async () => {
  try {
     fetch("/user/users")
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        const container = document.getElementById("container");
        container.innerHTML=''
        for (let user of response) {
          const div = document.createElement("div");
          div.innerHTML = `
                <p>${user.name}</p>
                <p>${user.age}</p>
                <p>${user.place}</p>
                <button onclick=deleteuser("${user._id}") >delete</button>
                `;
            div.setAttribute('onClick',`editUser('${user._id}')`)
            div.setAttribute('id',`${user._id}`);
          container.appendChild(div);
        }
      });
  } catch (error) {
    console.error(error);
  }
};

refresh();


const createUser = async(e)=>{
    try {
        e.preventDefault();
        const name = document.getElementById("name").value
        const age = document.getElementById("age").value
        const place = document.getElementById("place").value
        const data= {
            name:name,
            age:age,
            place:place
        }
        const response = await fetch("/user/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const rep=await response.json()
        if(rep.message=='success'){
            refresh()
        }
    } catch (error) {
        console.log(error)
    }
}

function editUser(id){
    try {
        const name = document.getElementById("editname")
        const age = document.getElementById("editage")
        const place = document.getElementById("editplace")
        const inp=document.getElementById("hidden")
        inp.value=id
        const container = document.getElementById(id);
        let ps=(container.getElementsByTagName('p'))
        name.value=ps[0].textContent
        age.value=ps[1].textContent
        place.value=ps[2].textContent
        
    } catch (error) {
        console.log(error)
    }
}

const edituserform= async(e)=>{
    e.preventDefault();
    try {
        const name = document.getElementById("editname").value
        const age = document.getElementById("editage").value
        const placeval = document.getElementById("editplace").value
        const id=document.getElementById("hidden").value
        const data={
            name:name,
            age:age,
            place:placeval
        }
        const response = await fetch(`user/api/updateuser/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const rep = await response.json();
        refresh();
    } catch (error) {
        console.log(error)
    }
}

async function deleteuser (id){
    try {
        const response = await fetch(`/user/api/delete/${id}`,{
            method:"delete"
        })
        const rep = await response.json();
        if(rep.status=='success'){
            refresh();
        }
    } catch (error) {
        console.log(error)
    }
}