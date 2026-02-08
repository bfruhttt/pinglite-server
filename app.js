const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");

let messages = JSON.parse(localStorage.getItem("messages")) || [];

function renderMessages() {
  messagesDiv.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  messages.push(text);
  localStorage.setItem("messages", JSON.stringify(messages));
  input.value = "";
  renderMessages();
}

// البحث وID
function openSearch() {
  const searchArea = document.getElementById("searchArea");
  searchArea.style.display = searchArea.style.display === "none" ? "block" : "none";
}

function addFriend() {
  const friendInput = document.getElementById("friendID");
  const id = friendInput.value.trim();
  if (!id) return alert("الرجاء إدخال ID");
  alert("تم إضافة الصديق: " + id);
  friendInput.value = "";
}

renderMessages();
