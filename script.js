
const form = document.getElementById("registrationForm");
const nama = document.getElementById("nama");
const kelas = document.getElementById("kelas");
const skor = document.getElementById("skor");
const pesanSkor = document.getElementById("pesanSkor");
const hasil = document.getElementById("hasil");

// Memeriksa apakah skor berada dalam rentang 1 sampai 677.
function validasiSkor(tampilkanAlert = false) {
    const nilai = Number(skor.value);

    const tidakValid =
        skor.value.trim() === "" ||
        !Number.isFinite(nilai) ||
        nilai < 1 ||
        nilai > 677;

    skor.classList.toggle("invalid", tidakValid);
    pesanSkor.classList.toggle("error", tidakValid);

    if (skor.value.trim() === "") {
        pesanSkor.textContent = "Target skor wajib diisi.";
    } else if (nilai > 677) {
        pesanSkor.textContent =
            "Skor TOEFL tidak boleh melebihi 677!";

        if (tampilkanAlert) {
            alert("Skor TOEFL tidak boleh melebihi 677!");
        }
    } else if (nilai < 1) {
        pesanSkor.textContent =
            "Skor harus lebih besar dari 0.";

        if (tampilkanAlert) {
            alert("Masukkan skor antara 1 dan 677.");
        }
    } else {
        pesanSkor.textContent =
            "Skor TOEFL ITP maksimal adalah 677.";
    }

    return !tidakValid;
}

// Memperbarui pesan saat pengguna mengetik.
skor.addEventListener("input", function () {
    validasiSkor(false);
    hasil.style.display = "none";
});

// Menangani pengiriman formulir.
form.addEventListener("submit", function (event) {
    event.preventDefault();

    hasil.style.display = "none";

    // Memeriksa nama.
    if (nama.value.trim() === "") {
        alert("Nama lengkap wajib diisi!");
        nama.focus();
        return;
    }

    // Memeriksa pilihan kelas.
    if (kelas.value === "") {
        alert("Silakan pilih kelas terlebih dahulu!");
        kelas.focus();
        return;
    }

    // Memeriksa target skor.
    if (!validasiSkor(true)) {
        skor.focus();
        return;
    }

    // Menampilkan konfirmasi pendaftaran.
    hasil.innerHTML =
        "<strong>Pendaftaran berhasil!</strong><br>" +
        "Nama: " + escapeHTML(nama.value.trim()) + "<br>" +
        "Kelas: " + escapeHTML(kelas.value) + "<br>" +
        "Target skor TOEFL: " + escapeHTML(skor.value);

    hasil.style.display = "block";

    alert("Pendaftaran berhasil!");
});

// Mengamankan teks sebelum ditampilkan ke halaman.
function escapeHTML(teks) {
    return teks.replace(/[&<>"']/g, function (karakter) {
        const pengganti = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return pengganti[karakter];
    });
}
