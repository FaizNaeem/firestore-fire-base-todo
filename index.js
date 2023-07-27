
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCarN6h6FPkS3raGOKAScjMJcdp_r0kHWU",
    authDomain: "smitproject-39703.firebaseapp.com",
    projectId: "smitproject-39703",
    storageBucket: "smitproject-39703.appspot.com",
    messagingSenderId: "849520424684",
    appId: "1:849520424684:web:2a1feca7190271ea5557c9",
    measurementId: "G-LKLK8SZ6EX"  
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const btn = document.getElementById('submit')
const inp = document.getElementById('entry')
const todo = document.getElementById('todo-list')

btn.addEventListener('click', async () => {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: inp.value
        });
        alert("add")
       .then(() => {
            location.reload()
        })
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        Swal.fire({
            title: `An Error Occured Adding Todo`,
            icon: 'error'
        })
        console.error("Error adding document: ", e);
    }
})
async function showTodos() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        todo.innerHTML += `
        <li class="list-item">
                <p class="text">${doc.data().todo}</p>
                <i class='fas fa-edit' onclick='UpTodo("${doc.id}")'></i>
                <i class='fa-solid fa-trash' onclick='delTodo("${doc.id}")'></i>
            </li>
        `
    });

}
showTodos()

function delTodo(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
    // alert("sure?")
    .then(async(result) => {
        if (result.isConfirmed) {
            // Swal.fire(
            //     'Deleted!',
            //     'Your Todo has been deleted.',
            //     'success'
            //     )
            alert("delete succes")
                await deleteDoc(doc(db, "todos", id));
                location.reload()
        }
    })
}
window.delTodo = delTodo

function UpTodo(id) {
    const data = doc(db, "todos", id);
    Swal.fire({
        title: `Enter Value to Replace`,
        input: 'text',
        confirmButtonText: 'Replace / Edit !',
        showLoaderOnConfirm: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateDoc(data, {
                todo: result.value + " (edited on " + new Date().getHours() + ":" + new Date().getMinutes() + " )"
            });
            Swal.fire({
                title: `Value Replaced`,
                icon: 'success'
            }).then(() => {
                location.reload()
            })
        }
    })
}
window.UpTodo = UpTodo

