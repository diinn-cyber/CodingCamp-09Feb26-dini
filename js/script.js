// Tunggu hingga DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Animasi scroll
    const elements = document.querySelectorAll('.fade-element');

    window.addEventListener('scroll', () => {
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (position < screenPosition) {
                el.classList.add('show');
            }
        });
    });

    // Tutup menu mobile saat link diklik
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // Smooth scrolling untuk semua link navigasi
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Update link aktif
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        });
    });

    // Pesan Selamat Datang Dinamis dengan Nama User
    function updateWelcomeMessage() {
        const namaInput = document.getElementById('nama');
        const welcomeText = document.getElementById('welcome-text');
        const defaultName = 'din';

        namaInput.addEventListener('input', function() {
            const userName = this.value.trim();
            if (userName) {
                welcomeText.textContent = `Hi ${userName}, Selamat Datang Di Website`;
            } else {
                welcomeText.textContent = `Hi ${defaultName}, Selamat Datang Di Website`;
            }
        });
    }

    updateWelcomeMessage();

    // Validasi Form
    const contactForm = document.getElementById('contactForm');
    const formOutput = document.getElementById('formOutput');

    // Fungsi Validasi Nama
    function validateNama() {
        const namaInput = document.getElementById('nama');
        const namaError = document.getElementById('namaError');
        const nama = namaInput.value.trim();

        if (nama === '') {
            namaError.textContent = 'Nama wajib diisi';
            namaInput.classList.add('border-red-500');
            namaInput.classList.remove('border-green-500');
            return false;
        } else if (nama.length < 3) {
            namaError.textContent = 'Nama minimal 3 karakter';
            namaInput.classList.add('border-red-500');
            namaInput.classList.remove('border-green-500');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(nama)) {
            namaError.textContent = 'Nama hanya boleh berisi huruf dan spasi';
            namaInput.classList.add('border-red-500');
            namaInput.classList.remove('border-green-500');
            return false;
        } else {
            namaError.textContent = '';
            namaInput.classList.remove('border-red-500');
            namaInput.classList.add('border-green-500');
            return true;
        }
    }

    // Fungsi Validasi Tanggal Lahir
    function validateTanggalLahir() {
        const tanggalLahirInput = document.getElementById('tanggalLahir');
        const tanggalLahirError = document.getElementById('tanggalLahirError');
        const tanggalLahir = tanggalLahirInput.value;

        if (tanggalLahir === '') {
            tanggalLahirError.textContent = 'Tanggal lahir wajib diisi';
            tanggalLahirInput.classList.add('border-red-500');
            tanggalLahirInput.classList.remove('border-green-500');
            return false;
        } else {
            // Cek apakah tanggal tidak di masa depan
            const selectedDate = new Date(tanggalLahir);
            const today = new Date();
            
            if (selectedDate > today) {
                tanggalLahirError.textContent = 'Tanggal lahir tidak boleh di masa depan';
                tanggalLahirInput.classList.add('border-red-500');
                tanggalLahirInput.classList.remove('border-green-500');
                return false;
            }
            
            tanggalLahirError.textContent = '';
            tanggalLahirInput.classList.remove('border-red-500');
            tanggalLahirInput.classList.add('border-green-500');
            return true;
        }
    }

    // Fungsi Validasi Jenis Kelamin
    function validateJenisKelamin() {
        const jenisKelaminInputs = document.querySelectorAll('input[name="jenisKelamin"]');
        const jenisKelaminError = document.getElementById('jenisKelaminError');
        let isChecked = false;

        jenisKelaminInputs.forEach(input => {
            if (input.checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            jenisKelaminError.textContent = 'Silakan pilih jenis kelamin';
            return false;
        } else {
            jenisKelaminError.textContent = '';
            return true;
        }
    }

    // Fungsi Validasi Pesan
    function validatePesan() {
        const pesanInput = document.getElementById('pesan');
        const pesanError = document.getElementById('pesanError');
        const pesan = pesanInput.value.trim();

        if (pesan === '') {
            pesanError.textContent = 'Pesan wajib diisi';
            pesanInput.classList.add('border-red-500');
            pesanInput.classList.remove('border-green-500');
            return false;
        } else if (pesan.length < 10) {
            pesanError.textContent = 'Pesan minimal 10 karakter';
            pesanInput.classList.add('border-red-500');
            pesanInput.classList.remove('border-green-500');
            return false;
        } else {
            pesanError.textContent = '';
            pesanInput.classList.remove('border-red-500');
            pesanInput.classList.add('border-green-500');
            return true;
        }
    }

    // Validasi Real-time
    document.getElementById('nama').addEventListener('blur', validateNama);
    document.getElementById('nama').addEventListener('input', validateNama);
    
    document.getElementById('tanggalLahir').addEventListener('blur', validateTanggalLahir);
    document.getElementById('tanggalLahir').addEventListener('change', validateTanggalLahir);
    
    document.querySelectorAll('input[name="jenisKelamin"]').forEach(input => {
        input.addEventListener('change', validateJenisKelamin);
    });
    
    document.getElementById('pesan').addEventListener('blur', validatePesan);
    document.getElementById('pesan').addEventListener('input', validatePesan);

    // Submit Form
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validasi semua field
        const isNamaValid = validateNama();
        const isTanggalLahirValid = validateTanggalLahir();
        const isJenisKelaminValid = validateJenisKelamin();
        const isPesanValid = validatePesan();

        // Jika semua validasi lolos, tampilkan output
        if (isNamaValid && isTanggalLahirValid && isJenisKelaminValid && isPesanValid) {
            const nama = document.getElementById('nama').value.trim();
            const tanggalLahir = document.getElementById('tanggalLahir').value;
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
            const pesan = document.getElementById('pesan').value.trim();

            // Format tanggal
            const dateObj = new Date(tanggalLahir);
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

            // Dapatkan waktu saat ini
            const now = new Date();
            const currentTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

            // Tampilkan output
            formOutput.innerHTML = `
                <div class="space-y-4">
                    <div class="border-b pb-3">
                        <p class="text-sm text-gray-500">Waktu Pengiriman</p>
                        <p class="font-semibold text-gray-800">${currentTime}</p>
                    </div>
                    <div class="border-b pb-3">
                        <p class="text-sm text-gray-500">Nama</p>
                        <p class="font-semibold text-gray-800">${nama}</p>
                    </div>
                    <div class="border-b pb-3">
                        <p class="text-sm text-gray-500">Tanggal Lahir</p>
                        <p class="font-semibold text-gray-800">${formattedDate}</p>
                    </div>
                    <div class="border-b pb-3">
                        <p class="text-sm text-gray-500">Jenis Kelamin</p>
                        <p class="font-semibold text-gray-800">${jenisKelamin}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Pesan</p>
                        <p class="font-semibold text-gray-800">${pesan}</p>
                    </div>
                </div>
            `;

            // Pesan sukses
            alert('Form berhasil dikirim! Cek output di sebelah kanan.');

            // Optional: Reset form setelah submit
            // contactForm.reset();
            // formOutput.innerHTML = '<p class="text-gray-400 text-center py-12">Isi formulir dan klik kirim untuk melihat informasi Anda di sini</p>';
        } else {
            // Scroll ke error pertama
            const firstError = document.querySelector('[id$="Error"]:not(:empty)');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Scroll ke atas saat halaman dimuat
    window.scrollTo(0, 0);

    // Update navigasi aktif saat scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

