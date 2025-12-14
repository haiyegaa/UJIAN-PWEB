let barang = JSON.parse(localStorage.getItem("barang")) || [];

const form = document.getElementById("formBarang");
const tabel = document.getElementById("tabelBarang");

function tampilkanData() {
  tabel.innerHTML = "";
  barang.forEach((item, index) => {
    tabel.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.kode}</td>
        <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
        <td>
          <button onclick="editData(${index})">Edit</button>
          <button onclick="hapusData(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const editIndex = document.getElementById("editIndex").value;
  const nama = document.getElementById("nama").value;
  const kode = document.getElementById("kode").value;
  const harga = Number(document.getElementById("harga").value);

  const data = { nama, kode, harga };

  if (editIndex === "") {
    barang.push(data);
  } else {
    barang[editIndex] = data;
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("barang", JSON.stringify(barang));
  form.reset();
  tampilkanData();
});

function editData(index) {
  document.getElementById("editIndex").value = index;
  document.getElementById("nama").value = barang[index].nama;
  document.getElementById("kode").value = barang[index].kode;
  document.getElementById("harga").value = barang[index].harga;
}

function hapusData(index) {
  barang.splice(index, 1);
  localStorage.setItem("barang", JSON.stringify(barang));
  tampilkanData();
}

// Data awal (jika Local Storage kosong)
if (barang.length === 0) {
  barang = [
    { nama: "Laptop ASUS VivoBook 14 A416MA", kode: "BRG-001", harga: 8500000 },
    { nama: "Printer Epson L3210 Ink Tank", kode: "BRG-002", harga: 3200000 },
    { nama: "Monitor LG 24MK600M-B 24 Inch", kode: "BRG-003", harga: 2300000 }
  ];
  localStorage.setItem("barang", JSON.stringify(barang));
}

tampilkanData();
