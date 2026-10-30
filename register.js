let selectedGender = "";

window.onload = () => {
    const selM = document.getElementById('dob-m');
    const selD = document.getElementById('dob-d');
    const selY = document.getElementById('dob-y');

    const months = ["MM", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months.forEach((m, i) => selM.options.add(new Option(m, i === 0 ? "" : i)));

    selD.options.add(new Option("DD", ""));
    for(let i=1; i<=31; i++) selD.options.add(new Option(i, i));

    selY.options.add(new Option("YYYY", ""));
    for(let i=2026; i>=1950; i--) selY.options.add(new Option(i, i));
};

function navTo(step) {
    if (step === 2) {
        
        // VALIDASI EMAIL (MENGANDUNG @ DAN . SERTA PANJANG MINIMAL 5)
        const email = document.getElementById('email').value;
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length < 5) {
            document.getElementById('err-email').innerText = "INVALID ACCESS CODE / EMAIL";
            return;
        }
    }
    
    document.querySelectorAll('.auth-module').forEach(m => m.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    document.getElementById('node2').classList.toggle('active', step === 2);
}

function setGender(val) {
    selectedGender = val;
    document.getElementById('g-male').classList.remove('active');
    document.getElementById('g-female').classList.remove('active');
    document.getElementById(val === 'M' ? 'g-male' : 'g-female').classList.add('active');
}

function loginWithEmail() {
    const email = document.getElementById('email-login').value;
    const pass = document.getElementById('pass-login').value;
    const errEmail = document.getElementById('err-login');
    const errPass = document.getElementById('err-pass-login');
    
    errEmail.innerText = '';
    errPass.innerText = '';
    
    // VALIDASI EMAIL (MENGANDUNG @ DAN . SERTA PANJANG MINIMAL 5)
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length < 5) {
        errEmail.innerText = "INVALID EMAIL";
        return;
    }
    
    let hasNum = false;
    const nums = "0123456789";
    for(let char of pass) { if(nums.indexOf(char) !== -1) hasNum = true; }
    
    // VALIDASI PASSWORD (PANJANG MINIMAL 8 DAN HARUS PUNYA ANGKA)
    if (pass.length < 8 || !hasNum) {
        errPass.innerText = "MIN 8 CHARS & 1 NUMBER";
        return;
    }
    
    showAccessGranted('Email Login');
}

function validateFinal() {
    document.querySelectorAll('.error-msg').forEach(e => e.innerText = "");
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('pass').value;
    const confirm = document.getElementById('confirm').value;
    const dobM = document.getElementById('dob-m').value;
    let isValid = true;

    
    // VALIDASI USERNAME (MIN 5 KARAKTER, TIDAK BOLEH ADA SPASI)
    let hasSpace = false;
    for(let char of user) { if(char === " ") hasSpace = true; }
    if (user.length < 5 || hasSpace) {
        document.getElementById('err-username').innerText = "MIN 5 CHARS / NO SPACES";
        isValid = false;
    }

    // VALIDASI TANGGAL LAHIR
    if (!dobM) {
        document.getElementById('err-dob').innerText = "TIMELINE REQUIRED";
        isValid = false;
    }

    // VALIDASI PEMILIHAN GENDER
    if (!selectedGender) {
        document.getElementById('err-gender').innerText = "BIOMETRIC REQUIRED";
        isValid = false;
    }
    let hasNum = false;
    const nums = "0123456789";
    for(let char of pass) { if(nums.indexOf(char) !== -1) hasNum = true; }

    if (pass.length < 8 || !hasNum) { // VALIDASI LOGIKA PASSWORD (PANJANG MINIMAL 8 DAN HARUS PUNYA ANGKA)
        document.getElementById('err-pass').innerText = "MIN 8 CHARS & 1 NUMBER";
        isValid = false;
    } else if (pass !== confirm) { // VALIDASI PASSWORD CONFIRM (HARUS SAMA DENGAN PASSWORD)
        document.getElementById('err-confirm').innerText = "PASSWORD MISMATCH";
        isValid = false;
    }

    // VALIDASI TERM OF AGREEMENT
    const terms = document.getElementById('terms-agreement');
    if (!terms || !terms.checked) {
        document.getElementById('err-agreement').innerText = "TERMS REQUIRED";
        isValid = false;
    }

    if (isValid) {
        showAccessGranted('Email Registration');
    }
}

function showAccessGranted(platform) {
    document.getElementById('platform-name').textContent = platform;
    document.getElementById('access-notification').classList.add('active');
    
    setTimeout(() => {
        if (document.getElementById('access-notification').classList.contains('active')) {
            window.location.href = 'home.html';
        }
    }, 2500);
}

function closeAccessGranted() {
    document.getElementById('access-notification').classList.remove('active');
    setTimeout(() => window.location.href = 'home.html', 400);
}