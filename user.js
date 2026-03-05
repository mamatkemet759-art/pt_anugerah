let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

function showPopup(msg){
  let p = document.getElementById("popup");
  p.innerText = msg;
  p.style.display = "block";
  setTimeout(()=>{p.style.display="none";},2000);
}

function updateUserUI(){
  if(!currentUser) return;
  document.getElementById("saldo").innerText = users[currentUser].saldo;
  let list = "";
  users[currentUser].riwayat.forEach(r=>{list+="<li>"+r+"</li>";});
  document.getElementById("riwayat").innerHTML = list;
}

function login(){
  let username=document.getElementById("username").value;
  if(username==""){alert("Masukkan username");return;}
  if(!users[username]){users[username]={saldo:0,riwayat:[]};}
  currentUser=username;
  localStorage.setItem("users",JSON.stringify(users));
  document.getElementById("loginCard").style.display="none";
  document.getElementById("userApp").style.display="block";
  updateUserUI();
}

function pinjam(){
  let jumlah=parseInt(document.getElementById("pinjaman").value);
  let diterima=jumlah - (jumlah*0.05);
  users[currentUser].saldo += diterima;
  users[currentUser].riwayat.push("Pinjam "+jumlah+" diterima "+diterima);
  localStorage.setItem("users",JSON.stringify(users));
  updateUserUI();
  showPopup("Pinjaman diterima (simulasi)");
}

function topup(){
  let jumlah=parseInt(document.getElementById("topup").value);
  users[currentUser].saldo+=jumlah;
  users[currentUser].riwayat.push("Top up "+jumlah);
  localStorage.setItem("users",JSON.stringify(users));
  updateUserUI();
  showPopup("Top up berhasil (simulasi)");
}