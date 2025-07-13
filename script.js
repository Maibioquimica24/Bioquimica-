const materias = [
  { id: 'qg1', name: 'Química general I', reqs: [], tipo: '' },
  { id: 'mat1', name: 'Matemática I', reqs: [], tipo: '' },
  { id: 'f1', name: 'Física I', reqs: [], tipo: '' },
  { id: 'lab1', name: 'Laboratorio I', reqs: ['qg1', 'f1'], tipo: '' },
  { id: 'orient1', name: 'Asignatura de orientación I', reqs: [], tipo: 'optativa' },
  { id: 'electiva1', name: 'Asignatura electiva I', reqs: [], tipo: 'electiva' },
  { id: 'practic', name: 'Practicanato profesional', reqs: ['qg1','mat1','f1','lab1','orient1','electiva1'], tipo: 'practicanato' }
];

const saved = JSON.parse(localStorage.getItem('bioq-progress') || '{}');

function createMateria(m) {
  const el = document.createElement('div');
  el.classList.add('subject');
  if (m.tipo) el.classList.add(m.tipo);
  el.dataset.id = m.id;
  el.textContent = m.name;

  const allApproved = m.reqs.every(r => saved[r]);
  if (!allApproved) el.classList.add('locked');
  if (saved[m.id]) el.classList.add('completed');

  el.addEventListener('click', () => {
    if (el.classList.contains('locked')) return;
    el.classList.toggle('completed');
    saved[m.id] = el.classList.contains('completed');
    localStorage.setItem('bioq-progress', JSON.stringify(saved));
    render();
  });
  return el;
}

function render() {
  const container = document.getElementById('malla');
  container.innerHTML = '';
  materias.forEach(m => container.appendChild(createMateria(m)));
}

document.getElementById('reset').onclick = () => {
  localStorage.removeItem('bioq-progress');
  render();
};

render();
