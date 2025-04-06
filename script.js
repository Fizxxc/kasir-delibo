document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk menampilkan pesan salam sesuai waktu
    function updateGreeting() {
        const greetingElement = document.querySelector(".greeting");
        const hour = new Date().getHours();
        let greeting = "";

        if (hour >= 5 && hour < 12) {
            greeting = "Selamat Pagi ⛅";
        } else if (hour >= 12 && hour < 15) {
            greeting = "Selamat Siang ☀️";
        } else if (hour >= 15 && hour < 18) {
            greeting = "Selamat Sore 🌇";
        } else {
            greeting = "Selamat Malam 🌙";
        }
        
        if (greetingElement) {
            greetingElement.textContent = greeting;
        }
    }

    // Fungsi untuk memperbarui jam, menit, dan detik
function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Perbarui waktu setiap detik
setInterval(updateTime, 1000);
updateTime();

    // Panggil fungsi salam dan waktu saat halaman dimuat
    updateGreeting();
    updateTime();
    setInterval(updateTime, 60000);

    // Redirect ke halaman home.html setelah 5 detik
    setTimeout(() => {
        window.location.href = "home.html";
    }, 8000);
});
