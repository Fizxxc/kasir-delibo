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

// Fungsi untuk membuat Order ID unik
function generateOrderId() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("orderId").value = `#${randomNum}`;
}

// Fungsi untuk menghitung total harga dan kembalian
function calculateTotal() {
    const qty = parseInt(document.getElementById("itemQty").value) || 0;
    const price = parseFloat(document.getElementById("itemPrice").value) || 0;
    const cash = parseFloat(document.getElementById("cash").value) || 0;

    const subtotal = qty * price;
    const tax = subtotal * 0.01;
    const total = subtotal + tax;
    const change = cash - total;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("change").textContent = change >= 0 ? change.toFixed(2) : "Kurang Uang!";
}

// Event listener untuk input perubahan
document.getElementById("itemQty").addEventListener("input", calculateTotal);
document.getElementById("itemPrice").addEventListener("input", calculateTotal);
document.getElementById("cash").addEventListener("input", calculateTotal);

// Panggil fungsi Order ID saat halaman dimuat
window.onload = () => {
    generateOrderId();
    calculateTotal();
};

document.addEventListener("DOMContentLoaded", function () {
    function generateOrderID() {
        return "#" + Math.floor(100000 + Math.random() * 900000);
    }

    function updateTotals() {
        const qty = parseInt(document.getElementById("itemQty").value) || 0;
        const price = parseFloat(document.getElementById("itemPrice").value) || 0;
        const subtotal = qty * price;
        const tax = Math.round(subtotal * 0.01);
        const total = subtotal + tax;

        document.getElementById("subtotal").textContent = subtotal.toLocaleString("id-ID");
        document.getElementById("tax").textContent = tax.toLocaleString("id-ID");
        document.getElementById("total").textContent = total.toLocaleString("id-ID");

        return total;
    }

    function updateChange() {
        const total = updateTotals();
        const cash = parseFloat(document.getElementById("cash").value) || 0;
        const change = cash - total;
        document.getElementById("change").textContent = change >= 0 ? change.toLocaleString("id-ID") : "0";
    }

    function generateStruk() {
        const orderID = document.getElementById("orderId").value = generateOrderID();
        const productName = document.getElementById("productName").value;
        const qty = parseInt(document.getElementById("itemQty").value) || 0;
        const price = parseFloat(document.getElementById("itemPrice").value) || 0;
        const subtotal = qty * price;
        const tax = Math.round(subtotal * 0.01);
        const total = subtotal + tax;
        const cash = parseFloat(document.getElementById("cash").value) || 0;
        const change = cash - total;
        const now = new Date();
        const date = now.toLocaleDateString("id-ID");
        const time = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

        let strukHTML = `
    <div id="strukArea" style="width: 300px; padding: 20px; font-family: Arial, sans-serif; text-align: center; border: 1px solid #000; color: black;">
        <h2 style="margin: 0; color: black;">DELIBO MARKET</h2>
        <p>Perumahan Griya Yasa Blok B1/19</p>
        <p>Telp: +6288294951448</p>
        <hr>
        <p><strong>${orderID}</strong></p>
        <hr>
        <p>${date} | ${time}</p>
        <p>Produk: ${productName}</p>
        <p>${qty} x ${price.toLocaleString("id-ID")}</p>
        <hr>
        <p>Subtotal: ${subtotal.toLocaleString("id-ID")}</p>
        <p>Pajak (1%): ${tax.toLocaleString("id-ID")}</p>
        <p>Total: ${total.toLocaleString("id-ID")}</p>
        <p>Tunai: ${cash.toLocaleString("id-ID")}</p>
        <p>Kembalian: ${change >= 0 ? change.toLocaleString("id-ID") : "0"}</p>
        <hr>
        <p><b>Terima Kasih Telah Order Di Delibo Market 🙏</b></p>
         <p>© 2025 Delibo Market. All Rights Reserved.</p>
    </div>
`;


        document.getElementById("outputStruk").innerHTML = strukHTML;
    }

    // Cetak Struk
    document.querySelector(".btnCetak").addEventListener("click", function () {
        let printWindow = window.open("", "", "width=400,height=600");
        printWindow.document.open();
        printWindow.document.write("<html><head><title>Struk</title></head><body>");
        printWindow.document.write(document.getElementById("strukArea").outerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    });

    // Download Struk sebagai PNG
    document.querySelector(".btnDownload").addEventListener("click", function () {
        html2canvas(document.querySelector("#strukArea")).then(canvas => {
            let link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "Struk_Delibo.png";
            link.click();
        });
    });

    document.getElementById("btnGenerate").addEventListener("click", generateStruk);
    document.getElementById("itemQty").addEventListener("input", updateTotals);
    document.getElementById("itemPrice").addEventListener("input", updateTotals);
    document.getElementById("cash").addEventListener("input", updateChange);
});
