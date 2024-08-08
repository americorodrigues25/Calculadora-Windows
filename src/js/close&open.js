const calc = document.getElementById('calc');
const close = document.getElementById('close');
const openCalc = document.getElementById('abrirCalc');

close.addEventListener('click', function () {
    calc.style.display = 'none';
    openCalc.style.display = 'flex';
});

openCalc.addEventListener('click', function () {
    calc.style.display = 'block';
    openCalc.style.display = 'none';
});
