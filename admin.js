let users = JSON.parse(localStorage.getItem("users")) || {};

function showPopup(msg){
  let p=document.getElementById("popup");
  p.innerText=msg;
  p.style.display="block";
  setTimeout(()=>{p.style.display="none";},2000);
}

function updateAdminUI(){
  let select=document.getElementById("selectUser");
  let list=document.getElementById("userList");
  let riwayat=document.getElementById("riwayatAdmin");
  select.innerHTML="";
  list.innerHTML="";
  riwayat.innerHTML="";
  Object.keys(users).forEach(u=>{
    select.innerHTML+=`<option value="${u}">${u}</option>`;
    list.innerHTML+=`<li>${u}: ${users[u].saldo}</li>`;
    users[u].riwayat.forEach(r=>{riwayat.innerHTML+=`<li>${u}: ${r}</li>`});
  });
}

function adminTambah(){
  let username=document.getElementById("selectUser").value;
  let jumlah=parseInt(document.getElementById("tambahSaldo").value);
  if(!username || !jumlah){showPopup("Pilih user dan masukkan jumlah"); return;}
  users[username].saldo+=jumlah;
  users[username].riwayat.push("Admin tambah saldo "+jumlah);
  localStorage.setItem("users",JSON.stringify(users));
  updateAdminUI();
  showPopup("Saldo ditambahkan");
}

function resetSaldo(){
  let username=document.getElementById("selectUser").value;
  if(!username){showPopup("Pilih user"); return;}
  users[username].saldo=0;
  users[username].riwayat.push("Admin reset saldo");
  localStorage.setItem("users",JSON.stringify(users));
  updateAdminUI();
  showPopup("Saldo direset");
}

function hapusUser(){
  let username=document.getElementById("selectUser").value;
  if(!username){showPopup("Pilih user"); return;}
  delete users[username];
  localStorage.setItem("users",JSON.stringify(users));
  updateAdminUI();
  showPopup("User dihapus");
}

updateAdminUI();